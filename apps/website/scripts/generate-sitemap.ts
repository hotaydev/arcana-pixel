import { posts } from '../src/routes/blog/post/post-index';
import { baseLocale, locales } from '../src/lib/paraglide/runtime';
import { parseStringPromise, Builder } from 'xml2js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

export const baseURL = 'https://www.arcanapixel.com';

// Function to recursively get route paths
function getRoutePaths(directory: string, basePath: string = ''): string[] {
	const routeFiles = fs.readdirSync(directory);
	let paths: string[] = [];

	// Check if this directory has a +page.svelte file
	if (routeFiles.includes('+page.svelte')) {
		// Add this path to our list (for root path, use '/')
		paths.push(basePath === '' ? '/' : basePath);
	}

	// For each file/directory in the routes folder
	for (const file of routeFiles) {
		const fullPath = path.join(directory, file);
		const stat = fs.statSync(fullPath);

		// Skip special files and directories that should be excluded
		if (file.startsWith('_') || file === 'api' || file.startsWith('+')) {
			continue;
		}

		if (stat.isDirectory()) {
			// Build the route path
			const routePath = basePath + '/' + file;

			// Recursively add sub-routes with +page.svelte files
			paths = paths.concat(getRoutePaths(fullPath, routePath));
		}
	}

	return paths;
}

// Get static paths from routes directory
const routesPaths = getRoutePaths(path.join(process.cwd(), 'src', 'routes'))
	.map((p) => p || '/') // Convert empty string to root path
	.filter((p) => !p.includes('/blog/post/')); // Filter out blog post routes as we'll handle them separately

// Combine with blog posts (keeping the existing structure)
const staticPaths = [
	...routesPaths,
	...Object.keys(posts).map((post) => `/blog/post/${posts[post].slug}`)
];

// Function to get the last modification date of a file from git
function getLastModifiedDate(filePath: string): string {
	try {
		// Get the last commit date for the file
		const gitCommand = `git log -1 --format="%aI" -- "${filePath}"`;
		const lastModifiedDate = execSync(gitCommand).toString().trim();

		// If we got a valid date, return it
		if (lastModifiedDate) {
			return lastModifiedDate;
		}

		// Fallback to current date if no git history
		return new Date().toISOString();
	} catch {
		// If there's an error with the git command, fallback to current date
		return new Date().toISOString();
	}
}

// Get the corresponding file path for a route
function getFilePathForRoute(route: string): string {
	if (route === '/') {
		return path.join(process.cwd(), 'src', 'routes', '+page.svelte');
	}

	// Handle blog posts
	if (route.startsWith('/blog/post/')) {
		const slug = route.replace('/blog/post/', '');
		const postKey = Object.keys(posts).find((key) => posts[key].slug === slug);
		if (postKey) {
			// For blog posts, use the blog index file instead since individual posts don't have their own files
			return path.join(process.cwd(), 'src', 'routes', 'blog', 'post', slug, '+page.svelte');
		}
	}

	// Regular routes
	const routePath = route.startsWith('/') ? route.substring(1) : route;
	return path.join(process.cwd(), 'src', 'routes', routePath, '+page.svelte');
}

// Generate XML
async function generateSitemap() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
	${staticPaths
		.map((path) => {
			const filePath = getFilePathForRoute(path);
			const lastMod = getLastModifiedDate(filePath);
			return `
	<url>
		<loc>${ensureTrailingSlash(baseURL)}${baseLocale}${ensureTrailingSlash(path)}</loc>
		<lastmod>${lastMod}</lastmod>
		${locales
			.map(
				(locale) =>
					`<xhtml:link rel="alternate" hreflang="${locale}" href="${ensureTrailingSlash(baseURL)}${locale}${ensureTrailingSlash(path)}" />`
			)
			.join('')}
	</url>`;
		})
		.join('')}
</urlset>`;

	const formattedXml = await formatXML(body);

	// Ensure the static directory exists
	const staticDir = path.join(process.cwd(), 'static');
	if (!fs.existsSync(staticDir)) {
		console.log('`static` folder not found');
		return;
	}

	// Write the sitemap to file
	fs.writeFileSync(path.join(staticDir, 'sitemap.xml'), formattedXml);
	console.log('Sitemap generated at static/sitemap.xml');
}

function ensureTrailingSlash(str: string): string {
	return str.endsWith('/') ? str : str + '/';
}

async function formatXML(xml: string): Promise<string> {
	try {
		const parsed = await parseStringPromise(xml);
		return new Builder({
			renderOpts: {
				pretty: true,
				indent: '  ',
				newline: '\n'
			}
		}).buildObject(parsed);
	} catch (error) {
		console.error('Error parsing XML:', error);
		return xml;
	}
}

// Run the script
generateSitemap().catch(console.error);

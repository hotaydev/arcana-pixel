import type { RequestHandler } from '@sveltejs/kit';
import { posts } from '../blog/post/post-index';
import { baseLocale, locales } from '$lib/paraglide/runtime';
import { parseStringPromise, Builder } from 'xml2js';
import { BASE_URL, SITEMAP_URLS } from '$lib/variables';

export const prerender = true;

const staticPaths = [
	...SITEMAP_URLS,
	...Object.keys(posts).map((post) => `/blog/post/${posts[post].slug}`)
];

export const GET: RequestHandler = async () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${staticPaths
		.map(
			(path) => `
	<url>
		<loc>${ensureTrailingSlash(BASE_URL)}${baseLocale}${ensureTrailingSlash(path)}</loc>
		${locales
			.map(
				(locale) =>
					`<xhtml:link rel="alternate" hreflang="${locale}" href="${ensureTrailingSlash(BASE_URL)}${locale}${ensureTrailingSlash(path)}" />`
			)
			.join('')}
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(await formatXML(body), {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};

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

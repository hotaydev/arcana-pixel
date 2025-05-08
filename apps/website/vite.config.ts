import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
			urlPatterns: [
				//  We can use also https://inlang.com/m/gerre34r/library-inlang-paraglideJs/strategy#translated-pathnames

				{
					pattern: '/:prefix(.*)?/sitemap.xml',
					localized: [
						['en', '/sitemap.xml'],
						['es', '/sitemap.xml'],
						['pt', '/sitemap.xml']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['en', '/en/:path(.*)?'],
						['es', '/es/:path(.*)?'],
						['pt', '/pt/:path(.*)?']
					]
				}
			]
		})
	]
});

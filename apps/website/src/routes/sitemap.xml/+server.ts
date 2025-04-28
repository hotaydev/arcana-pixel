import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { baseLocale, locales } from '$lib/paraglide/runtime';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: 'https://www.arcanapixel.com',
		lang: {
			default: baseLocale,
			alternates: Array.from(locales)
		}
	});
};

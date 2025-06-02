import { localizeHref } from '$lib/paraglide/runtime';
import { error, redirect, type Load } from '@sveltejs/kit';
import { redirects } from '../../redirects';

export const load: Load = ({ params }) => {
	const slug = params.catchall;

	if (!slug) {
		throw redirect(307, localizeHref('/'));
	}

	const normalizedSlug = slug.replace(/^\/|\/$/g, '');

	if (redirects.has(normalizedSlug)) {
		throw redirect(301, localizeHref(redirects.get(normalizedSlug)!));
	}

	throw error(404, `Page not found: /${normalizedSlug}`);
};

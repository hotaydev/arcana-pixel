import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { POSTHOG_API_URL, POSTHOG_CLIENT_KEY } from '$lib/variables';

export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';

export const load = async () => {
	if (browser) {
		posthog.init(POSTHOG_CLIENT_KEY, {
			api_host: POSTHOG_API_URL,
			capture_pageview: false,
			capture_pageleave: false
		});
	}
	return;
};

<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { browser } from '$app/environment';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import posthog from 'posthog-js';

	import { page } from '$app/state';
	import { baseLocale, locales, localizeHref } from '$lib/paraglide/runtime';

	let { children } = $props();

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}
</script>

<svelte:head>
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href={new URL(localizeHref(page.url.pathname, { locale }), page.url.origin).toString()}
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={new URL(
			localizeHref(page.url.pathname, { locale: baseLocale }),
			page.url.origin
		).toString()}
	/>
	<link
		rel="canonical"
		href={new URL(localizeHref(page.url.pathname), page.url.origin).toString()}
	/>
</svelte:head>

<Navbar />
{@render children?.()}
<Footer />

<!-- Used for SSG: https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#static-site-generation-ssg -->
<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
</script>

<Navbar />
<slot />
<Footer />

<!-- Used for SSG: https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#static-site-generation-ssg -->
<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>

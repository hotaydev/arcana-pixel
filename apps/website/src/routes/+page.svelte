<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Community from '$lib/components/Community.svelte';
	import Roadmap from '$lib/components/Roadmap.svelte';
	import SupportedSystems from '$lib/components/SupportedSystems.svelte';

	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.landing_page_main_title()}</title>
	<meta name="description" content={m.landing_page_description()} />
	<meta name="keywords" content={m.landing_page_keywords()} />
</svelte:head>

<main>
	<Hero />

	<div class="section-glow glow-left">
		<Features />
	</div>

	<div class="section-glow glow-right">
		<SupportedSystems />
	</div>

	<div class="section-glow glow-left">
		<Community />
	</div>

	<div class="section-glow glow-right">
		<Pricing />
	</div>

	<Roadmap />
</main>

<style>
	main {
		width: 100%;
		min-height: 100vh;
		position: relative;
		overflow: hidden;
	}

	.section-glow {
		position: relative;
		overflow: hidden;
	}

	.section-glow::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--glow-primary),
			var(--glow-secondary),
			transparent
		);
		opacity: 0.6;
		z-index: 1;
		filter: blur(1px);
	}

	.section-glow::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--glow-secondary),
			var(--glow-primary),
			transparent
		);
		opacity: 0.6;
		z-index: 1;
		filter: blur(1px);
	}

	.glow-left::before {
		content: '';
		position: absolute;
		top: 15%;
		left: 0;
		width: 30px;
		height: 70%;
		background: radial-gradient(ellipse at left, var(--glow-primary), transparent 90%);
		opacity: 0.5;
		filter: blur(15px);
		z-index: 0;
	}

	.glow-right::before {
		content: '';
		position: absolute;
		top: 15%;
		right: 0;
		width: 30px;
		height: 70%;
		background: radial-gradient(ellipse at right, var(--glow-primary), transparent 90%);
		opacity: 0.5;
		filter: blur(15px);
		z-index: 0;
	}
</style>

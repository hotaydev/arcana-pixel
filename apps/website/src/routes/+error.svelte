<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<svelte:head>
	<title
		>{page.status === 404
			? m.page_not_found_head_title()
			: m.error_page_something_went_wrong_title()}</title
	>
	<meta
		name="description"
		content={page.status === 404
			? m.page_not_found_head_description()
			: m.error_page_something_went_wrong_head_description()}
	/>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="error-section" in:fade={{ duration: 400, delay: 200 }}>
	{#if page.status === 404}
		<h1 class="gradient-text">{page.status}</h1>
		<h2>{m.page_not_found_title()}</h2>
		<p>{m.page_not_found_description()}</p>
	{:else}
		<h1 class="gradient-text">{m.error()} {page.status}</h1>
		<h2>{m.error_page_something_went_wrong_title()}</h2>
		<p>{page.error?.message || m.error_page_something_went_wrong_description()}</p>
	{/if}
	<div class="action-buttons">
		<a href={localizeHref('/')} class="btn btn-primary">{m.go_to_home()}</a>
		<button class="btn btn-secondary" on:click={() => history.back()}>{m.go_back()}</button>
	</div>
</div>

<style>
	.error-section {
		text-align: center;
		max-width: 600px;
		margin: 10rem auto 6rem;
		padding: 2rem;
	}

	h1 {
		font-size: 6rem;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		color: var(--gray);
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.action-buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 4rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.error-section {
			padding: 1rem;
			margin: 2rem auto;
		}
	}
</style>

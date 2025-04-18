<script lang="ts">
	import { goto } from "$app/navigation";

	let {
		withText = true,
		size = 40,
		onclick,
	}: { withText?: boolean; size?: number; onclick?: () => void } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="logo"
	onclick={() => {
		if (onclick) {
			onclick();
		} else {
			goto("/");
		}
	}}
>
	<img src="/assets/images/logo.webp" alt="Arcana Pixel" width="{size}px" height="{size}px" />
	{#if withText}
		<h1>Arcana Pixel</h1>
	{/if}
</div>

<style>
	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
	}

	.logo h1 {
		color: var(--title-color);
		font-weight: 600;
		font-size: 1.5rem;
		margin: 0;
	}
</style>

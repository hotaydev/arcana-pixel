<script lang="ts">
	import { goto } from "$app/navigation";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="logo"
	onclick={() => {
		goto("/");
	}}
>
	<img src="/assets/images/logo.webp" alt="Arcana Pixel" width="40" height="40" />
	<h1>Arcana Pixel</h1>
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

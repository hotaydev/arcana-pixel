<script lang="ts">
	import "../global.css";
	import { onMount } from "svelte";
	import { initTheme } from "$lib/utils/theme";
	import type { Snippet } from "svelte";

	let { children }: { children?: Snippet } = $props();

	onMount(() => {
		initTheme();
	});
</script>

{@render children?.()}

<script>
	import "../global.css";
	import { onMount } from "svelte";
	import { initTheme } from "$lib/utils/theme";

	onMount(() => {
		// Initialize theme from user preferences
		initTheme();

		// Check if user has saved theme preference
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			document.documentElement.setAttribute("data-theme", savedTheme);
		}
	});
</script>

<slot />

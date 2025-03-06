<script lang="ts">
	import ArcanaMap from "$lib/features/map/main.svelte";
	import CharacterSheet from "$lib/features/character-sheet/main.svelte";
	import WikiSidebar from "$lib/features/wiki-bar/main.svelte";
	import { Toaster } from "svelte-5-french-toast";
	import "../global.css";

	import { showWiki } from "$lib/features/wiki-bar/stores/wiki.store";
	import DiceArea from "$lib/features/dice/main.svelte";
</script>

<main>
	<!-- Wiki / Location Notes Section -->
	<section class="wiki" style={$showWiki ? "width: 25%" : "width: 0"}>
		<WikiSidebar />
	</section>

	<!-- Map Section -->
	<section class="map" style={$showWiki ? "width: 50%" : "width: 75%"}>
		<ArcanaMap />
	</section>

	<!-- Character Sheet Section -->
	<section class="sheet">
		<CharacterSheet />
	</section>

	<Toaster />
	<DiceArea />
</main>

<style>
	main {
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: row;

		padding: 2rem;
		gap: 2rem;
	}

	main section {
		height: 100%;
	}

	main .sheet {
		width: 25%;
	}

	main .wiki {
		overflow: hidden;
	}

	main .wiki,
	main .map {
		transition: width 0.5s ease;
	}
</style>

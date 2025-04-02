<script lang="ts">
	import { Settings } from "lucide-svelte";
	import CharacterInfo from "./components/character-info.svelte";
	import ChooseCharacter from "./components/choose.svelte";
	import { character } from "./stores/character.store";
	import { onMount } from "svelte";
	import loadCharacter, { isValidBeyondURL } from "./services/character-parser";
	import Loading from "$lib/components/loading.svelte";
	import { fade } from "svelte/transition";
	import CharacterStats from "./components/character-stats.svelte";
	import Modal from "./components/modal.svelte";

	let showModal = $state(false);
	let ready = $state(false);

	onMount(async () => {
		const characterURL = localStorage.getItem("characterURL");

		if (characterURL && isValidBeyondURL(characterURL)) {
			await loadCharacter();
		}

		ready = true;
	});
</script>

<div class="character-sheet card">
	{#if $character}
		<div class="sheet-content" in:fade>
			<div class="settings">
				<Settings onclick={() => (showModal = true)} />
			</div>
			<CharacterInfo />
			<CharacterStats />
		</div>
	{:else if !ready}
		<Loading />
	{:else}
		<ChooseCharacter />
	{/if}

	<Modal bind:showModal />
</div>

<style>
	.character-sheet {
		color: var(--title-color);
		min-height: calc(100vh - 4rem);

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.sheet-content {
		display: flex;
		align-items: center;
		justify-content: start;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.settings {
		width: 100%;
		height: 0;
		text-align: right;
		cursor: pointer;
		color: var(--text-color-dim);
		z-index: 5;
	}
</style>

<script lang="ts">
	import { Book, PersonStanding } from "@lucide/svelte";
	import MyCard from "../common/my-card.svelte";
	import type { ICharacter } from "$lib/mock/characters";
	// import { goto } from "$app/navigation";

	const { character, index }: { character: ICharacter; index: number } = $props();

	// Handle open character
	function openCharacter(characterId: string) {
		console.log("Open character", characterId);
		// goto(`/character/${characterId}`);
	}
</script>

<MyCard
	id={character.id}
	title={character.name}
	subtitle={`${character.class} - ${character.level}`}
	description={character.description}
	lastPlayed={character.lastPlayed}
	imageType="portrait"
	{index}
	FallbackImageIcon={PersonStanding}
	open={openCharacter}
	RigthIcon={Book}
	rigthText={character.system}
/>

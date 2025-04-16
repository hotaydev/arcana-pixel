<script lang="ts">
	import { Book, PersonStanding } from "@lucide/svelte";
	import MyCard from "../common/my-card.svelte";
	// import { goto } from "$app/navigation";

	export let character;
	export let index: number;

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
	fallbackImageIcon={PersonStanding}
	open={openCharacter}
	rigthIcon={Book}
	rigthText={character.system}
/>

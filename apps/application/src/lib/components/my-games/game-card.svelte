<script lang="ts">
	import { Swords, Users } from "@lucide/svelte";
	import MyCard from "../common/my-card.svelte";
	import { goto } from "$app/navigation";
	export let game;
	export let index: number;

	// Handle open game
	function openGame(gameId: string) {
		goto(`/game/${gameId}`);
	}
</script>

<MyCard
	id={game.id}
	title={game.title}
	subtitle={game.universe}
	description={game.description}
	lastPlayed={game.lastPlayed}
	imageType="landscape"
	{index}
	FallbackImageIcon={Swords}
	open={openGame}
	RigthIcon={Users}
	rigthText={`${game.players} jogadores`}
/>

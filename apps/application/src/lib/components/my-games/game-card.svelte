<script lang="ts">
	import { Swords, Users } from "@lucide/svelte";
	import MyCard from "../common/my-card.svelte";

	export let game;
	export let index: number;

	// Handle open game
	function openGame(gameId: string) {
		window.location.href = `/game/${gameId}`;
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
	fallbackImageIcon={Swords}
	open={openGame}
	rigthIcon={Users}
	rigthText={`${game.players} jogadores`}
/>

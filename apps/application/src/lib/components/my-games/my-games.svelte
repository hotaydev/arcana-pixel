<script lang="ts">
	import GameCard from "$lib/components/my-games/game-card.svelte";
	import { Gamepad2, Plus } from "@lucide/svelte";

	export let games;

	function createNewGame() {}
</script>

<!-- Main content area -->
<div class="content-container">
	<header class="page-header">
		<h1>Meus jogos</h1>
		<p>Gerencie suas sessões e campanhas</p>
	</header>

	{#if games.length === 0}
		<!-- Game sessions placeholder -->
		<div class="placeholder-content">
			<Gamepad2 size={64} color="var(--text-color-dim)" />
			<div>
				<p>Aqui você encontrará as campanhas e sessões de seus jogos</p>
				<p class="small">Quer entrar em uma campanha existente? Peça o link ao mestre.</p>
			</div>
			<button class="action-button">
				<Plus size={20} />
				<span>Criar nova campanha</span>
			</button>
		</div>
	{:else}
		<!-- Games grid -->
		<div class="games-grid">
			<!-- Create new game card -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="game-card new-game" on:click={createNewGame}>
				<div class="new-game-content">
					<Plus size={48} color="var(--text-color-dim)" />
					<p>Criar novo jogo</p>
				</div>
			</div>

			<!-- Game cards -->
			{#each games as game, index}
				<GameCard {game} {index} />
			{/each}
		</div>
	{/if}
</div>

<style>
	/* Main Content Area */
	.content-container {
		flex: 1;
		padding: 2rem;
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--title-color);
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: var(--text-color-dim);
		font-size: 1.1rem;
	}

	/* Games Grid */
	.games-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	/* Game Card Styles */
	.game-card {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid transparent;
		transition: all 0.3s ease;
		cursor: pointer;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.game-card:hover {
		transform: translateY(-5px);
		border-color: var(--xp-bar);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	/* Create New Game Card */
	.new-game {
		border: 2px dashed var(--background-color-level-3);
		background-color: rgba(255, 255, 255, 0.02);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: auto;
		min-height: 240px;
	}

	.new-game:hover {
		border-color: var(--xp-bar);
		background-color: rgba(0, 143, 231, 0.05);
	}

	.new-game-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: var(--text-color-dim);
		padding: 2rem;
		text-align: center;
	}

	.new-game-content p {
		font-weight: 500;
	}

	/* Placeholder content for new sections */
	.placeholder-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1.5rem;
		min-height: 300px;
		padding: 4rem 2rem;
		color: var(--text-color-dim);
		background-color: var(--background-color-level-0);
		border-radius: 12px;
		border: 2px dashed var(--background-color-level-3);
	}

	.placeholder-content p {
		font-size: 1.2rem;
		max-width: 600px;
	}

	.placeholder-content p.small {
		font-size: 0.8rem;
		margin-top: 8px;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--xp-bar);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
	}

	.action-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
		transform: translateY(-2px);
	}

	/* Animation for the cards */
	.game-card {
		opacity: 0;
		transform: translateY(20px);
		animation: card-appear 0.4s ease-out forwards;
	}

	@keyframes card-appear {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Stagger card animations */
	.game-card {
		animation-delay: 0.05s;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.content-container {
			padding: 1.5rem 1rem;
		}

		.games-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.games-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

<script lang="ts">
	import { fade } from "svelte/transition";
	import ArcanaLogo from "$lib/components/common/logo.svelte";
	import HelpButton from "$lib/components/common/help-button.svelte";
	import GameCard from "$lib/components/my-games/game-card.svelte";
	import ImportDialog from "$lib/components/my-games/import-dialog.svelte";
	import { ChevronDown, Download, LogOut, Plus, Search, Settings, User } from "@lucide/svelte";

	// Mock data for games
	const games = [
		{
			id: "5406a634-170d-11f0-b19e-3e7bf1c93a1f",
			title: "Sombras de Santa Cecília",
			universe: "Ordem Paranormal",
			description:
				"Uma cidade do interior, uma série de acontecimentos inexplicáveis e um chamado para investigar o que não deveria existir.",
			lastPlayed: "2025-04-08T14:30:00",
			players: 5,
			image: null,
		},
		{
			id: "5b1f22fc-170d-11f0-80fc-3e7bf1c93a1f",
			title: "A Coroa do Dragão Esquecido",
			universe: "Dungeons and Dragons",
			description:
				"Rumores sobre um antigo poder reacendem conflitos e ambições em um mundo à beira da ruína.",
			lastPlayed: "2025-04-05T19:45:00",
			players: 4,
			image: null,
		},
		{
			id: "5b72f8e6-170d-11f0-a3e7-3e7bf1c93a1f",
			title: "O Julgamento de Valkaria",
			universe: "Tormenta RPG",
			description:
				"Em tempos conturbados, heróis improváveis recebem uma missão que vai além do que se pode compreender.",
			lastPlayed: "2025-03-28T20:00:00",
			players: 6,
			image: null,
		},
	];

	// UI state
	let showUserMenu = false;
	let showImportDialog = false;
	let searchQuery = "";

	// Toggle user dropdown menu
	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	function handleDocumentClick(event: MouseEvent) {
		if (!event.composedPath().includes(document.querySelector(".user-profile")!)) {
			showUserMenu = false;
		}
	}
	document.addEventListener("click", handleDocumentClick);

	// Open import dialog
	function toggleImportDialog() {
		showImportDialog = !showImportDialog;
	}

	// Handle create new game
	function createNewGame() {
		console.log("Creating new game");
	}

	// Filter games based on search query
	$: filteredGames = games.filter(
		(game) =>
			game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			game.universe.toLowerCase().includes(searchQuery.toLowerCase()) ||
			game.description.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<main>
	<!-- Top navigation bar -->
	<nav class="top-bar">
		<ArcanaLogo />

		<div class="search-bar">
			<Search
				size={18}
				color="var(--text-color-dim)"
				style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"
			/>
			<input type="text" placeholder="Procurar campanhas..." bind:value={searchQuery} />
		</div>

		<div class="nav-actions">
			<button class="import-button" on:click={toggleImportDialog}>
				<Download size={20} />
				<span>Importar</span>
			</button>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="user-profile" on:click={toggleUserMenu}>
				<div class="avatar">
					<!-- Fallback avatar if image fails to load -->
					<svg
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12" r="10" fill="var(--background-color-level-3)" />
						<path
							d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
							fill="var(--background-color-level-4)"
						/>
						<path
							d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
							fill="var(--background-color-level-4)"
						/>
					</svg>
				</div>
				<span class="username">Taylor Hoffmann</span>
				<ChevronDown size={16} />

				<!-- User dropdown menu -->
				{#if showUserMenu}
					<div class="user-menu" transition:fade={{ duration: 150 }}>
						<ul>
							<li>
								<User size={16} />
								<span>Perfil</span>
							</li>
							<li>
								<Settings size={16} />
								<span>Configurações</span>
							</li>
							<li class="divider"></li>
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<li
								class="logout"
								on:click={() => {
									window.location.href = "/auth";
								}}
							>
								<LogOut size={16} />
								<span>Sair</span>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Main content area -->
	<div class="content-container">
		<header class="page-header">
			<h1>Meus jogos</h1>
			<p>Gerencie suas sessões e campanhas</p>
		</header>

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
			{#each filteredGames as game, index}
				<GameCard {game} {index} />
			{/each}
		</div>
	</div>

	<HelpButton />

	<!-- Import game dialog -->
	{#if showImportDialog}
		<ImportDialog {toggleImportDialog} />
	{/if}
</main>

<style>
	/* Main Layout */
	main {
		color: var(--text-color);
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	/* Top Navigation Bar */
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background-color: var(--background-color-level-1);
		border-bottom: 1px solid var(--divider-color);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.search-bar {
		flex-grow: 1;
		max-width: 500px;
		margin: 0 2rem;
		position: relative;
	}

	.search-bar input {
		width: 100%;
		padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		font-size: 0.95rem;
		transition: all 0.2s ease-in-out;
	}

	.search-bar input:focus {
		outline: none;
		border-color: var(--xp-bar);
		box-shadow: 0 0 0 2px rgba(0, 143, 231, 0.2);
	}

	.search-bar input::placeholder {
		color: var(--text-color-dim);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.import-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.import-button:hover {
		background-color: var(--background-color-level-1);
		border-color: var(--background-color-level-4);
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		position: relative;
		padding: 0.5rem;
		border-radius: 6px;
		transition: background-color 0.2s ease;
	}

	.user-profile:hover {
		background-color: var(--background-color-level-0);
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--background-color-level-1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.username {
		font-weight: 500;
		max-width: 140px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* User Menu Dropdown */
	.user-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		width: 200px;
		background-color: var(--background-color-level-1);
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		z-index: 100;
	}

	.user-menu ul {
		list-style: none;
	}

	.user-menu li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.user-menu li:hover {
		background-color: var(--background-color-level-2);
	}

	.user-menu li.divider {
		height: 1px;
		background-color: var(--divider-color);
		padding: 0;
		margin: 0.25rem 0;
	}

	.user-menu li.logout {
		color: #ff6b6b;
	}

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

	/* Transitions for UI elements */
	.user-menu {
		transition:
			opacity 0.15s ease-in-out,
			transform 0.15s ease-in-out;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.top-bar {
			padding: 1rem;
			flex-wrap: wrap;
		}

		.search-bar {
			order: 3;
			margin: 1rem 0 0;
			max-width: 100%;
			width: 100%;
		}

		.content-container {
			padding: 1.5rem 1rem;
		}

		.games-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.nav-actions {
			gap: 0.75rem;
		}

		.import-button span {
			display: none;
		}

		.import-button {
			padding: 0.5rem;
		}

		.username {
			max-width: 80px;
		}

		.games-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

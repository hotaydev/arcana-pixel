<script lang="ts">
	import { fade } from "svelte/transition";
	import ArcanaLogo from "$lib/components/common/logo.svelte";
	import HelpButton from "$lib/components/common/help-button.svelte";
	import {
		ChevronDown,
		Download,
		LogOut,
		Search,
		Settings,
		User,
		BookOpen,
		Package,
		Gamepad2,
	} from "@lucide/svelte";
	import Avatar from "$lib/components/icons/avatar.svelte";
	import MyGames from "$lib/components/my-games/my-games.svelte";
	import MyCharacters from "$lib/components/my-characters/my-characters.svelte";
	import MyExpansions from "$lib/components/my-expansions/my-expansions.svelte";

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
	let searchQuery = "";
	let activeSection = "games"; // New state for tracking active section

	function handleDocumentClick(event: MouseEvent) {
		if (!event.composedPath().includes(document.querySelector(".user-profile")!)) {
			showUserMenu = false;
		}
	}
	document.addEventListener("click", handleDocumentClick);

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
			<input type="text" placeholder="Procurar na biblioteca" bind:value={searchQuery} />
		</div>

		<div class="nav-actions">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="user-profile"
				on:click={() => {
					showUserMenu = !showUserMenu;
				}}
			>
				<Avatar />
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

	<!-- Section Navigation -->
	<div class="section-navigation">
		<div class="section-nav-container">
			<button
				class={activeSection === "games" ? "active" : ""}
				on:click={() => {
					activeSection = "games";
				}}
			>
				<Gamepad2 size={18} />
				<span>Meus Jogos</span>
			</button>
			<button
				class={activeSection === "characters" ? "active" : ""}
				on:click={() => {
					activeSection = "characters";
				}}
			>
				<BookOpen size={18} />
				<span>Meus Personagens</span>
			</button>
			<button
				class={activeSection === "expansions" ? "active" : ""}
				on:click={() => {
					activeSection = "expansions";
				}}
			>
				<Package size={18} />
				<span>Minhas Expansões</span>
			</button>
		</div>
	</div>

	<!-- Main content area -->
	{#if activeSection === "games"}
		<MyGames games={filteredGames} />
	{:else if activeSection === "characters"}
		<MyCharacters />
	{:else if activeSection === "expansions"}
		<MyExpansions />
	{/if}

	<HelpButton />
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

	/* Section Navigation */
	.section-navigation {
		background-color: var(--background-color-level-0);
		border-bottom: 1px solid var(--divider-color);
		padding: 0 2rem;
	}

	.section-nav-container {
		max-width: 1600px;
		margin: 0 auto;
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		scrollbar-width: none; /* Firefox */
	}

	.section-nav-container::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}

	.section-nav-container button {
		padding: 1rem 1.5rem;
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		color: var(--text-color-dim);
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.section-nav-container button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-1);
	}

	.section-nav-container button.active {
		color: var(--xp-bar);
		border-bottom-color: var(--xp-bar);
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
		.section-navigation {
			padding: 0 1rem;
		}

		.section-nav-container button {
			padding: 0.75rem 1rem;
		}
	}

	@media (max-width: 480px) {
		.nav-actions {
			gap: 0.75rem;
		}

		.username {
			max-width: 80px;
		}

		.section-nav-container button span {
			display: none;
		}

		.section-nav-container button {
			padding: 0.75rem;
		}
	}
</style>

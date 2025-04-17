<script lang="ts">
	import HelpButton from "$lib/components/common/help-button.svelte";
	import Navbar from "$lib/components/common/navbar.svelte";
	import { Search, BookOpen, Gamepad2, Package, ShoppingBag } from "@lucide/svelte";
	import MyGames from "$lib/components/my-games/my-games.svelte";
	import MyCharacters from "$lib/components/my-characters/my-characters.svelte";
	import MyExpansions from "$lib/components/my-expansions/my-expansions.svelte";
	import ExpansionsMarket from "$lib/components/expansions-market/expansions-market.svelte";
	import variables from "$lib/variables";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";

	// TODO: We can persist the searchQuery between page reloads
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

	// Example characters data
	const exampleCharacters = [
		{
			id: "393f9e70-1927-11f0-b02f-3e7bf1c93a1f",
			name: "Thranduil Silverleaf",
			class: "Mago",
			level: 7,
			description:
				"Um elfo mago especializado em magias elementais de gelo. Originário das Florestas do Norte, busca conhecimento arcano perdido.",
			lastPlayed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
			system: "D&D 5e",
		},
		{
			id: "413d15b2-1927-11f0-9480-3e7bf1c93a1f",
			name: "Grommash Runaforte",
			class: "Guerreiro",
			level: 5,
			description:
				"Anão guerreiro robusto, especialista em armas pesadas e resistência em combate. Carrega o legado de uma antiga linhagem de ferreiros.",
			lastPlayed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
			system: "Pathfinder",
		},
		{
			id: "445fbf7e-1927-11f0-a744-3e7bf1c93a1f",
			name: "Luna Shadowstep",
			class: "Ladina",
			level: 6,
			description:
				"Humana especializada em furtividade e infiltração. Membro de uma guilda de ladrões que opera nas sombras da capital.",
			lastPlayed: new Date().toISOString(),
			system: "D&D 5e",
		},
		{
			id: "48761e6e-1927-11f0-b788-3e7bf1c93a1f",
			name: "Arthus Lightbringer",
			class: "Paladino",
			level: 8,
			description:
				"Paladino humano devotado ao deus da luz. Conhecido por sua misericórdia em batalha e pelos feitos heroicos nas Cruzadas do Sul.",
			lastPlayed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
			system: "Tormenta 20",
		},
	];

	// UI state
	let searchQuery = $state("");
	let defaultSection = "games";
	let activeSection = $derived(page.url.searchParams.get("tab"));

	// Update URL when tab changes
	function setActiveSection(tabId: string) {
		activeSection = tabId;
		const url = new URL(window.location.href);
		url.searchParams.set("tab", tabId);
		goto(url.toString(), { replaceState: true });
	}

	const tabs = [
		{
			id: "games",
			title: "Meus Jogos",
			icon: Gamepad2,
		},
		{
			id: "characters",
			title: "Meus Personagens",
			icon: BookOpen,
		},
	];

	// TODO: These pages are ready, but since this isn't the focus right now, we're hiding them.
	if (variables.expansionsEnabled) {
		tabs.push({
			id: "expansions",
			title: "Minhas Expansões",
			icon: Package,
		});
		tabs.push({
			id: "marketplace",
			title: "Descobrir Expansões",
			icon: ShoppingBag,
		});
	}

	// Filter games based on search query
	let filteredGames = $derived(
		games.filter(
			(game) =>
				game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				game.universe.toLowerCase().includes(searchQuery.toLowerCase()) ||
				game.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let filteredCharacters = $derived(
		exampleCharacters.filter(
			(character) =>
				character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				character.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
				character.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<main>
	<!-- Top navigation bar -->
	<Navbar>
		<div class="search-bar">
			<Search
				size={18}
				color="var(--text-color-dim)"
				style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);"
			/>
			<input type="text" placeholder="Procurar na biblioteca" bind:value={searchQuery} />
		</div>
	</Navbar>

	<!-- Section Navigation -->
	<div class="section-navigation">
		<div class="section-nav-container">
			{#each tabs as tab}
				{@const Component = tab.icon}
				<button
					class={(activeSection || defaultSection) === tab.id ? "active" : ""}
					onclick={() => setActiveSection(tab.id)}
				>
					<Component size={18} />
					<span>{tab.title}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Main content area -->
	{#if (activeSection || defaultSection) === "games"}
		<MyGames games={filteredGames} />
	{:else if (activeSection || defaultSection) === "characters"}
		<MyCharacters characters={filteredCharacters} />
	{:else if (activeSection || defaultSection) === "expansions"}
		<MyExpansions />
	{:else if (activeSection || defaultSection) === "marketplace"}
		<ExpansionsMarket />
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

	/* Media Queries */
	@media (max-width: 768px) {
		.section-navigation {
			padding: 0 1rem;
		}

		.section-nav-container button {
			padding: 0.75rem 1rem;
		}

		.search-bar {
			order: 3;
			margin: 1rem 0 0;
			max-width: 100%;
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.section-nav-container button span {
			display: none;
		}

		.section-nav-container button {
			padding: 0.75rem;
		}
	}
</style>

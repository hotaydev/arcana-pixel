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
	import { mockedGames } from "$lib/mock/games";
	import { mockedCharacters } from "$lib/mock/characters";
	import type { ITab } from "$lib/models/interface";

	// UI state
	// TODO: We can persist the searchQuery between page reloads
	let searchQuery = $state("");
	let activeSection = $derived(page.url.searchParams.get("tab"));
	const defaultSection = "games";

	// Update URL when tab changes
	function setActiveSection(tabId: string) {
		activeSection = tabId;
		const url = new URL(window.location.href);
		url.searchParams.set("tab", tabId);
		goto(url.toString(), { replaceState: true });
	}

	const tabs: ITab[] = [
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
	if (variables.featureFlags.expansionsEnabled) {
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
		mockedGames.filter(
			(game) =>
				game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				game.universe.toLowerCase().includes(searchQuery.toLowerCase()) ||
				game.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	let filteredCharacters = $derived(
		mockedCharacters.filter(
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
				<button
					class={(activeSection || defaultSection) === tab.id ? "active" : ""}
					onclick={() => setActiveSection(tab.id)}
				>
					<tab.icon size={18} />
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
		color: var(--primary-color);
		border-bottom-color: var(--primary-color);
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
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px var(--primary-color-20);
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

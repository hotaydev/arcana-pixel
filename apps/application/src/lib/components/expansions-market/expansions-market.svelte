<script lang="ts">
	import {
		Search,
		Funnel,
		Star,
		Download,
		BookMarked,
		Map,
		Users,
		WandSparkles,
		Bookmark,
		Plus,
		VenetianMask,
		Workflow,
		Puzzle,
	} from "@lucide/svelte";

	// Mock data for expansions
	const featuredExpansions = [
		{
			id: "11bc2b34-17dd-11f0-8fe8-3e7bf1c93a1f",
			title: "Grimório Arcano Expandido",
			author: "Arcana Pixel",
			type: "rules",
			universe: "Dungeons and Dragons",
			description: "100+ novas magias para todas as classes de conjuradores.",
			downloads: 12450,
			rating: 4.8,
			official: true,
			image: "/images/grimoire.jpg",
		},
		{
			id: "167d617e-17dd-11f0-80d0-3e7bf1c93a1f",
			title: "Mapa Detalhado - Cidadela de Ravenloft",
			author: "MapMaster",
			type: "maps",
			universe: "Dungeons and Dragons",
			description: "Mapas de alta resolução da cidadela com todas as salas e passagens secretas.",
			downloads: 8763,
			rating: 4.7,
			official: false,
			image: "/images/ravenloft.jpg",
		},
		{
			id: "15ddfe86-17dd-11f0-9118-3e7bf1c93a1f",
			title: "Bestiário da Ordem",
			author: "Arcana Pixel",
			type: "creatures",
			universe: "Ordem Paranormal",
			description: "Compilação oficial de criaturas para o RPG Ordem Paranormal.",
			downloads: 9845,
			rating: 4.9,
			official: true,
			image: "/images/bestiary.jpg",
		},
	];

	const popularExpansions = [
		{
			id: "16cb7710-17dd-11f0-a124-3e7bf1c93a1f",
			title: "NPCs Memoráveis",
			author: "RPGMestres",
			type: "npcs",
			universe: "Universal",
			description: "100 NPCs completos com background, personalidade e estatísticas.",
			downloads: 7650,
			rating: 4.5,
			official: false,
			image: null,
		},
		{
			id: "1849a7ba-17dd-11f0-b2b8-3e7bf1c93a1f",
			title: "Sistema de Combate Tático Avançado",
			author: "CombatPro",
			type: "rules",
			universe: "Universal",
			description: "Regras alternativas para combates mais estratégicos e dinâmicos.",
			downloads: 6230,
			rating: 4.3,
			official: false,
			image: null,
		},
		{
			id: "19333b46-17dd-11f0-a74c-3e7bf1c93a1f",
			title: "Kit de Iniciação - Cthulhu",
			author: "Arcana Pixel",
			type: "systems",
			universe: "Call of Cthulhu",
			description: "Tudo que você precisa para iniciar uma campanha de horror cósmico.",
			downloads: 9120,
			rating: 4.6,
			official: true,
			image: null,
		},
		{
			id: "37362ae0-17dd-11f0-ab06-3e7bf1c93a1f",
			title: "Mapa - Cidade de Neverwinter",
			author: "CartaGrafica",
			type: "maps",
			universe: "Dungeons and Dragons",
			description: "Mapa detalhado da cidade com pontos de interesse e guia.",
			downloads: 5470,
			rating: 4.4,
			official: false,
			image: null,
		},
		{
			id: "381f70d8-17dd-11f0-a2ce-3e7bf1c93a1f",
			title: "Automações de Combate para VTT",
			author: "VTTScripter",
			type: "automation",
			universe: "Dungeons and Dragons",
			description: "Scripts para automatizar ações de combate em plataformas virtuais.",
			downloads: 4980,
			rating: 4.2,
			official: false,
			image: null,
		},
	];

	// Category types
	const categories = [
		{ id: "rules", name: "Regras", icon: BookMarked, count: 342 },
		{ id: "maps", name: "Mapas", icon: Map, count: 586 },
		{ id: "npcs", name: "NPCs", icon: Users, count: 412 },
		{ id: "creatures", name: "Criaturas", icon: VenetianMask, count: 613 },
		{ id: "systems", name: "Sistemas", icon: WandSparkles, count: 98 },
		{ id: "automation", name: "Automações", icon: Workflow, count: 67 },
	];

	// Universes (RPG systems)
	const universes = [
		{ id: "dnd", name: "Dungeons & Dragons", count: 865 },
		{ id: "ordem", name: "Ordem Paranormal", count: 348 },
		{ id: "tormenta", name: "Tormenta RPG", count: 425 },
		{ id: "cthulhu", name: "Call of Cthulhu", count: 267 },
		{ id: "universal", name: "Universal", count: 452 },
	];

	// UI state
	let searchQuery = "";
	let selectedCategories: string[] = [];
	let selectedUniverses: string[] = [];
	let showOnlyOfficial = false;
	let showFilters = false;

	// Handle category selection
	function toggleCategory(categoryId: string) {
		if (selectedCategories.includes(categoryId)) {
			selectedCategories = selectedCategories.filter((id) => id !== categoryId);
		} else {
			selectedCategories = [...selectedCategories, categoryId];
		}
	}

	// Handle universe selection
	function toggleUniverse(universeId: string) {
		if (selectedUniverses.includes(universeId)) {
			selectedUniverses = selectedUniverses.filter((id) => id !== universeId);
		} else {
			selectedUniverses = [...selectedUniverses, universeId];
		}
	}

	// Save expansion for later
	function saveExpansion(id: string) {
		console.log("Saved expansion:", id);
	}

	// Add expansion
	function addExpansion(id: string) {
		console.log("Downloading expansion:", id);
	}

	// Filter expansions based on search and selected filters
	$: filteredPopularExpansions = popularExpansions.filter((expansion) => {
		// Filter by search query
		const matchesSearch =
			searchQuery === "" ||
			expansion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			expansion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			expansion.universe.toLowerCase().includes(searchQuery.toLowerCase());

		// Filter by selected categories
		const matchesCategory =
			selectedCategories.length === 0 ||
			selectedCategories.some((catId) =>
				expansion.type.toLowerCase().includes(catId.toLowerCase())
			);

		// Filter by selected universes
		const matchesUniverse =
			selectedUniverses.length === 0 ||
			selectedUniverses.some((univ) =>
				expansion.universe.toLowerCase().includes(univ.toLowerCase())
			);

		// Filter by official status
		const matchesOfficial = !showOnlyOfficial || expansion.official;

		return matchesSearch && matchesCategory && matchesUniverse && matchesOfficial;
	});
</script>

<!-- Main content area -->
<div class="content-container">
	<header class="page-header">
		<h1>Descobrir expansões</h1>
		<p>Encontre expansões oficiais e expansões aprovadas pela comunidade</p>
	</header>

	<!-- Search and filter bar -->
	<div class="search-filter-bar">
		<div class="search-container">
			<Search size={18} color="var(--text-color-dim)" />
			<input
				type="text"
				placeholder="Procure por expansões, mapas, regras..."
				bind:value={searchQuery}
			/>
		</div>

		<button
			class="filter-button"
			on:click={() => {
				showFilters = !showFilters;
			}}
		>
			<Funnel size={18} />
			<span
				>Filtros {selectedCategories.length + selectedUniverses.length > 0
					? `(${selectedCategories.length + selectedUniverses.length})`
					: ""}</span
			>
		</button>
	</div>

	<!-- Expanded filters section -->
	{#if showFilters}
		<div class="filters-container">
			<div class="filter-group">
				<h3>Categorias</h3>
				<div class="filter-options">
					{#each categories as category}
						<button
							class="filter-tag {selectedCategories.includes(category.id) ? 'active' : ''}"
							on:click={() => toggleCategory(category.id)}
						>
							<svelte:component this={category.icon} size={16} />
							<span>{category.name}</span>
							<span class="count">{category.count}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="filter-group">
				<h3>Universos</h3>
				<div class="filter-options">
					{#each universes as universe}
						<button
							class="filter-tag {selectedUniverses.includes(universe.id) ? 'active' : ''}"
							on:click={() => toggleUniverse(universe.id)}
						>
							<span>{universe.name}</span>
							<span class="count">{universe.count}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="filter-group">
				<h3>Outros</h3>
				<div class="filter-options">
					<label class="checkbox-container">
						<input type="checkbox" bind:checked={showOnlyOfficial} />
						<span class="checkmark"></span>
						<span>Apenas conteúdo oficial</span>
					</label>
				</div>
			</div>
		</div>
	{/if}

	<!-- Featured expansions carousel -->
	<section class="featured-section">
		<h2>Destaques</h2>
		<div class="featured-carousel">
			{#each featuredExpansions as expansion}
				<div class="featured-card">
					<div class="featured-image">
						<Puzzle size={48} />
					</div>
					<div class="featured-content">
						<div class="featured-info">
							{#if expansion.official}
								<span class="official-badge">Oficial</span>
							{/if}
							<h3>{expansion.title}</h3>
							<p class="description">{expansion.description}</p>
							<p class="meta-info">
								<span class="universe">{expansion.universe}</span>
								<span class="category"
									>{categories.find((cat) => cat.id === expansion.type)?.name}</span
								>
							</p>
							<div class="stats">
								<span class="rating">
									<Star size={14} fill="gold" color="gold" />
									{expansion.rating}
								</span>
								<span class="downloads">
									<Download size={14} />
									{expansion.downloads.toLocaleString()}
								</span>
							</div>
						</div>
						<div class="featured-actions">
							<button class="action-button save" on:click={() => saveExpansion(expansion.id)}>
								<Bookmark size={18} />
							</button>
							<button class="action-button download" on:click={() => addExpansion(expansion.id)}>
								<Plus size={18} />
								<span>Adicionar</span>
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Popular expansions grid -->
	<section class="expansions-section">
		<h2>Expansões populares</h2>

		{#if filteredPopularExpansions.length === 0}
			<div class="no-results">
				<p>Nenhuma expansão encontrada com os filtros selecionados.</p>
				<button
					class="reset-button"
					on:click={() => {
						searchQuery = "";
						selectedCategories = [];
						selectedUniverses = [];
						showOnlyOfficial = false;
					}}>Limpar filtros</button
				>
			</div>
		{:else}
			<div class="expansions-grid">
				{#each filteredPopularExpansions as expansion}
					<div class="expansion-card">
						<div class="expansion-header">
							<div class="expansion-type">
								{categories.find((cat) => cat.id === expansion.type)?.name}
							</div>
							{#if expansion.official}
								<div class="official-tag">Oficial</div>
							{/if}
						</div>
						<h3 class="expansion-title">{expansion.title}</h3>
						<p class="expansion-universe">{expansion.universe}</p>
						<p class="expansion-description">{expansion.description}</p>
						<div class="expansion-footer">
							<div class="expansion-stats">
								<span class="rating">
									<Star size={14} fill="gold" color="gold" />
									{expansion.rating}
								</span>
								<span class="downloads">
									<Download size={14} />
									{expansion.downloads.toLocaleString()}
								</span>
							</div>
							<div class="expansion-actions">
								<button class="icon-button" on:click={() => saveExpansion(expansion.id)}>
									<Bookmark size={18} />
								</button>
								<button class="download-button" on:click={() => addExpansion(expansion.id)}>
									<Plus size={16} />
									<span>Adicionar</span>
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
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

	/* Search and Filter Bar */
	.search-filter-bar {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.search-container {
		flex-grow: 1;
		position: relative;
		max-width: 700px;
	}

	.search-container input {
		width: 100%;
		padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		font-size: 0.95rem;
		transition: all 0.2s ease-in-out;
	}

	.search-container :global(svg) {
		position: absolute;
		left: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.search-container input:focus {
		outline: none;
		border-color: var(--xp-bar);
		box-shadow: 0 0 0 2px rgba(0, 143, 231, 0.2);
	}

	.filter-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0 1.25rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-button:hover {
		background-color: var(--background-color-level-1);
		border-color: var(--background-color-level-4);
	}

	/* Filters Container */
	.filters-container {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		border: 1px solid var(--background-color-level-3);
		animation: fade-in 0.3s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.filter-group {
		margin-bottom: 1.5rem;
	}

	.filter-group:last-child {
		margin-bottom: 0;
	}

	.filter-group h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		color: var(--text-color);
	}

	.filter-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.filter-tag {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		background-color: var(--background-color-level-2);
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color-dim);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-tag:hover {
		background-color: var(--background-color-level-3);
	}

	.filter-tag.active {
		background-color: rgba(0, 143, 231, 0.1);
		border-color: var(--xp-bar);
		color: var(--xp-bar);
	}

	.filter-tag .count {
		background-color: var(--background-color-level-3);
		color: var(--text-color-dim);
		font-size: 0.8rem;
		padding: 0.15rem 0.4rem;
		border-radius: 4px;
		margin-left: 0.25rem;
	}

	.filter-tag.active .count {
		background-color: var(--xp-bar);
		color: white;
	}

	/* Checkbox styling */
	.checkbox-container {
		display: flex;
		align-items: center;
		position: relative;
		padding-left: 35px;
		cursor: pointer;
		user-select: none;
	}

	.checkbox-container input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.checkmark {
		position: absolute;
		left: 0;
		height: 20px;
		width: 20px;
		background-color: var(--background-color-level-2);
		border: 1px solid var(--background-color-level-4);
		border-radius: 4px;
	}

	.checkbox-container:hover input ~ .checkmark {
		background-color: var(--background-color-level-3);
	}

	.checkbox-container input:checked ~ .checkmark {
		background-color: var(--xp-bar);
		border-color: var(--xp-bar);
	}

	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	.checkbox-container input:checked ~ .checkmark:after {
		display: block;
	}

	.checkbox-container .checkmark:after {
		left: 7px;
		top: 3px;
		width: 6px;
		height: 10px;
		border: solid white;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}

	/* Featured Section */
	.featured-section,
	.expansions-section {
		margin-bottom: 3rem;
	}

	.featured-section h2,
	.expansions-section h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 1.25rem;
		color: var(--title-color);
	}

	.featured-carousel {
		display: flex;
		gap: 1.5rem;
		overflow-x: auto;
		padding: 1rem 0;
		scrollbar-width: thin;
		scrollbar-color: var(--background-color-level-3) transparent;
	}

	.featured-carousel::-webkit-scrollbar {
		height: 6px;
	}

	.featured-carousel::-webkit-scrollbar-track {
		background: transparent;
	}

	.featured-carousel::-webkit-scrollbar-thumb {
		background-color: var(--background-color-level-3);
		border-radius: 6px;
	}

	.featured-card {
		min-width: 400px;
		max-width: 400px;
		border-radius: 12px;
		overflow: hidden;
		background-color: var(--background-color-level-1);
		border: 1px solid var(--background-color-level-3);
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.featured-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		border-color: var(--xp-bar);
	}

	.featured-image {
		height: 180px;
		background-color: var(--background-color-level-2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.featured-content {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.featured-info h3 {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--title-color);
	}

	.featured-info .description {
		color: var(--text-color);
		margin-bottom: 0.75rem;
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.featured-info .meta-info {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.9rem;
	}

	.featured-info .universe {
		background-color: var(--background-color-level-2);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		color: var(--text-color-dim);
	}

	.featured-info .category {
		background-color: var(--background-color-level-2);
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		color: var(--text-color-dim);
	}

	.featured-info .stats {
		display: flex;
		gap: 1rem;
		font-size: 0.9rem;
		color: var(--text-color-dim);
	}

	.stats .rating,
	.stats .downloads {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}

	.official-badge {
		background-color: var(--xp-bar);
		color: white;
		font-size: 0.8rem;
		font-weight: 500;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.featured-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-button.save {
		background-color: var(--background-color-level-2);
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color);
	}

	.action-button.download {
		background-color: var(--xp-bar);
		border: 1px solid var(--xp-bar);
		color: white;
		padding: 0.5rem 1rem;
	}

	.action-button:hover {
		transform: translateY(-2px);
	}

	.action-button.save:hover {
		background-color: var(--background-color-level-3);
	}

	.action-button.download:hover {
		background-color: rgba(0, 143, 231, 0.8);
	}

	/* Expansions Grid */
	.expansions-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.expansion-card {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		border: 1px solid var(--background-color-level-3);
		padding: 1.25rem;
		transition: all 0.3s ease;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.expansion-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		border-color: var(--xp-bar);
	}

	.expansion-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.expansion-type {
		font-size: 0.85rem;
		color: var(--text-color-dim);
		padding: 0.25rem 0.75rem;
		background-color: var(--background-color-level-2);
		border-radius: 4px;
	}

	.official-tag {
		font-size: 0.75rem;
		color: white;
		padding: 0.25rem 0.5rem;
		background-color: var(--xp-bar);
		border-radius: 4px;
		font-weight: 500;
	}

	.expansion-title {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.35rem;
		color: var(--title-color);
	}

	.expansion-universe {
		font-size: 0.9rem;
		color: var(--text-color-dim);
		margin-bottom: 0.75rem;
	}

	.expansion-description {
		color: var(--text-color);
		font-size: 0.95rem;
		line-height: 1.5;
		margin-bottom: 1rem;
		flex-grow: 1;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.expansion-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
	}

	.expansion-stats {
		display: flex;
		gap: 1rem;
		font-size: 0.85rem;
		color: var(--text-color-dim);
	}

	.expansion-actions {
		display: flex;
		gap: 0.5rem;
	}

	.icon-button {
		background-color: var(--background-color-level-2);
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color);
		border-radius: 6px;
		padding: 0.45rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.icon-button:hover {
		background-color: var(--background-color-level-3);
	}

	.download-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem 0.85rem;
		border-radius: 6px;
		background-color: var(--xp-bar);
		border: 1px solid var(--xp-bar);
		color: white;
		font-weight: 500;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.download-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
		transform: translateY(-2px);
	}

	/* No Results */
	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		border: 1px dashed var(--background-color-level-3);
		text-align: center;
	}

	.no-results p {
		color: var(--text-color-dim);
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.reset-button {
		background-color: var(--background-color-level-2);
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color);
		padding: 0.6rem 1.2rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.reset-button:hover {
		background-color: var(--background-color-level-3);
	}

	/* Responsive Styles */
	@media (max-width: 1200px) {
		.featured-card {
			min-width: 350px;
			max-width: 350px;
		}
	}

	@media (max-width: 992px) {
		.content-container {
			padding: 1.5rem;
		}

		.featured-card {
			min-width: 300px;
			max-width: 300px;
		}

		.featured-image {
			height: 150px;
		}
	}

	@media (max-width: 768px) {
		.content-container {
			padding: 1rem;
		}

		.search-filter-bar {
			flex-direction: column;
			gap: 0.75rem;
		}

		.search-container {
			max-width: 100%;
		}

		.filter-button {
			width: 100%;
			justify-content: center;
			padding: 0.75rem;
		}

		.expansions-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}

	@media (max-width: 576px) {
		.page-header h1 {
			font-size: 1.75rem;
		}

		.page-header p {
			font-size: 1rem;
		}

		.featured-card {
			min-width: 100%;
			max-width: 100%;
		}

		.expansions-grid {
			grid-template-columns: 1fr;
		}

		.filter-group h3 {
			text-align: center;
		}

		.filter-options {
			justify-content: center;
		}
	}

	/* Accessibility Improvements */
	@media (prefers-reduced-motion: reduce) {
		.featured-card:hover,
		.expansion-card:hover,
		.action-button:hover,
		.download-button:hover,
		.icon-button:hover {
			transform: none;
		}

		.filters-container {
			animation: none;
		}
	}

	/* Focus states for keyboard navigation */
	.filter-tag:focus,
	.action-button:focus,
	.download-button:focus,
	.icon-button:focus,
	.reset-button:focus,
	.filter-button:focus {
		outline: 2px solid var(--xp-bar);
		outline-offset: 2px;
	}

	/* Dark mode optimizations */
	@media (prefers-color-scheme: dark) {
		.featured-card:hover,
		.expansion-card:hover {
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
		}
	}
</style>

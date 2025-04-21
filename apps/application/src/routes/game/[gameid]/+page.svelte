<script lang="ts">
	import { onMount, type Component } from "svelte";
	import { fade } from "svelte/transition";
	import {
		MessageSquare,
		FileText,
		BookOpen,
		HelpCircle,
		Users,
		Skull,
		Briefcase,
		Sparkles,
		Map,
	} from "@lucide/svelte";
	import ArcanaMap from "$lib/components/game/map/arcana-map.svelte";
	import MapToolbar from "$lib/components/game/map/map-toolbar.svelte";
	import Notes from "$lib/components/game/notes/notes.svelte";
	import Chat from "$lib/components/game/chat/chat.svelte";

	// Interface for sidebar tabs
	interface Tab {
		id: string;
		title: string;
		icon: Component;
		counter?: number;
	}

	// Unified layout configuration
	let layoutConfig = $state({
		left: {
			activeTab: "map",
			contentVisible: true,
			isDragging: false,
			width: 25, // Width percentage
			previousWidth: 25, // Track previous width for restoration
		},
		right: {
			activeTab: "character",
			contentVisible: true,
			isDragging: false,
			width: 25, // Width percentage
			previousWidth: 25, // Track previous width for restoration
		},
	});

	// Tab definitions for right sidebar
	const rightSidebarTabs: Tab[] = $state([
		{
			id: "character",
			title: "Ficha de Personagem",
			icon: BookOpen,
		},
		{
			id: "messages",
			title: "Mensagens",
			icon: MessageSquare,
			counter: 3,
		},
		{
			id: "notes",
			title: "Anotações",
			icon: FileText,
		},
	]);

	// Tab definitions for left sidebar
	const leftSidebarTabs: Tab[] = $state([
		{
			id: "npcs",
			title: "NPCs",
			icon: Users,
		},
		{
			id: "creatures",
			title: "Criaturas",
			icon: Skull,
		},
		{
			id: "items",
			title: "Itens & Decorações",
			icon: Briefcase,
		},
		{
			id: "effects",
			title: "Efeitos",
			icon: Sparkles,
		},
		{
			id: "map",
			title: "Mapa",
			icon: Map,
		},
	]);

	// Set active tab for right sidebar
	function setRightActiveTab(tabId: string) {
		// If clicking the already active tab, toggle content visibility
		if (layoutConfig.right.activeTab === tabId) {
			layoutConfig.right.contentVisible = !layoutConfig.right.contentVisible;
		} else {
			// If selecting a different tab, make content visible
			layoutConfig.right.contentVisible = true;
			layoutConfig.right.activeTab = tabId;

			// Clear message notifications when clicking on messages tab
			if (rightSidebarTabs.find((tab) => tab.id === tabId)?.counter) {
				rightSidebarTabs.map((tab) => {
					if (tab.id === tabId) {
						tab.counter = 0;
					}
					return tab;
				});
			}
		}
	}

	// Set active tab for left sidebar
	function setLeftActiveTab(tabId: string) {
		// If clicking the already active tab, toggle content visibility
		if (layoutConfig.left.activeTab === tabId) {
			layoutConfig.left.contentVisible = !layoutConfig.left.contentVisible;
		} else {
			// If selecting a different tab, make content visible
			layoutConfig.left.contentVisible = true;
			layoutConfig.left.activeTab = tabId;
		}
	}

	// Handle help tab click
	function openHelp() {
		layoutConfig.right.contentVisible = true;
		layoutConfig.right.activeTab = "help";
	}

	// Start resizing the right column
	function startRightResize() {
		if (!layoutConfig.right.contentVisible) return;

		layoutConfig.right.isDragging = true;
		document.addEventListener("mousemove", handleRightMouseMove);
		document.addEventListener("mouseup", stopRightResize);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	}

	// Start resizing the left column
	function startLeftResize() {
		if (!layoutConfig.left.contentVisible) return;

		layoutConfig.left.isDragging = true;
		document.addEventListener("mousemove", handleLeftMouseMove);
		document.addEventListener("mouseup", stopLeftResize);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	}

	function handleRightMouseMove(e: MouseEvent) {
		if (!layoutConfig.right.isDragging) return;

		const containerRect = document.querySelector(".columns-container")?.getBoundingClientRect();
		if (!containerRect) return;

		// Calculate right column width as percentage of container width
		const rightWidth = ((containerRect.right - e.clientX) / containerRect.width) * 100;

		// Limit right column width between 15% and 40%
		layoutConfig.right.width = Math.max(15, Math.min(40, rightWidth));

		// Update previous width as well to ensure it's saved
		layoutConfig.right.previousWidth = layoutConfig.right.width;
	}

	function handleLeftMouseMove(e: MouseEvent) {
		if (!layoutConfig.left.isDragging) return;

		const containerRect = document.querySelector(".columns-container")?.getBoundingClientRect();
		if (!containerRect) return;

		// Calculate left column width as percentage of container width
		const leftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

		// Limit left column width between 15% and 40%
		layoutConfig.left.width = Math.max(15, Math.min(40, leftWidth));

		// Update previous width as well to ensure it's saved
		layoutConfig.left.previousWidth = layoutConfig.left.width;
	}

	function stopRightResize() {
		layoutConfig.right.isDragging = false;
		document.removeEventListener("mousemove", handleRightMouseMove);
		document.removeEventListener("mouseup", stopRightResize);
		document.body.style.cursor = "";
		document.body.style.userSelect = "";

		// Save the width as previous width when stopping resize
		layoutConfig.right.previousWidth = layoutConfig.right.width;
	}

	function stopLeftResize() {
		layoutConfig.left.isDragging = false;
		document.removeEventListener("mousemove", handleLeftMouseMove);
		document.removeEventListener("mouseup", stopLeftResize);
		document.body.style.cursor = "";
		document.body.style.userSelect = "";

		// Save the width as previous width when stopping resize
		layoutConfig.left.previousWidth = layoutConfig.left.width;
	}

	// Save and load configuration
	const STORAGE_KEY = "arcanaPixelGameLayout";

	// Flag to prevent effects from overriding loaded values
	let initialLoadComplete = false;

	// Load configuration from localStorage on mount
	onMount(() => {
		const savedConfig = localStorage.getItem(STORAGE_KEY);
		if (savedConfig) {
			try {
				const parsed = JSON.parse(savedConfig);
				console.log("Loading saved layout:", parsed);

				// Update layout configuration with saved values
				if (parsed.left) {
					// Store current visibility state
					const wasVisible = layoutConfig.left.contentVisible;

					// First update the width values
					layoutConfig.left.width = parsed.left.width ?? layoutConfig.left.width;
					layoutConfig.left.previousWidth =
						parsed.left.previousWidth ?? layoutConfig.left.previousWidth;

					// Then update visibility and tab state
					layoutConfig.left.activeTab = parsed.left.activeTab ?? layoutConfig.left.activeTab;

					// Apply visibility last to prevent reactivity issues
					layoutConfig.left.contentVisible =
						parsed.left.contentVisible ?? layoutConfig.left.contentVisible;

					// If visibility changed from visible to hidden, use default collapsed width
					if (wasVisible && !layoutConfig.left.contentVisible) {
						// Keep previousWidth but set current width to collapsed
					} else if (!wasVisible && layoutConfig.left.contentVisible) {
						// Restore from previousWidth
						layoutConfig.left.width = layoutConfig.left.previousWidth;
					}
				}

				if (parsed.right) {
					// Store current visibility state
					const wasVisible = layoutConfig.right.contentVisible;

					// First update the width values
					layoutConfig.right.width = parsed.right.width ?? layoutConfig.right.width;
					layoutConfig.right.previousWidth =
						parsed.right.previousWidth ?? layoutConfig.right.previousWidth;

					// Then update visibility and tab state
					layoutConfig.right.activeTab = parsed.right.activeTab ?? layoutConfig.right.activeTab;

					// Apply visibility last to prevent reactivity issues
					layoutConfig.right.contentVisible =
						parsed.right.contentVisible ?? layoutConfig.right.contentVisible;

					// If visibility changed from visible to hidden, use default collapsed width
					if (wasVisible && !layoutConfig.right.contentVisible) {
						// Keep previousWidth but set current width to collapsed
					} else if (!wasVisible && layoutConfig.right.contentVisible) {
						// Restore from previousWidth
						layoutConfig.right.width = layoutConfig.right.previousWidth;
					}
				}
			} catch (e) {
				console.error("Failed to parse saved layout configuration", e);
			}
		}

		// Mark initial load as complete to enable reactivity effects
		initialLoadComplete = true;

		// Cleanup event listeners on component destroy
		return () => {
			document.removeEventListener("mousemove", handleRightMouseMove);
			document.removeEventListener("mouseup", stopRightResize);
			document.removeEventListener("mousemove", handleLeftMouseMove);
			document.removeEventListener("mouseup", stopLeftResize);
		};
	});

	// Save configuration to localStorage whenever it changes (but after initial load)
	$effect(() => {
		if (!initialLoadComplete) return;

		// Create a clean version of the layout config without runtime properties
		const configToSave = {
			left: {
				width: layoutConfig.left.width,
				previousWidth: layoutConfig.left.previousWidth,
				contentVisible: layoutConfig.left.contentVisible,
				activeTab: layoutConfig.left.activeTab,
			},
			right: {
				width: layoutConfig.right.width,
				previousWidth: layoutConfig.right.previousWidth,
				contentVisible: layoutConfig.right.contentVisible,
				activeTab: layoutConfig.right.activeTab,
			},
		};

		localStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave));
	});

	// Handle width changes based on content visibility - right side
	$effect(() => {
		if (!initialLoadComplete) return;

		if (!layoutConfig.right.contentVisible) {
			// Save current width before collapsing
			layoutConfig.right.previousWidth = layoutConfig.right.width;
			// No need to set width here as it's controlled by the style attribute
		}
	});

	// Handle width changes based on content visibility - left side
	$effect(() => {
		if (!initialLoadComplete) return;

		if (!layoutConfig.left.contentVisible) {
			// Save current width before collapsing
			layoutConfig.left.previousWidth = layoutConfig.left.width;
			// No need to set width here as it's controlled by the style attribute
		}
	});
</script>

<main>
	<!-- Resizable columns container -->
	<div class="columns-container">
		<!-- Left column with sidebar -->
		<div
			class="left-column"
			class:content-hidden={!layoutConfig.left.contentVisible}
			style="width: {layoutConfig.left.contentVisible ? layoutConfig.left.width : 4}%;"
		>
			<div class="sidebar-content-container left">
				<!-- Sidebar navigation (always visible) -->
				<div class="sidebar card">
					<div class="sidebar-navigation">
						{#each leftSidebarTabs as tab}
							<button
								class={layoutConfig.left.activeTab === tab.id ? "active" : ""}
								onclick={() => setLeftActiveTab(tab.id)}
								title={tab.title}
							>
								<tab.icon size={20} />
							</button>
						{/each}
					</div>
				</div>

				<!-- Content area (conditionally shown) -->
				{#if layoutConfig.left.contentVisible}
					<div class="content-area card" transition:fade={{ duration: 200 }}>
						<div class="content-wrapper">
							{#if layoutConfig.left.activeTab === "npcs"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>NPCs</h3>
									<p>Gerenciar personagens não-jogáveis do seu mundo.</p>
								</div>
							{:else if layoutConfig.left.activeTab === "creatures"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Criaturas</h3>
									<p>Adicionar e gerenciar criaturas e monstros.</p>
								</div>
							{:else if layoutConfig.left.activeTab === "items"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Itens & Decorações</h3>
									<p>Coloque objetos, decorações e itens no mapa.</p>
								</div>
							{:else if layoutConfig.left.activeTab === "effects"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Efeitos</h3>
									<p>Adicione efeitos visuais e atmosféricos no mapa.</p>
								</div>
							{:else if layoutConfig.left.activeTab === "map"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Mapa</h3>
									<p>Gerencie camadas e configurações do mapa.</p>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Left resizer handle -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="resizer left-resizer"
			class:disabled={!layoutConfig.left.contentVisible}
			onmousedown={startLeftResize}
		></div>

		<!-- Middle column (game area) -->
		<div class="middle-column">
			<ArcanaMap />
			<MapToolbar />
		</div>

		<!-- Right resizer handle -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="resizer"
			class:disabled={!layoutConfig.right.contentVisible}
			onmousedown={startRightResize}
		></div>

		<!-- Right column (sidebar and content) -->
		<div
			class="right-column"
			class:content-hidden={!layoutConfig.right.contentVisible}
			style="width: {layoutConfig.right.contentVisible ? layoutConfig.right.width : 4}%;"
		>
			<div class="sidebar-content-container">
				<!-- Content area (conditionally shown) -->
				{#if layoutConfig.right.contentVisible}
					<div class="content-area card" transition:fade={{ duration: 200 }}>
						<div class="content-wrapper">
							{#if layoutConfig.right.activeTab === "messages"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<Chat />
								</div>
							{:else if layoutConfig.right.activeTab === "character"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Ficha de Personagem</h3>
									<p>Aqui aparecerá a ficha de personagem.</p>
								</div>
							{:else if layoutConfig.right.activeTab === "notes"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<Notes />
								</div>
							{:else if layoutConfig.right.activeTab === "help"}
								<div class="content-pane" in:fade={{ duration: 200 }}>
									<h3>Ajuda</h3>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				<!-- Sidebar navigation (always visible) -->
				<div class="sidebar card">
					<div class="sidebar-navigation">
						{#each rightSidebarTabs as tab}
							<button
								class={layoutConfig.right.activeTab === tab.id ? "active" : ""}
								onclick={() => setRightActiveTab(tab.id)}
								title={tab.title}
							>
								<tab.icon size={20} />
								{#if tab.counter && tab.counter > 0}
									<span class="notification-badge">{tab.counter > 9 ? "9+" : tab.counter}</span>
								{/if}
							</button>
						{/each}
					</div>
					<div class="help-button">
						<button
							class={layoutConfig.right.activeTab === "help" ? "active" : ""}
							onclick={openHelp}
							title="Ajuda"
						>
							<HelpCircle size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	/* Main Layout */
	main {
		color: var(--text-color);
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 1.25rem;
		background-color: var(--background-color-level-0);
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	/* Columns Layout */
	.columns-container {
		flex: 1;
		display: flex;
		position: relative;
		gap: 0;
		height: 100%;
		overflow: hidden;
	}

	.left-column,
	.right-column,
	.middle-column {
		height: 100%;
		position: relative;
	}

	.left-column {
		width: 25%;
		overflow: hidden;
	}

	.left-column.content-hidden {
		width: 60px !important;
	}

	.middle-column {
		flex: 1;
	}

	.right-column {
		width: 25%;
		overflow: hidden;
	}

	.right-column.content-hidden {
		width: 60px !important;
	}

	/* Sidebar + Content Layout */
	.sidebar-content-container {
		display: flex;
		height: 100%;
		gap: 0.75rem;
		justify-content: flex-end;
		overflow: hidden;
	}

	.sidebar-content-container.left {
		flex-direction: row;
		justify-content: flex-start;
	}

	/* Sidebar */
	.sidebar {
		width: 60px;
		height: 100%;
		padding: 0.75rem 0.5rem;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		z-index: 2;
	}

	.sidebar-navigation {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex-grow: 1;
	}

	.help-button {
		margin-top: auto;
		padding-top: 0.75rem;
	}

	.help-button button {
		width: 42px;
		height: 42px;
		background: none;
		border: none;
		border-radius: var(--border-radius);
		color: var(--text-color-dim);
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0 auto;
	}

	.help-button button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-2);
	}

	.help-button button.active {
		color: var(--primary-color);
		background-color: var(--primary-color-10);
	}

	.sidebar-navigation button {
		width: 42px;
		height: 42px;
		background: none;
		border: none;
		border-radius: var(--border-radius);
		color: var(--text-color-dim);
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0 auto;
	}

	.sidebar-navigation button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-2);
	}

	.sidebar-navigation button.active {
		color: var(--primary-color);
		background-color: var(--primary-color-10);
	}

	/* Content Area */
	.content-area {
		flex: 1;
		height: 100%;
		position: relative;
		overflow: hidden;
		font-size: 0.9rem;
		z-index: 1;
	}

	.content-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.content-pane {
		padding: 1rem;
		height: 100%;
		width: 100%;
	}

	.content-pane h3 {
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 1.25rem;
		color: var(--title-color);
	}

	/* Resizer */
	.resizer {
		width: 0.75rem;
		height: 100%;
		background-color: transparent;
		cursor: col-resize;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		flex-shrink: 0;
	}

	.resizer.disabled {
		cursor: default;
		pointer-events: none;
		opacity: 0.5;
	}

	.resizer::after {
		content: "";
		width: 4px;
		height: 40px;
		background-color: var(--background-color-level-2);
		border-radius: 4px;
	}

	.resizer:hover::after {
		background-color: var(--primary-color);
	}

	.left-resizer::after {
		content: "";
		width: 4px;
		height: 40px;
		background-color: var(--background-color-level-2);
		border-radius: 4px;
	}

	.left-resizer:hover::after {
		background-color: var(--primary-color);
	}

	/* Notification Badge */
	.notification-badge {
		position: absolute;
		top: 0;
		right: 0;
		background-color: var(--primary-color);
		color: var(--primary-color-contrast);
		font-size: 0.7rem;
		font-weight: 600;
		min-width: 16px;
		height: 16px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1px 4px 0;
		line-height: 1;
		box-sizing: content-box;
	}

	/* Card styles */
	.card {
		background-color: var(--background-color-level-1);
		border-radius: calc(var(--border-radius) * 1.25);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.columns-container {
			flex-direction: column;
			height: auto;
		}

		.left-column,
		.right-column,
		.middle-column {
			width: 100% !important;
		}

		.middle-column {
			height: 50vh;
			order: 1;
		}

		.left-column {
			margin-bottom: 1rem;
			order: 0;
		}

		.right-column {
			margin-top: 1rem;
			order: 2;
		}

		.resizer,
		.left-resizer {
			display: none;
		}

		.sidebar-content-container {
			flex-direction: column-reverse;
		}

		.sidebar-content-container.left {
			flex-direction: column-reverse;
		}

		.sidebar {
			width: 100%;
			height: auto;
		}

		.sidebar-navigation {
			flex-direction: row;
			justify-content: space-between;
		}

		.sidebar-navigation button {
			flex: 1;
			justify-content: center;
		}
	}
</style>

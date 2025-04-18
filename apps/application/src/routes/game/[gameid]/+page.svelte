<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import {
		MessageSquare,
		FileText,
		History,
		BookOpen,
		Move,
		Pencil,
		Eraser,
		Layers,
		Grid,
		Image,
		SquarePen,
		Ruler,
		Shapes,
		Dices,
		PencilRuler,
		X,
	} from "@lucide/svelte";
	import ArcanaMap from "$lib/components/game/map/arcana-map.svelte";

	// Active tab state
	let activeTab = $state("character");
	let unreadMessages = $state(3);
	let isToolbarVisible = $state(false);

	// Set active tab
	function setActiveTab(tabId: string) {
		activeTab = tabId;

		// Clear message notifications when clicking on messages tab
		if (tabId === "messages") {
			unreadMessages = 0;
		}
	}

	// Tab definitions
	const tabs = [
		{
			id: "character",
			title: "Ficha de Personagem",
			icon: BookOpen,
		},
		{
			id: "messages",
			title: "Mensagens",
			icon: MessageSquare,
		},
		{
			id: "history",
			title: "Histórico",
			icon: History,
		},
		{
			id: "notes",
			title: "Anotações",
			icon: FileText,
		},
		{
			id: "dice",
			title: "Rolagem de Dados",
			icon: Dices,
		},
	];

	// Map editing tools
	const mapTools = [
		{
			id: "select",
			title: "Selecionar",
			icon: Move,
		},
		{
			id: "draw",
			title: "Desenhar",
			icon: Pencil,
		},
		{
			id: "erase",
			title: "Apagar",
			icon: Eraser,
		},
		{
			id: "layers",
			title: "Camadas",
			icon: Layers,
		},
		{
			id: "grid",
			title: "Grade",
			icon: Grid,
		},
		{
			id: "image",
			title: "Imagem",
			icon: Image,
		},
		{
			id: "token",
			title: "Token",
			icon: SquarePen,
		},
		{
			id: "measure",
			title: "Medir",
			icon: Ruler,
		},
		{
			id: "shapes",
			title: "Formas",
			icon: Shapes,
		},
	];

	// Toolbar state
	let isToolbarCollapsed = $state(false);

	function toggleToolbar() {
		isToolbarCollapsed = !isToolbarCollapsed;
	}

	// Resizable columns functionality
	let isDragging = false;
	let leftColumnWidth = $state(75); // Initial percentage (3-1 ratio as requested)

	function startResize() {
		isDragging = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", stopResize);
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;

		const containerRect = document.querySelector(".columns-container")?.getBoundingClientRect();
		if (!containerRect) return;

		const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
		leftColumnWidth = Math.max(20, Math.min(80, newLeftWidth)); // Limit between 20% and 80%
	}

	function stopResize() {
		isDragging = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", stopResize);
		document.body.style.cursor = "";
		document.body.style.userSelect = "";
	}

	onMount(() => {
		// Cleanup event listeners on component destroy
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", stopResize);
		};
	});
</script>

<main>
	<!-- Resizable columns container -->
	<div class="columns-container">
		<!-- Left column (game area placeholder) -->
		<div class="left-column" style="width: {leftColumnWidth}%;">
			<ArcanaMap />

			<!-- Map toolbar -->
			<div class="map-toolbar-container">
				<div class="toolbar-open-close card">
					<button
						class="tool-button"
						title="Abrir/Fechar"
						onclick={() => (isToolbarVisible = !isToolbarVisible)}
					>
						{#if isToolbarVisible}
							<X size={18} />
						{:else}
							<PencilRuler size={18} />
						{/if}
					</button>
				</div>

				{#if isToolbarVisible}
					<div
						class="map-toolbar card"
						in:fly={{ x: 0, y: 20, duration: 300, opacity: 0 }}
						out:fly={{ x: 0, y: 20, duration: 200, opacity: 0 }}
					>
						<div class="toolbar-tools">
							{#each mapTools as tool}
								<button
									class="tool-button"
									title={tool.title}
									in:fade={{ delay: 100, duration: 150 }}
								>
									<tool.icon size={18} />
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Resizer handle -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="resizer" onmousedown={startResize}></div>

		<!-- Right column (tabs and content) -->
		<div class="right-column" style="width: calc(100% - {leftColumnWidth}%);">
			<!-- Tabs navigation -->
			<div class="tabs-container card">
				<div class="tabs-navigation">
					{#each tabs as tab}
						<button
							class={activeTab === tab.id ? "active" : ""}
							onclick={() => setActiveTab(tab.id)}
							title={tab.title}
						>
							<tab.icon size={20} />
							{#if tab.id === "messages" && unreadMessages > 0}
								<span class="notification-badge">{unreadMessages > 9 ? "9+" : unreadMessages}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Tab content -->
			<div class="tab-content card">
				{#if activeTab === "messages"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Mensagens</h3>
						<p>Aqui aparecerão as mensagens do jogo.</p>
					</div>
				{:else if activeTab === "character"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Ficha de Personagem</h3>
						<p>Aqui aparecerá a ficha de personagem.</p>
					</div>
				{:else if activeTab === "history"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Histórico</h3>
						<p>Aqui aparecerá o histórico do jogo.</p>
					</div>
				{:else if activeTab === "notes"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Anotações</h3>
						<p>Aqui aparecerão suas anotações do jogo.</p>
					</div>
				{:else if activeTab === "dice"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Rolagem de Dados</h3>
						<p>Aqui você poderá rolar dados customizados.</p>
					</div>
				{/if}
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
	.right-column {
		height: 100%;
		position: relative;
	}

	/* Resizer handle */
	.resizer {
		width: 0.75rem;
		height: 100%;
		background-color: transparent;
		cursor: col-resize;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
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

	/* Map Toolbar */
	.map-toolbar-container {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column-reverse;
		align-items: end;
		gap: 0.5rem;
	}

	.map-toolbar {
		display: flex;
		flex-direction: row;
		background-color: var(--background-color-level-0) !important;
		border-radius: calc(var(--border-radius) * 0.75) !important;
		overflow: hidden;
		padding: 0.25rem !important;
		z-index: 1000;
	}

	.toolbar-open-close {
		display: flex;
		flex-direction: row;
		background-color: var(--background-color-level-0) !important;
		border-radius: calc(var(--border-radius) * 0.75) !important;
		overflow: hidden;
		padding: 0.25rem !important;
		z-index: 1000;
	}

	.toolbar-tools {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0;
	}

	.tool-button {
		width: 32px;
		height: 32px;
		background: none;
		border: none;
		border-radius: calc(var(--border-radius) * 0.5);
		color: var(--text-color-dim);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s ease;
	}

	.tool-button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-1);
	}

	/* Tabs Container */
	.tabs-container {
		margin-bottom: 0.75rem;
		padding: 0.5rem;
		border-radius: calc(var(--border-radius) * 1.25);
	}

	.tabs-navigation {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.tabs-navigation button {
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
	}

	.tabs-navigation button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-2);
	}

	.tabs-navigation button.active {
		color: var(--primary-color);
		background-color: var(--primary-color-10);
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
		min-width: 18px;
		height: 18px;
		border-radius: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4px;
		line-height: 1;
		box-sizing: content-box;
	}

	/* Tab Content */
	.tab-content {
		flex: 1;
		height: calc(100% - (42px + 1.75rem));
		overflow-y: auto;
	}

	.tab-pane {
		padding: 1.5rem;
		height: 100%;
	}

	.tab-pane h3 {
		margin-bottom: 1rem;
		font-weight: 600;
		font-size: 1.5rem;
		color: var(--title-color);
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
		.right-column {
			width: 100% !important;
		}

		.left-column {
			height: 50vh;
		}

		.right-column {
			margin-top: 1rem;
		}

		.resizer {
			display: none;
		}

		.map-toolbar-container {
			position: fixed;
			top: auto;
			bottom: 1.5rem;
			left: 1.5rem;
			height: auto;
		}

		.map-toolbar {
			flex-direction: row;
		}

		.toolbar-tools {
			flex-direction: row;
		}
	}
</style>

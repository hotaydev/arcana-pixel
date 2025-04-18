<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { MessageSquare, FileText, BookOpen } from "@lucide/svelte";
	import ArcanaMap from "$lib/components/game/map/arcana-map.svelte";
	import MapToolbar from "$lib/components/game/map/map-toolbar.svelte";
	import Notes from "$lib/components/game/notes/notes.svelte";
	import Chat from "$lib/components/game/chat/chat.svelte";

	// Active tab state
	let activeTab = $state("character");
	let unreadMessages = $state(3);

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
			id: "notes",
			title: "Anotações",
			icon: FileText,
		},
	];

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
			<MapToolbar />
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
						<Chat />
					</div>
				{:else if activeTab === "character"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<h3>Ficha de Personagem</h3>
						<p>Aqui aparecerá a ficha de personagem.</p>
					</div>
				{:else if activeTab === "notes"}
					<div class="tab-pane" in:fade={{ duration: 200 }}>
						<Notes />
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
		height: calc(100% - (42px + 1.25rem));
		overflow-y: auto;
		font-size: 0.9rem;
	}

	.tab-pane {
		padding: 0.65rem;
		height: 100%;
		width: 100%;
	}

	.tab-pane h3 {
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 1.25rem;
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
	}
</style>

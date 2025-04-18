<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import {
		Move,
		Pencil,
		Eraser,
		Layers,
		Grid,
		Image,
		SquarePen,
		Ruler,
		Shapes,
		PencilRuler,
		X,
	} from "@lucide/svelte";

	let isToolbarVisible = $state(false);

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
</script>

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
					<button class="tool-button" title={tool.title} in:fade={{ delay: 100, duration: 150 }}>
						<tool.icon size={18} />
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
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

	/* Card styles */
	.card {
		background-color: var(--background-color-level-1);
		border-radius: calc(var(--border-radius) * 1.25);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	/* Media Queries */
	@media (max-width: 768px) {
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

<script lang="ts">
	import { fade } from "svelte/transition";
	import { Edit, Trash2, Link, Search } from "@lucide/svelte";

	// Notes state
	interface Note {
		id: number;
		title: string;
		content: string;
		date: string;
		location: string;
	}

	let notes = $state<Note[]>([
		{
			id: 1,
			title: "Missão Principal",
			content:
				"Encontrar o artefato perdido nas ruínas antigas. O prefeito ofereceu 500 moedas de ouro pela recuperação.",
			date: "12/10/2023",
			location: "Cidade de Valoria",
		},
		{
			id: 2,
			title: "Contatos Importantes",
			content:
				"Aldor - Mercador de itens mágicos\nHelena - Curandeira do templo\nGrommash - Ferreiro",
			date: "15/10/2023",
			location: "Taberna do Dragão",
		},
		{
			id: 3,
			title: "Pistas sobre o Culto",
			content:
				"Símbolos estranhos encontrados em árvores. Parece haver um padrão apontando para o norte. Pergaminhos com texto em linguagem antiga.",
			date: "18/10/2023",
			location: "Floresta Sombria",
		},
	]);

	let searchTerm = $state("");
	let filteredNotes = $derived(
		searchTerm
			? notes.filter(
					(note) =>
						note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
						note.location.toLowerCase().includes(searchTerm.toLowerCase())
				)
			: notes
	);
</script>

<div class="notes-container">
	<div class="notes-header">
		<h3>Anotações</h3>
		<button class="new-note-btn">Nova Anotação</button>
	</div>

	<div class="notes-search">
		<div class="search-input-wrapper">
			<Search size={16} />
			<input type="text" placeholder="Pesquisar anotações..." bind:value={searchTerm} />
		</div>
	</div>

	<div class="notes-list">
		{#if filteredNotes.length === 0}
			<div class="no-notes-message">
				Nenhuma anotação encontrada para "{searchTerm}"
			</div>
		{:else}
			{#each filteredNotes as note (note.id)}
				<div class="note-item">
					<div class="note-header">
						<h4>{note.title}</h4>
						<div class="note-actions">
							<button class="icon-btn edit"><Edit size={16} /></button>
							<button class="icon-btn delete"><Trash2 size={16} /></button>
							<button class="icon-btn share"><Link size={16} /></button>
						</div>
					</div>
					<div class="note-meta">
						<span class="note-date">{note.date}</span>
						<span class="note-location">{note.location}</span>
					</div>
					<p class="note-content">{note.content}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	h3 {
		margin-bottom: 0.75rem;
		font-weight: 600;
		font-size: 1.25rem;
		color: var(--title-color);
	}

	/* Notes Tab Styles */
	.notes-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.notes-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--background-color-level-2);
		margin-bottom: 0.75rem;
	}

	.notes-header h3 {
		margin-bottom: 0;
	}

	.new-note-btn {
		padding: 0.4rem 0.75rem;
		background-color: var(--primary-color);
		color: var(--primary-color-contrast);
		border: none;
		border-radius: var(--border-radius);
		font-weight: 500;
		font-size: 0.85rem;
		cursor: pointer;
	}

	.new-note-btn:hover {
		background-color: var(--primary-color-hover, var(--primary-color-dark, #0056b3));
	}

	.notes-search {
		margin-bottom: 1rem;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-input-wrapper :global(svg) {
		position: absolute;
		left: 0.75rem;
		color: var(--text-color-dim);
	}

	.notes-search input {
		width: 100%;
		padding: 0.5rem 0.75rem 0.5rem 2.25rem;
		border-radius: var(--border-radius);
		border: 1px solid var(--background-color-level-2);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
	}

	.notes-list {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		scrollbar-width: thin;
		scrollbar-color: var(--background-color-level-3) var(--background-color-level-1);
	}

	/* Custom scrollbar for webkit browsers */
	.notes-list::-webkit-scrollbar {
		width: 6px;
	}

	.notes-list::-webkit-scrollbar-track {
		background: var(--background-color-level-1);
		border-radius: 4px;
	}

	.notes-list::-webkit-scrollbar-thumb {
		background-color: var(--background-color-level-3);
		border-radius: 4px;
	}

	.notes-list::-webkit-scrollbar-thumb:hover {
		background-color: var(--primary-color);
	}

	.note-item {
		padding: 0.75rem;
		background-color: var(--background-color-level-2);
		border-radius: var(--border-radius);
	}

	.note-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.5rem;
	}

	.note-header h4 {
		margin: 0;
		font-weight: 600;
		color: var(--title-color);
	}

	.note-actions {
		display: flex;
		gap: 0.25rem;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: var(--border-radius);
		color: var(--text-color-dim);
	}

	.icon-btn:hover {
		background-color: var(--background-color-level-3);
		color: var(--text-color);
	}

	.note-meta {
		font-size: 0.75rem;
		color: var(--text-color-dim);
		margin-bottom: 0.5rem;
		display: flex;
		gap: 1rem;
	}

	.note-content {
		font-size: 0.9rem;
		line-height: 1.4;
		margin: 0;
		white-space: pre-line;
	}

	.no-notes-message {
		padding: 1rem;
		text-align: center;
		color: var(--text-color-dim);
		font-style: italic;
	}
</style>

<script lang="ts">
	import { BookOpen, Plus } from "@lucide/svelte";
	import CharacterCard from "$lib/components/my-characters/character-card.svelte";
	import CharacterCreationModal from "$lib/components/my-characters/character-creation-modal.svelte";

	export let characters;

	// Modal state
	let showCreationModal = false;

	// Open modal for new character creation
	function createNewCharacter() {
		showCreationModal = true;
	}

	// Handle modal close
	function handleModalClose() {
		showCreationModal = false;
	}

	// Handle option selection from modal
	function handleOptionSelect(detail: { system: string; option: string }) {
		console.log("Selected system:", detail.system);
		console.log("Selected option:", detail.option);
		showCreationModal = false;
	}
</script>

<!-- Main content area -->
<div class="content-container">
	<header class="page-header">
		<h1>Meus personagens</h1>
		<p>Gerencie seus personagens de RPG</p>
	</header>

	{#if characters.length === 0}
		<!-- Characters content placeholder -->
		<div class="placeholder-content">
			<BookOpen size={64} color="var(--text-color-dim)" />
			<div>
				<p>Aqui você terá seus personagens de RPG de diferentes sistemas</p>
				<p class="small">Crie seu próprio personagem ou importe de outros sistemas suportados.</p>
			</div>
			<button class="action-button" on:click={createNewCharacter}>
				<Plus size={20} />
				<span>Criar ou importar novo personagem</span>
			</button>
		</div>
	{:else}
		<!-- Characters grid -->
		<div class="characters-grid">
			<!-- Create new character card -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="character-card new-character" on:click={createNewCharacter}>
				<div class="new-character-content">
					<Plus size={48} color="var(--text-color-dim)" />
					<p>Criar ou importar novo personagem</p>
				</div>
			</div>

			<!-- Character cards -->
			{#each characters as character, index}
				<CharacterCard {character} {index} />
			{/each}
		</div>
	{/if}

	<!-- Character creation modal -->
	<CharacterCreationModal
		show={showCreationModal}
		onClose={handleModalClose}
		onSelect={handleOptionSelect}
	/>
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

	/* Characters Grid */
	.characters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	/* Character Card Styles */
	.character-card {
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

	.character-card:hover {
		transform: translateY(-5px);
		border-color: var(--xp-bar);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	/* Create New Character Card */
	.new-character {
		border: 2px dashed var(--background-color-level-3);
		background-color: rgba(255, 255, 255, 0.02);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: auto;
		min-height: 240px;
	}

	.new-character:hover {
		border-color: var(--xp-bar);
		background-color: rgba(0, 143, 231, 0.05);
	}

	.new-character-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: var(--text-color-dim);
		padding: 2rem;
		text-align: center;
	}

	.new-character-content p {
		font-weight: 500;
	}

	/* Placeholder content for new sections */
	.placeholder-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1.5rem;
		min-height: 300px;
		padding: 4rem 2rem;
		color: var(--text-color-dim);
		background-color: var(--background-color-level-0);
		border-radius: 12px;
		border: 2px dashed var(--background-color-level-3);
	}

	.placeholder-content p {
		font-size: 1.2rem;
		max-width: 600px;
	}

	.placeholder-content p.small {
		font-size: 0.8rem;
		margin-top: 8px;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--xp-bar);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
	}

	.action-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
		transform: translateY(-2px);
	}

	/* Animation for the cards */
	.character-card {
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
	.character-card {
		animation-delay: 0.05s;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.content-container {
			padding: 1.5rem 1rem;
		}

		.characters-grid {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 1rem;
		}
	}

	@media (max-width: 480px) {
		.characters-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

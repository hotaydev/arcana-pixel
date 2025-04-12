<script lang="ts">
	import { BookOpen, Plus } from "@lucide/svelte";
</script>

<!-- Main content area -->
<div class="content-container">
	<header class="page-header">
		<h1>Minhas expansões</h1>
		<p>Conteúdo personalizado e regras customizadas</p>
	</header>

	<!-- Characters content placeholder -->
	<div class="placeholder-content">
		<BookOpen size={64} color="var(--text-color-dim)" />
		<p>Aqui você encontrará conteúdo customizado, regras, NPCs, mapas e mais</p>
		<button class="action-button">
			<Plus size={20} />
			<span>Adicionar nova expansão</span>
		</button>
	</div>
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

	/* Media Queries */
	@media (max-width: 768px) {
		.content-container {
			padding: 1.5rem 1rem;
		}
	}
</style>

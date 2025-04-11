<script lang="ts">
	import { Upload, X } from "@lucide/svelte";

	export let toggleImportDialog: () => void;

	// Handle import game file
	function handleImportGame() {
		toggleImportDialog();
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="modal-overlay" on:click={toggleImportDialog}>
	<div class="modal" on:click|stopPropagation>
		<div class="modal-header">
			<h2>Importar sistema ou campanha</h2>
			<button type="button" class="close-button" on:click={toggleImportDialog} aria-label="Close">
				<X size={20} />
			</button>
		</div>

		<div class="modal-content">
			<p>Selecione o arquivo do jogo para importar:</p>

			<div class="file-drop-area">
				<Upload size={48} />
				<p>Arraste e solte seu arquivo aqui ou <span class="browse-text">procure</span></p>
				<input type="file" class="file-input" accept=".json,.jsonc" />
			</div>

			<div class="supported-formats">
				<p>Formatos suportados: .json, .jsonc</p>
			</div>
		</div>

		<div class="modal-footer">
			<button class="secondary-button" on:click={toggleImportDialog}>Cancelar</button>
			<button class="primary-button" on:click={handleImportGame}>Importar</button>
		</div>
	</div>
</div>

<style>
	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(3px);
	}

	.modal {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		animation: modal-appear 0.3s ease-out;
		border: 1px solid var(--background-color-level-3);
	}

	@keyframes modal-appear {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem;
		border-bottom: 1px solid var(--divider-color);
	}

	.modal-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--title-color);
	}

	.close-button {
		background: none;
		border: none;
		color: var(--text-color-dim);
		cursor: pointer;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background-color: var(--background-color-level-2);
		color: var(--text-color);
	}

	.modal-content {
		padding: 1.5rem;
	}

	.modal-content p {
		margin-bottom: 1.25rem;
		color: var(--text-color);
	}

	.file-drop-area {
		border: 2px dashed var(--background-color-level-3);
		border-radius: 8px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-align: center;
		color: var(--text-color-dim);
		position: relative;
		transition: all 0.2s ease;
		margin-bottom: 1rem;
	}

	.file-drop-area:hover {
		border-color: var(--xp-bar);
		background-color: rgba(0, 143, 231, 0.05);
	}

	.browse-text {
		color: var(--xp-bar);
		font-weight: 500;
		cursor: pointer;
	}

	.file-input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.supported-formats {
		color: var(--text-color-dim);
		font-size: 0.85rem;
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		padding: 1.25rem;
		border-top: 1px solid var(--divider-color);
	}

	.secondary-button,
	.primary-button {
		padding: 0.65rem 1.25rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.secondary-button {
		background-color: transparent;
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color);
	}

	.secondary-button:hover {
		background-color: var(--background-color-level-2);
	}

	.primary-button {
		background-color: var(--xp-bar);
		border: none;
		color: white;
	}

	.primary-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
	}

	/* Transitions for UI elements */
	.modal {
		transition:
			opacity 0.15s ease-in-out,
			transform 0.15s ease-in-out;
	}
</style>

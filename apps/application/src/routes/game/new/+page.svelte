<script lang="ts">
	import HelpButton from "$lib/components/common/help-button.svelte";
	import Navbar from "$lib/components/common/navbar.svelte";
	import CustomSelect from "$lib/components/common/custom-select.svelte";
	import { Plus, Bookmark, ChevronDown, ChevronUp, ExternalLink } from "@lucide/svelte";
	import variables from "$lib/variables";
	import { goto } from "$app/navigation";

	// RPG systems for dropdown
	const rpgSystems = [
		"Dungeons & Dragons 5e",
		"Call of Cthulhu",
		"Tormenta 20",
		"Ordem Paranormal",
		"Outro",
	];

	// Form data
	let formData = {
		title: "",
		description: "",
		system: "",
	};

	// Form validation
	let errors = {
		title: "",
		description: "",
	};

	// Tips visibility state
	let tipsVisible = false;

	function toggleTips() {
		tipsVisible = !tipsVisible;
	}

	function validateForm() {
		let isValid = true;

		// Reset errors
		errors = {
			title: "",
			description: "",
		};

		if (!formData.title.trim()) {
			errors.title = "O título é obrigatório";
			isValid = false;
		}

		if (!formData.description.trim()) {
			errors.description = "A descrição é obrigatória";
			isValid = false;
		}

		return isValid;
	}

	function handleSystemChange(value: string) {
		formData.system = value;
	}

	function handleSubmit() {
		if (validateForm()) {
			// Process form data
			console.log("Submitting:", formData);
			goto("/");
		}
	}
</script>

<main>
	<!-- Top navigation bar -->
	<Navbar></Navbar>

	<!-- Main content area -->
	<div class="content-container">
		<header class="page-header">
			<h1>Criar novo jogo</h1>
			<p>Configure sua nova campanha ou sessão de RPG</p>
		</header>

		<form on:submit|preventDefault={handleSubmit}>
			<div class="form-grid">
				<div class="form-section">
					<div class="form-group">
						<label for="title">Título <span class="required">*</span></label>
						<input
							type="text"
							id="title"
							bind:value={formData.title}
							placeholder="Ex: As Masmorras de Undermountain"
							class={errors.title ? "error" : ""}
						/>
						{#if errors.title}
							<p class="error-message">{errors.title}</p>
						{/if}
					</div>

					<div class="form-group">
						<label for="description">Descrição <span class="required">*</span></label>
						<textarea
							id="description"
							bind:value={formData.description}
							placeholder="Detalhe sua campanha para os jogadores..."
							rows="6"
							class={errors.description ? "error" : "description-textarea"}
						></textarea>
						{#if errors.description}
							<p class="error-message">{errors.description}</p>
						{/if}
					</div>

					<div class="form-group">
						<label for="system">Sistema <span class="required">*</span></label>
						<CustomSelect
							options={rpgSystems}
							bind:value={formData.system}
							placeholder="Selecione um sistema"
							searchable
						/>
						{#if variables.expansionsEnabled}
							<p class="expansions-message">
								Você pode adicionar mais sistemas pelas
								<a href="/?tab=marketplace">expansões da comunidade <ExternalLink size={14} /></a>
							</p>
						{/if}
					</div>
				</div>

				<div class="form-section">
					<div class="form-group">
						<label for="image">Imagem de capa (opcional)</label>
						<div class="image-upload">
							<div class="image-placeholder">
								<Bookmark size={32} color="var(--text-color-dim)" />
								<p>Arraste uma imagem ou clique para fazer upload</p>
							</div>
							<input type="file" id="image" accept="image/*" />
						</div>
					</div>
				</div>
			</div>

			<div class="form-actions">
				<a href="/" class="cancel-button">Cancelar</a>
				<button type="submit" class="action-button">
					<Plus size={20} />
					<span>Criar campanha</span>
				</button>
			</div>
		</form>

		<div class="helpful-tips">
			<button class="tips-header" on:click={toggleTips}>
				<div class="toggle-icon">
					{#if tipsVisible}
						<ChevronUp size={20} />
					{:else}
						<ChevronDown size={20} />
					{/if}
				</div>
				<h3>Dicas para uma boa campanha</h3>
			</button>
			{#if tipsVisible}
				<ul>
					<li>Crie um título que desperte a curiosidade dos jogadores</li>
					<li>Na descrição, inclua o tom da história e expectativas sobre a campanha</li>
					<li>Especifique qualquer material que os jogadores precisem ter</li>
				</ul>
			{/if}
		</div>
	</div>

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

	/* Content Container */
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

	/* Form Layout */
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Form Elements */
	label {
		font-weight: 500;
		color: var(--text-color);
	}

	.required {
		color: #ff5252;
		margin-left: 2px;
	}

	input[type="text"],
	textarea {
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-1);
		color: var(--text-color);
		font-size: 1rem;
	}

	input[type="text"]:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 2px var(--primary-color-20);
	}

	/* Make description textarea resizable only vertically */
	textarea.description-textarea {
		resize: vertical;
	}

	.error {
		border-color: #ff5252;
	}

	.error-message {
		color: #ff5252;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}

	/* Image Upload */
	.image-upload {
		position: relative;
		overflow: hidden;
	}

	.image-placeholder {
		border: 2px dashed var(--background-color-level-3);
		border-radius: 8px;
		padding: 2rem 2rem 2.5rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		color: var(--text-color-dim);
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.image-placeholder:hover {
		border-color: var(--primary-color);
		background-color: var(--primary-color-5);
	}

	.image-upload input[type="file"] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	/* Form Actions */
	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 4rem;
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-contrast);
		border: none;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
	}

	.action-button:hover {
		background-color: var(--primary-color-80);
		transform: translateY(-2px);
	}

	.cancel-button {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background-color: transparent;
		color: var(--text-color);
		border: 1px solid var(--background-color-level-3);
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1rem;
		text-decoration: none;
	}

	.cancel-button:hover {
		background-color: var(--background-color-level-1);
	}

	/* Tips Section */
	.helpful-tips {
		margin-top: 3rem;
		padding: 1.5rem;
		border-radius: 8px;
		background-color: var(--background-color-level-1);
		border: 1px solid var(--background-color-level-3);
	}

	.tips-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		/* margin-bottom: 1rem; */
		color: var(--text-color);
		cursor: pointer;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: 0;
		font-family: inherit;
	}

	.toggle-icon {
		font-size: 1.5rem;
		padding-top: 4px;
		color: var(--text-color-dim);
	}

	.tips-header h3 {
		font-size: 1.1rem;
		font-weight: 600;
	}

	.helpful-tips ul {
		margin-left: 1.5rem;
		margin-top: 1rem;
		color: var(--text-color-dim);
	}

	.helpful-tips li {
		margin-bottom: 0.5rem;
	}

	.expansions-message {
		color: var(--text-color-dim);
		font-size: 0.875rem;
		margin-top: 0;
		margin-left: 4px;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.expansions-message a {
		color: var(--text-color);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.content-container {
			padding: 1.5rem 1rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>

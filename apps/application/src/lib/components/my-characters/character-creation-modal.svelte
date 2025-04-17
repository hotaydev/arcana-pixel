<script lang="ts">
	import { fade, scale } from "svelte/transition";
	import {
		Plus,
		X,
		Book,
		ArrowLeft,
		Skull,
		Scroll,
		Telescope,
		Search,
		CircleCheck,
		CircleAlert,
	} from "@lucide/svelte";
	import { type Component } from "svelte";
	import { goto } from "$app/navigation";
	import variables from "$lib/variables";

	let {
		onClose,
		onSelect,
		show,
	}: {
		onClose: () => void;
		onSelect: (data: { system: string; option: string }) => void;
		show: boolean;
	} = $props();

	// Define type for import option
	type ImportOption = {
		id: string;
		title: string;
		icon: Component;
		status: "ready" | "beta" | "coming_soon";
	};

	// Define type for RPG system
	type RpgSystem = {
		id: string;
		title: string;
		description: string;
		icon: Component;
		status: "ready" | "beta" | "coming_soon";
		importOptions: ImportOption[];
	};

	// RPG Systems with their import options
	const rpgSystems: RpgSystem[] = [
		{
			id: "dnd5e",
			title: "D&D 5e",
			description: "Dungeons & Dragons 5ª Edição",
			icon: Book,
			status: "beta",
			importOptions: [
				{
					id: "dndbeyond",
					title: "D&D Beyond",
					icon: CircleCheck,
					status: "beta",
				},
				{
					id: "roll20",
					title: "Roll20",
					icon: CircleAlert,
					status: "coming_soon",
				},
				{
					id: "pdf",
					title: "PDF",
					icon: CircleAlert,
					status: "coming_soon",
				},
			],
		},
		{
			id: "ordemparanormal",
			title: "Ordem Paranormal",
			description: "RPG de horror e investigação sobrenatural",
			icon: Skull,
			status: "beta",
			importOptions: [
				{
					id: "cris",
					title: "C.R.I.S",
					icon: CircleAlert,
					status: "coming_soon",
				},
				{
					id: "fichasop",
					title: "Fichas OP",
					icon: CircleAlert,
					status: "coming_soon",
				},
				{
					id: "pdf",
					title: "PDF",
					icon: CircleAlert,
					status: "coming_soon",
				},
			],
		},
		{
			id: "callofcthulhu",
			title: "Call of Cthulhu",
			description: "RPG baseado nas obras de H.P. Lovecraft",
			icon: Telescope,
			status: "coming_soon",
			importOptions: [],
		},
		{
			id: "t20",
			title: "Tormenta 20",
			description: "RPG de fantasia medieval baseado no cenário Tormenta",
			icon: Scroll,
			status: "coming_soon",
			importOptions: [],
		},
	];

	// Current step and selected system
	let currentStep = $state(1);
	let selectedSystem: RpgSystem | null = $state(null);

	// Close modal
	function closeModal() {
		// Reset state when closing
		goBackToSystems();
		onClose();
	}

	// Go back to system selection
	function goBackToSystems() {
		currentStep = 1;
		selectedSystem = null;
	}

	// Select RPG system
	function selectSystem(system: RpgSystem) {
		selectedSystem = system;
		currentStep = 2;
	}

	// Handle import option selection
	function selectImportOption(optionId: string) {
		onSelect({
			system: selectedSystem!.id,
			option: optionId,
		});
		closeModal();
	}

	// Click outside to close
	function handleClickOutside(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function goToExpansions() {
		closeModal();
		goto("/?tab=marketplace");
	}
</script>

{#if show}
	<!-- Modal backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" transition:fade={{ duration: 150 }} onclick={handleClickOutside}>
		<!-- Modal container -->
		<div class="modal-container" transition:scale={{ duration: 200, start: 0.95 }}>
			<div class="modal-header">
				{#if currentStep === 1}
					<h2>Escolha um sistema de RPG</h2>
				{:else}
					<div class="header-with-back">
						<button class="back-button" onclick={goBackToSystems}>
							<ArrowLeft size={20} />
						</button>
						<h2>{selectedSystem!.title}</h2>
					</div>
				{/if}
				<button class="close-button" onclick={closeModal}>
					<X size={24} />
				</button>
			</div>

			<div class="modal-content">
				{#if currentStep === 1}
					<!-- Step 1: RPG System Selection -->
					<p class="modal-description">Selecione o sistema de RPG para seu personagem</p>

					<div class="system-options">
						{#each rpgSystems as system}
							{@const Component = system.icon}
							<button
								class="system-option"
								onclick={() => selectSystem(system)}
								disabled={system.status === "coming_soon"}
							>
								<div class="system-option-content">
									<div class="option-icon">
										<Component size={24} />
									</div>
									<div class="system-info">
										<div class="system-title-row">
											<span class="system-title">{system.title}</span>
											{#if system.status === "beta"}
												<span class="badge beta">Beta</span>
											{:else if system.status === "coming_soon"}
												<span class="badge coming-soon">Em breve</span>
											{/if}
										</div>
										<p class="system-description">{system.description}</p>
									</div>
								</div>
							</button>
						{/each}
					</div>

					{#if variables.expansionsEnabled}
						<div class="divider">
							<span>ou</span>
						</div>

						<button class="create-button" onclick={goToExpansions}>
							<Search size={20} />
							<span>Buscar outros sistemas</span>
						</button>
					{/if}
				{:else}
					<!-- Step 2: Import Options for Selected System -->
					{#if selectedSystem!.importOptions.length === 0}
						<p class="modal-description text-center">
							Nenhum importador automático disponível para {selectedSystem!.title}
						</p>
					{:else}
						<p class="modal-description">
							Escolha como criar seu personagem de {selectedSystem!.title}
						</p>

						<div class="import-options">
							{#each selectedSystem!.importOptions as option}
								{@const Component = option.icon}
								<button
									class="import-option"
									onclick={() => selectImportOption(option.id)}
									disabled={option.status === "coming_soon"}
								>
									<div class="option-icon">
										<Component size={24} />
									</div>
									<div class="option-info">
										<div class="option-title">
											<span>{option.title}</span>
											{#if option.status === "beta"}
												<span class="badge beta">Beta</span>
											{:else if option.status === "coming_soon"}
												<span class="badge coming-soon">Em breve</span>
											{/if}
										</div>
										<p class="option-description">
											Importe seu personagem do {option.title}
										</p>
									</div>
								</button>
							{/each}
						</div>

						<div class="divider">
							<span>ou</span>
						</div>
					{/if}

					<button class="create-button" onclick={() => selectImportOption("manual")}>
						<Plus size={20} />
						<span>Criar personagem manualmente</span>
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal-container {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		width: 100%;
		max-width: 550px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 1.5rem 1rem 1.5rem;
		border-bottom: 1px solid var(--background-color-level-2);
	}

	.header-with-back {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.back-button {
		background: none;
		border: none;
		color: var(--text-color-dim);
		cursor: pointer;
		padding: 0.5rem;
		margin: -0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.back-button:hover {
		background-color: var(--background-color-level-2);
		color: var(--text-color);
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
		padding: 0.5rem;
		margin: -0.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background-color: var(--background-color-level-2);
		color: var(--text-color);
	}

	.modal-content {
		padding: 1.5rem;
	}

	.modal-description {
		color: var(--text-color-dim);
		margin-bottom: 1.5rem;
	}

	.text-center {
		text-align: center;
	}

	/* System selection styles */
	.system-options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.system-option {
		display: flex;
		width: 100%;
		background-color: var(--background-color-level-0);
		border: 1px solid var(--background-color-level-2);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text-color);
		padding: 0;
		text-align: left;
	}

	.system-option-content {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 1rem;
	}

	.system-option:hover:not(:disabled) {
		background-color: rgba(0, 143, 231, 0.05);
		border-color: var(--xp-bar);
		transform: translateY(-2px);
	}

	.system-option:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.system-info {
		flex: 1;
	}

	.system-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.system-title {
		font-weight: 500;
	}

	.system-description {
		color: var(--text-color-dim);
		font-size: 0.9rem;
	}

	/* Import options styles */
	.import-options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.import-option {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: var(--background-color-level-0);
		border: 1px solid var(--background-color-level-2);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		color: var(--text-color);
	}

	.import-option:hover:not(:disabled) {
		background-color: rgba(0, 143, 231, 0.05);
		border-color: var(--xp-bar);
		transform: translateY(-2px);
	}

	.import-option:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.option-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		background-color: var(--background-color-level-2);
		border-radius: 8px;
		margin-right: 1rem;
		color: var(--text-color);
	}

	.option-info {
		flex: 1;
	}

	.option-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		margin-bottom: 0.25rem;
	}

	.option-description {
		color: var(--text-color-dim);
		font-size: 0.9rem;
	}

	.badge {
		font-size: 0.7rem;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge.beta {
		background-color: var(--xp-bar);
		color: white;
	}

	.badge.coming-soon {
		background-color: var(--background-color-level-3);
		color: var(--text-color);
	}

	.divider {
		position: relative;
		margin: 2rem 0;
		text-align: center;
	}

	.divider::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background-color: var(--background-color-level-2);
		z-index: 1;
	}

	.divider span {
		position: relative;
		background-color: var(--background-color-level-1);
		padding: 0 1rem;
		color: var(--text-color-dim);
		z-index: 2;
	}

	.create-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
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

	.create-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
		transform: translateY(-2px);
	}

	@media (max-width: 480px) {
		.modal-container {
			height: auto;
			max-height: 90vh;
			overflow-y: auto;
		}

		.option-icon {
			width: 40px;
			height: 40px;
		}
	}
</style>

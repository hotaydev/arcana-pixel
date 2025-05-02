<script lang="ts">
	import { onMount } from "svelte";
	import {
		colorThemes,
		setTheme,
		getCurrentTheme,
		type ThemeType,
		defaultColorTheme,
	} from "$lib/utils/theme";

	// Default theme is blue
	let currentTheme: ThemeType = $state(defaultColorTheme);

	onMount(() => {
		currentTheme = getCurrentTheme().theme;
	});

	function handleThemeChange(theme: ThemeType) {
		currentTheme = theme;
		setTheme({ theme: theme });
	}
</script>

<div class="settings-container">
	<div class="settings-header">
		<h1>Configurações de Aparência</h1>
		<p>Personalize a aparência do aplicativo escolhendo entre os temas disponíveis.</p>
	</div>

	<div class="settings-content">
		<div class="theme-settings">
			<div class="theme-options">
				<div class="setting-group">
					<h3>Selecione um tema</h3>
					<div class="theme-selector">
						{#each colorThemes as theme}
							<div class="theme-option">
								<input
									type="radio"
									id="theme-{theme}"
									name="theme"
									value={theme}
									checked={currentTheme === theme}
									onchange={() => handleThemeChange(theme)}
								/>
								<label for="theme-{theme}" class:active={currentTheme === theme}>
									<span class="theme-color" style="background-color: var(--{theme}-primary);"
									></span>
									<span class="theme-name">{theme}</span>
								</label>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="theme-preview">
				<h3>Visualização</h3>
				<div class="preview-container">
					<div class="color-sample primary">
						<span>Cor principal</span>
					</div>
					<div class="color-samples">
						<div class="color-sample primary-light">
							<span>Variação clara</span>
						</div>
						<div class="color-sample primary-dark">
							<span>Variação escura</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.settings-container {
		max-width: 1200px;
		width: 100%;
		margin: 2rem auto;
		padding: 0 2rem;
	}

	.settings-header {
		margin-bottom: 2rem;
	}

	.settings-header h1 {
		color: var(--title-color);
		margin-bottom: 0.5rem;
		font-size: 1.75rem;
		font-weight: 600;
	}

	.settings-header p {
		color: var(--text-color-dim);
		max-width: 700px;
		line-height: 1.5;
	}

	.settings-content {
		background-color: var(--background-color-level-0);
		border-radius: var(--border-radius);
	}

	.theme-settings {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		border-radius: var(--border-radius);
		padding: 0;
		max-width: 100%;
	}

	@media (max-width: 768px) {
		.theme-settings {
			grid-template-columns: 1fr;
		}

		.settings-container {
			padding: 0 1rem;
		}
	}

	h3 {
		color: var(--title-color);
		margin-bottom: 1rem;
		font-size: 1rem;
		font-weight: 600;
	}

	.setting-group {
		background-color: var(--background-color-level-2);
		padding: 1.5rem;
		border-radius: var(--border-radius);
	}

	.theme-selector {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.theme-option {
		display: flex;
		align-items: center;
	}

	.theme-option input[type="radio"] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.theme-option label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		border-radius: var(--border-radius);
		width: 100%;
		cursor: pointer;
		transition: all 0.2s ease;
		background-color: var(--background-color-level-1);
		border: 1px solid var(--divider-color);
	}

	.theme-option label:hover {
		background-color: var(--background-color-level-3);
	}

	.theme-option label.active {
		border-color: var(--primary-color);
		background-color: color-mix(in srgb, var(--primary-color) 10%, var(--background-color-level-2));
	}

	.theme-color {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1px solid var(--divider-color);
	}

	.theme-name {
		color: var(--text-color);
		text-transform: capitalize;
		font-weight: 500;
	}

	/* Preview section */
	.theme-preview {
		padding: 1.5rem;
		background-color: var(--background-color-level-2);
		border-radius: var(--border-radius);
	}

	.preview-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.color-samples {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.color-sample {
		height: 70px;
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--primary-color-contrast);
		font-weight: 500;
		text-align: center;
	}

	.primary {
		background-color: var(--primary-color);
	}

	.primary-light {
		background-color: var(--primary-color-light);
	}

	.primary-dark {
		background-color: var(--primary-color-dark);
	}
</style>

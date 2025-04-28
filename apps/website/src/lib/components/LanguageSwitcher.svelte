<script lang="ts">
	import { getLocale, setLocale } from '$lib/paraglide/runtime';
	import { AVAILABLE_LANGUAGES, type Locale } from '$lib/variables';

	const { isHeader = false }: { isHeader?: boolean } = $props();
	let isOpen = $state(false);
	const currentLocale = getLocale();

	// Toggle dropdown
	function toggleDropdown() {
		isOpen = !isOpen;
	}

	// Handle language change
	function changeLanguage(locale: Locale) {
		if (locale !== currentLocale) {
			setLocale(locale);
		}
		isOpen = false;
	}

	let currentFlag = $derived(
		AVAILABLE_LANGUAGES.find((lang) => lang.code === currentLocale)?.flag ||
			AVAILABLE_LANGUAGES[0].flag
	);
</script>

<div class="language-switcher" class:header={isHeader}>
	<button class="language-toggle" onclick={toggleDropdown} aria-label="Select language">
		<img src={currentFlag} alt={currentLocale} class="flag-icon" />
	</button>

	<div class="language-menu" class:open={isOpen}>
		{#each AVAILABLE_LANGUAGES as language (language.code)}
			<button
				class="language-option"
				class:active={currentLocale === language.code}
				onclick={() => changeLanguage(language.code as Locale)}
			>
				<img src={language.flag} alt={language.name} class="flag-icon menu-flag" />
				<span class="language-name">{language.name}</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.language-switcher {
		position: relative;
	}

	.language-toggle {
		display: flex;
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		transition: all 0.3s ease;
		justify-content: center;
		width: 100%;
	}

	.flag-icon {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.menu-flag {
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}

	.language-menu {
		position: absolute;
		display: none;
		flex-direction: column;
		background-color: var(--dark-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		overflow: hidden;
		min-width: 140px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		z-index: 1001;
	}

	/* For header positioning */
	.header .language-menu {
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
	}

	/* For footer positioning */
	.language-switcher:not(.header) .language-menu {
		bottom: 100%;
		left: 0;
		margin-bottom: 0.5rem;
	}

	.language-menu.open {
		display: flex;
	}

	.language-option {
		display: flex;
		align-items: center;
		background: none;
		border: none;
		color: var(--gray);
		padding: 0.8rem 1rem;
		text-align: left;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
	}

	.language-option:hover,
	.language-option.active {
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--primary-light);
	}

	/* Mobile styles */
	@media (max-width: 1000px) {
		.header .language-menu {
			position: static;
			margin-top: 0.5rem;
			width: 100%;
			background-color: rgba(255, 255, 255, 0.05);
			border: 1px solid rgba(255, 255, 255, 0.15);
			border-radius: 0.5rem;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		}

		.header .language-option {
			padding: 0.8rem 1rem;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}

		.header .language-option:last-child {
			border-bottom: none;
		}
	}
</style>

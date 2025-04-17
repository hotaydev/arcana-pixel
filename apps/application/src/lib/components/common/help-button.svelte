<script lang="ts">
	import { CircleHelp, Book, Github, MessageCircle, X } from "@lucide/svelte";
	import { scale } from "svelte/transition";
	import { onMount } from "svelte";
	import variables from "$lib/variables";

	let showMenu: boolean = false;
	let menuRef: HTMLDivElement;

	// Toggle menu visibility
	function toggleMenu(): void {
		showMenu = !showMenu;
	}

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent): void {
		if (
			showMenu &&
			menuRef &&
			!menuRef.contains(event.target as Node) &&
			!event.composedPath().some((el) => (el as HTMLElement).classList?.contains("help-button"))
		) {
			showMenu = false;
		}
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});
</script>

<!-- Help button with improved click area -->
<button
	type="button"
	class="help-button"
	aria-label="Help"
	on:click={toggleMenu}
	aria-expanded={showMenu}
	aria-controls="help-menu"
>
	<div class="icon-wrapper">
		{#if showMenu}
			<X size={22} color="white" />
		{:else}
			<CircleHelp size={24} color="white" />
		{/if}
	</div>
</button>

<!-- Help popup menu -->
{#if showMenu}
	<div
		bind:this={menuRef}
		id="help-menu"
		class="help-menu"
		transition:scale={{ duration: 200, start: 0.8 }}
		role="menu"
	>
		<div class="help-menu-header">
			<h3>Help & Resources</h3>
		</div>

		<div class="help-menu-items">
			<a href={variables.documentation} class="help-menu-item" role="menuitem">
				<Book size={18} />
				<span>Documentation</span>
			</a>

			<a
				href={variables.github}
				class="help-menu-item"
				role="menuitem"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Github size={18} />
				<span>GitHub Repository</span>
			</a>

			<a
				href={variables.discord}
				class="help-menu-item"
				role="menuitem"
				target="_blank"
				rel="noopener noreferrer"
			>
				<MessageCircle size={18} />
				<span>Discord Community</span>
			</a>
		</div>
	</div>
{/if}

<style>
	/* Help Button */
	.help-button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background-color: var(--primary-color);
		border: none;
		padding: 0;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		transition: all 0.2s ease;
		z-index: 90;
	}

	.icon-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none; /* Ensures clicks pass through to the button */
	}

	.help-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
	}

	/* Help Popup Menu */
	.help-menu {
		position: fixed;
		bottom: 6rem;
		right: 2rem;
		width: 250px;
		background: var(--background-color-level-1);
		border-radius: calc(var(--border-radius) - 4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		z-index: 89;
	}

	.help-menu-header {
		background-color: var(--primary-color);
		color: var(--primary-color-contrast);
		padding: 12px 16px;
	}

	.help-menu-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
	}

	.help-menu-items {
		padding: 8px 0;
	}

	.help-menu-item {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		color: var(--text-color);
		text-decoration: none;
		transition: background-color 0.2s;
		cursor: pointer;
	}

	.help-menu-item:hover {
		background-color: var(--background-color-level-2);
	}

	.help-menu-item span {
		font-size: 0.95rem;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.help-button {
			bottom: 1.5rem;
			right: 1.5rem;
			width: 3rem;
			height: 3rem;
		}

		.help-menu {
			bottom: 5rem;
			right: 1.5rem;
			width: 220px;
		}
	}
</style>

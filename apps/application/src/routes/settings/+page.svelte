<script lang="ts">
	import HelpButton from "$lib/components/common/help-button.svelte";
	import Navbar from "$lib/components/common/navbar.svelte";
	import { Palette } from "@lucide/svelte";
	import InterfaceSettings from "$lib/components/settings/interface.svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";

	// UI state
	let defaultSection = "interface";
	let activeSection = $derived(page.url.searchParams.get("tab"));

	// Update URL when tab changes
	function setActiveSection(tabId: string) {
		activeSection = tabId;
		const url = new URL(window.location.href);
		url.searchParams.set("tab", tabId);
		goto(url.toString(), { replaceState: true });
	}

	const tabs = [
		{
			id: "interface",
			title: "Interface",
			icon: Palette,
		},
	];
</script>

<main>
	<!-- Top navigation bar -->
	<Navbar></Navbar>

	<!-- Section Navigation -->
	<div class="section-navigation">
		<div class="section-nav-container">
			{#each tabs as tab}
				<button
					class={(activeSection || defaultSection) === tab.id ? "active" : ""}
					onclick={() => setActiveSection(tab.id)}
				>
					<tab.icon size={18} />
					<span>{tab.title}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Main content area -->
	{#if (activeSection || defaultSection) === "interface"}
		<InterfaceSettings />
	{/if}

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
		background-color: var(--background-color-level-0);
	}

	/* Section Navigation */
	.section-navigation {
		background-color: var(--background-color-level-0);
		border-bottom: 1px solid var(--divider-color);
		padding: 0 2rem;
	}

	.section-nav-container {
		max-width: 1600px;
		margin: 0 auto;
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		scrollbar-width: none; /* Firefox */
	}

	.section-nav-container::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}

	.section-nav-container button {
		padding: 1rem 1.5rem;
		background: none;
		border: none;
		border-bottom: 3px solid transparent;
		color: var(--text-color-dim);
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.section-nav-container button:hover {
		color: var(--text-color);
		background-color: var(--background-color-level-1);
	}

	.section-nav-container button.active {
		color: var(--primary-color);
		border-bottom-color: var(--primary-color);
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.section-navigation {
			padding: 0 1rem;
		}

		.section-nav-container button {
			padding: 0.75rem 1rem;
		}
	}

	@media (max-width: 480px) {
		.section-nav-container button span {
			display: none;
		}

		.section-nav-container button {
			padding: 0.75rem;
		}
	}
</style>

<script lang="ts">
	import { fade } from "svelte/transition";
	import { ChevronDown, ChevronUp, Search } from "@lucide/svelte";

	export let options: string[] = [];
	export let value: string = "";
	export let placeholder: string = "Selecione uma opção";
	export let id: string = "";
	export let searchable: boolean = true;

	let isOpen = false;
	let searchTerm = "";
	let selectedIndex = -1;
	let dropdownRef: HTMLDivElement;
	let inputRef: HTMLInputElement;

	$: filteredOptions = searchTerm
		? options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
		: options;

	$: selectedLabel = value || placeholder;

	function toggleDropdown() {
		isOpen = !isOpen;
		if (isOpen) {
			searchTerm = "";
			setTimeout(() => {
				if (searchable && inputRef) {
					inputRef.focus();
				}
			}, 10);
		}
	}

	function selectOption(option: string) {
		value = option;
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node) && isOpen) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		switch (event.key) {
			case "Escape":
				isOpen = false;
				break;
			case "ArrowDown":
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredOptions.length - 1);
				break;
			case "ArrowUp":
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, -1);
				break;
			case "Enter":
				if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
					selectOption(filteredOptions[selectedIndex]);
				}
				break;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} on:keydown={handleKeydown} />

<div class="custom-select" bind:this={dropdownRef}>
	<button
		type="button"
		class="select-button"
		on:click={toggleDropdown}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
		{id}
	>
		<span class={value ? "selected-value" : "placeholder"}>{selectedLabel}</span>
		<span class="icon">
			{#if isOpen}
				<ChevronUp size={20} />
			{:else}
				<ChevronDown size={20} />
			{/if}
		</span>
	</button>

	{#if isOpen}
		<div class="dropdown" transition:fade={{ duration: 150 }}>
			{#if searchable}
				<div class="search-container">
					<Search size={16} />
					<input
						type="text"
						bind:value={searchTerm}
						bind:this={inputRef}
						placeholder="Buscar..."
						class="search-input"
					/>
				</div>
			{/if}
			<ul class="options-list" role="listbox">
				{#if filteredOptions.length === 0}
					<li class="no-results">Nenhum resultado encontrado</li>
				{:else}
					{#each filteredOptions as option, i}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<li
							class="option"
							class:selected={option === value}
							class:highlighted={i === selectedIndex}
							role="option"
							aria-selected={option === value}
							on:click={() => selectOption(option)}
						>
							{option}
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	{/if}
</div>

<style>
	.custom-select {
		position: relative;
		width: 100%;
	}

	.select-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-1);
		color: var(--text-color);
		font-size: 1rem;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease-in-out;
	}

	.select-button:focus {
		outline: none;
		border-color: var(--xp-bar);
		box-shadow: 0 0 0 2px rgba(0, 143, 231, 0.2);
	}

	.placeholder {
		color: var(--text-color-dim);
	}

	.selected-value {
		color: var(--text-color);
	}

	.icon {
		color: var(--text-color-dim);
		padding-top: 4px;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 5px);
		left: 0;
		width: 100%;
		max-height: 250px;
		background-color: var(--background-color-level-1);
		border: 1px solid var(--background-color-level-3);
		border-radius: 8px;
		z-index: 100;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.search-container {
		display: flex;
		align-items: center;
		padding: 0.75rem;
		border-bottom: 1px solid var(--background-color-level-3);
		gap: 0.5rem;
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--text-color);
		font-size: 0.9rem;
		padding: 0;
	}

	.search-input:focus {
		outline: none;
	}

	.options-list {
		max-height: 200px;
		overflow-y: auto;
		padding: 0.5rem 0;
		margin: 0;
		list-style: none;
	}

	/* Custom scrollbar styles */
	.options-list::-webkit-scrollbar {
		width: 8px;
	}

	.options-list::-webkit-scrollbar-track {
		background: var(--background-color-level-1);
		border-radius: 4px;
	}

	.options-list::-webkit-scrollbar-thumb {
		background: var(--background-color-level-3);
		border-radius: 4px;
	}

	.options-list::-webkit-scrollbar-thumb:hover {
		background: var(--background-color-level-4, #555);
	}

	.option {
		padding: 0.65rem 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.option:hover {
		background-color: var(--background-color-level-2);
	}

	.selected {
		background-color: rgba(0, 143, 231, 0.1);
		color: var(--xp-bar);
		font-weight: 500;
	}

	.highlighted {
		background-color: var(--background-color-level-2);
	}

	.no-results {
		padding: 0.75rem 1rem;
		color: var(--text-color-dim);
		text-align: center;
		font-style: italic;
	}
</style>

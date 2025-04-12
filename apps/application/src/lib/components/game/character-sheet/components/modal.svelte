<script>
	import loadCharacter, { isValidBeyondURL } from "$lib/services/character/character-parser";
	import toast from "svelte-5-french-toast";

	let { showModal = $bindable() } = $props();

	let dialog = $state();
	let url = $state("");

	$effect(() => {
		if (showModal) dialog.showModal();
	});

	const saveCharacter = async () => {
		if (url) {
			if (!isValidBeyondURL(url)) {
				toast.error("Utilize a URL do seu personagem no D&D Beyond!");
				return;
			}

			localStorage.setItem("characterURL", url);
			await loadCharacter();
			dialog.close();
		} else {
			toast.error("Preencha a URL para importar seu personagem!");
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div>
		<h2>Importar Personagem</h2>
		<p>Cole a URL do seu personagem a baixo</p>

		<input
			type="text"
			bind:value={url}
			placeholder="Ex. https://www.dndbeyond.com/characters/xxxxxxxxx"
		/>

		<button onclick={() => saveCharacter()}>Salvar</button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32rem;
		width: 100%;
		border-radius: var(--border-radius);
		border: none;
		padding: 0;
		background-color: var(--background-color-level-2);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog > div {
		padding: 1rem 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1rem;
		color: var(--title-color);
	}

	dialog > div p {
		color: var(--text-color);
		font-weight: 300;
		font-size: 0.9rem;
	}

	dialog input {
		cursor: text;
		background-color: var(--background-color-level-3);
		color: var(--title-color);
		border-radius: calc(var(--border-radius) - 4px);
		padding: 0.5rem 1rem;
		margin: 1rem auto;
		border: none;
		font-size: 1rem;
		outline: none;
		width: 100%;
	}

	dialog input:focus {
		box-shadow: 0 0 0 2px var(--text-color-dim);
	}

	dialog button {
		cursor: pointer;
		background-color: var(--background-color-level-3);
		color: var(--title-color);
		border-radius: calc(var(--border-radius) - 6px);
		padding: 0.5rem 2rem;
		border: none;
		font-size: 1rem;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		transform: translate(-50%, -50%) scale(1);
	}

	@keyframes zoom {
		from {
			transform: translate(-50%, -50%) scale(0.95);
		}
		to {
			transform: translate(-50%, -50%) scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>

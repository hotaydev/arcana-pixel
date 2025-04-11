<script>
	import { Plus } from "@lucide/svelte";
	import Modal from "./modal.svelte";
	let showModal = $state(false);
</script>

<div class="choose-character">
	<button onclick={() => (showModal = true)}>
		<Plus />
		Importar
	</button>

	<p>Traga seu personagem do D&D Beyond</p>

	<Modal bind:showModal />
</div>

<style>
	.choose-character {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.choose-character p {
		margin-top: 0.8rem;
		font-size: 0.8rem;
		color: var(--text-color);
		text-align: center;
	}

	.choose-character button {
		font-size: 1rem;
		text-align: center;
		padding: 1rem 3rem;
		border-radius: 10px;
		border: none;
		cursor: pointer;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;

		background-color: var(--background-color-level-2);
		color: var(--title-color);
		transition: all ease 0.3s;
	}

	.choose-character button:hover {
		background-color: var(--background-color-level-3);
	}
</style>

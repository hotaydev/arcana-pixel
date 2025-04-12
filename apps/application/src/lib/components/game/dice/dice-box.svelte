<script lang="ts">
	import { setDiceBox } from "$lib/stores/dice.store";
	import DiceBox from "@3d-dice/dice-box";
	import { onMount } from "svelte";

	onMount(async () => {
		const Box = new DiceBox(".dice-area", {
			assetPath: "/assets/dice-box/",
			gravity: 1,
			container: document.querySelector(".dice-area"),
			mass: 1,
			friction: 0.8,
			restitution: 0.3,
			angularDamping: 0.1,
			linearDamping: 0.4,
			spinForce: 7,
			throwForce: 6,
			startingHeight: 12,
			settleTimeout: 5000,
			lightIntensity: 2,
			theme: "default",
			themeColor: "#5e129d",
			scale: 4,
		});

		await Box.init();

		setDiceBox(Box);
	});
</script>

<div class="dice-area"></div>

<style>
	.dice-area {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		overflow: hidden;
		z-index: 10000;
	}
</style>

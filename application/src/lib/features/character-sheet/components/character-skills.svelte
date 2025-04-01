<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<script lang="ts">
	// import { diceBox } from "$lib/features/dice/stores/dice.store";
	// import { character } from "$lib/features/character-sheet/stores/character.store";
	// import { getStatModifier } from "$lib/features/character-sheet/services/character-parser";
	// import { get } from "svelte/store";

	// let currentRollingDiceTimeout: number;

	// const rollSkillDice = (modifier: number) => {
	// 	if (currentRollingDiceTimeout) clearTimeout(currentRollingDiceTimeout);
	// 	const diceRoll = `1d20${modifier > 0 ? `+${modifier}` : modifier < 0 ? `-${modifier}` : ""}`;
	// 	(get(diceBox) as any).roll(diceRoll).then((results: any) => {
	// 		currentRollingDiceTimeout = setTimeout(() => {
	// 			(get(diceBox) as any).remove({ groupId: 0, rollId: 0 });
	// 		}, 2 * 1000); // 2 Seconds
	// 	});
	// };

	// let str = $character?.stats.str;
	// let dex = $character?.stats.dex;
	// let con = $character?.stats.con;
	// let wis = $character?.stats.wis;
	// let int = $character?.stats.int;
	// let cha = $character?.stats.cha;
</script>

<div class="skills">
	<div class="skill">
		<strong>DES</strong>
		<p>Acrobacia</p>
		<div class="skill-modifier">+2</div>
	</div>
</div>

<style>
</style>

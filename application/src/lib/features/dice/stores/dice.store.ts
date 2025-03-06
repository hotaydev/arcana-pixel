import { writable } from "svelte/store";

export const diceBox = writable();

export const setDiceBox = (newDiceBox: L.Map) => {
	diceBox.update(() => newDiceBox);
};

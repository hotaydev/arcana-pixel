import { writable, type Writable } from "svelte/store";
import type { IPlayerDnD } from "@shared/schemas/player_dnd";

export const character: Writable<IPlayerDnD> = writable();

export const setCharacter = (value: IPlayerDnD) => {
	character.update(() => value);
};

import { writable, type Writable } from "svelte/store";
import type { ICharacter } from "../models/character.model";

export const character: Writable<ICharacter> = writable();

export const setCharacter = (value: ICharacter) => {
	character.update(() => value);
};

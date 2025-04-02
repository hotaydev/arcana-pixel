import { toast } from "svelte-5-french-toast";
import { setCharacter } from "../stores/character.store";
import type { IPlayerDnD } from "@arcana-pixel/schemas/player_dnd";

export default async function loadCharacter() {
	const url = localStorage.getItem("characterURL");
	if (url) {
		const characterData: IPlayerDnD | null = await getCharacterFromDnDBeyond(url);
		if (characterData) setCharacter(characterData);
	}
}

async function getCharacterFromDnDBeyond(url: string): Promise<IPlayerDnD | null> {
	const SERVER_URL = "http://localhost:3000/v1";
	const characterId = url.replace("https://www.dndbeyond.com/characters/", "");

	return await fetch(`${SERVER_URL}/characters/import/dnd?id=${characterId}&source=dnd_beyond`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => {
			toast.error("Não conseguimos carregar seu personagem! Ele está público?");
			return null;
		});
}

export function getStatModifier(statLevel: number) {
	// TODO: add other player's bonuses
	return Math.floor((statLevel - 10) / 2);
}
export function isValidBeyondURL(url: string) {
	return /https:\/\/www\.dndbeyond\.com\/characters\/\d+$/.test(url);
}

import { toast } from "svelte-5-french-toast";
import { setCharacter } from "../stores/character.store";
import type { ICharacter, Stats } from "../models/character.model";
import type { IDndBeyondCharacter } from "../models/dnd-beyond-character.model";

export default async function loadCharacter() {
	const url = localStorage.getItem("characterURL");
	if (url) {
		const characterData: ICharacter | null = await getCharacterFromDnDBeyond(url);
		if (characterData) setCharacter(characterData);
	}
}

async function getCharacterFromDnDBeyond(url: string): Promise<ICharacter | null> {
	const apiURL = url.replace(
		"https://www.dndbeyond.com/characters/",
		"https://character-service.dndbeyond.com/character/v5/character/"
	);

	return await fetch(`https://corsproxy.io/?url=${apiURL}`)
		.then((res) => res.json())
		.then((data) => {
			return extractCharacterUrl(data.data);
		})
		.catch((err) => {
			toast.error("Não conseguimos carregar seu personagem! Ele está público?");
			return null;
		});
}

function extractCharacterUrl(dndBeyondResponse: IDndBeyondCharacter): ICharacter {
	const playerLevel = dndBeyondResponse.classes
		.map((c) => c?.level || 0)
		.reduce((a, b) => a + b, 0); // Showing total level, not level splitted by class
	const arrayOfClasses = dndBeyondResponse.classes
		.map((c) => c?.definition?.name || null)
		.filter((c) => c) as string[];
	const proficiencyBonus = getProficiencyBonus(playerLevel);

	const baseStats: Stats = {
		str: dndBeyondResponse.stats[0].value,
		dex: dndBeyondResponse.stats[1].value,
		con: dndBeyondResponse.stats[2].value,
		int: dndBeyondResponse.stats[3].value,
		wis: dndBeyondResponse.stats[4].value,
		cha: dndBeyondResponse.stats[5].value,
	};

	return {
		id: dndBeyondResponse.id,
		name: dndBeyondResponse.name,
		race: dndBeyondResponse.race.fullName || dndBeyondResponse.race.baseName,
		avatar: dndBeyondResponse.decorations.avatarUrl,
		classes: arrayOfClasses,
		level: playerLevel,
		defense: 12, // TODO: get ddefense
		xp: {
			current: dndBeyondResponse.currentXp,
			max: getNextLevelExperience(dndBeyondResponse.currentXp),
		},
		hp: {
			current: dndBeyondResponse.baseHitPoints + (dndBeyondResponse.temporaryHitPoints || 0), // Need to check other Hit Point Bonuses
			max: dndBeyondResponse.baseHitPoints - (dndBeyondResponse.removedHitPoints || 0),
		},
		ac: 0,
		initiative: baseStats.dex,
		speed: feetsToMeters(dndBeyondResponse.race?.weightSpeeds?.normal?.walk || 30),
		proficiency_bonus: proficiencyBonus,
		stats: baseStats,

		// TODO: some of these need the proficiency_bonus bonus to be added
		saving_throws: baseStats,
		skills: getSkillsFromStats(baseStats, proficiencyBonus),
	};
}

function getProficiencyBonus(playerLevel: number) {
	if (playerLevel < 5) return 2;
	if (playerLevel < 9) return 3;
	if (playerLevel < 13) return 4;
	if (playerLevel < 17) return 5;
	return 6;
}

export function getStatModifier(statLevel: number) {
	// TODO: add other player's bonuses
	return Math.floor((statLevel - 10) / 2);
}

function getNextLevelExperience(currentXP: number) {
	const xpTable = [
		0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000,
		165000, 195000, 225000, 265000, 305000, 355000,
	];
	return xpTable.find((xp) => xp > currentXP) || 0;
}

function feetsToMeters(feets: number) {
	return Math.round(feets * 0.3048);
}

function getSkillsFromStats(stats: Stats, proficiencyBonus: number) {
	// Some of them need to have the proficiencyBonus added
	return {
		acrobatics: stats.dex,
		animal_handling: stats.wis,
		arcana: stats.int,
		athletics: stats.str,
		deception: stats.cha,
		history: stats.int,
		insight: stats.wis,
		intimidation: stats.cha,
		investigation: stats.int,
		medicine: stats.wis,
		nature: stats.int,
		perception: stats.wis,
		performance: stats.cha,
		persuasion: stats.cha,
		religion: stats.int,
		sleight_of_hand: stats.dex,
		stealth: stats.dex,
		survival: stats.wis,
	};
}

export function isValidBeyondURL(url: string) {
	return /https:\/\/www\.dndbeyond\.com\/characters\/\d+$/.test(url);
}

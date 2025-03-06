export interface ICharacter {
	id: number;
	name: string;
	race: string;
	avatar: string;
	defense: number;
	classes: string[];
	level: number;
	xp: ProgressionBar;
	hp: ProgressionBar;
	ac: number;
	initiative: number;
	speed: number;
	proficiency_bonus: number;
	stats: Stats;
	saving_throws: Stats;
	skills: Skills;
}

export interface Skills {
	acrobatics: number;
	animal_handling: number;
	arcana: number;
	athletics: number;
	deception: number;
	history: number;
	insight: number;
	intimidation: number;
	investigation: number;
	medicine: number;
	nature: number;
	perception: number;
	performance: number;
	persuasion: number;
	religion: number;
	sleight_of_hand: number;
	stealth: number;
	survival: number;
}

export interface Stats {
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
}

export interface ProgressionBar {
	current: number;
	max: number;
}

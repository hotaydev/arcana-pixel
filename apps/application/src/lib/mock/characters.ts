export interface ICharacter {
	id: string;
	name: string;
	class: string;
	level: number;
	description: string;
	lastPlayed: string;
	system: string;
}

export const mockedCharacters: ICharacter[] = [
	{
		id: "393f9e70-1927-11f0-b02f-3e7bf1c93a1f",
		name: "Thranduil Silverleaf",
		class: "Mago",
		level: 7,
		description:
			"Um elfo mago especializado em magias elementais de gelo. Originário das Florestas do Norte, busca conhecimento arcano perdido.",
		lastPlayed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
		system: "D&D 5e",
	},
	{
		id: "413d15b2-1927-11f0-9480-3e7bf1c93a1f",
		name: "Grommash Runaforte",
		class: "Guerreiro",
		level: 5,
		description:
			"Anão guerreiro robusto, especialista em armas pesadas e resistência em combate. Carrega o legado de uma antiga linhagem de ferreiros.",
		lastPlayed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
		system: "Pathfinder",
	},
	{
		id: "445fbf7e-1927-11f0-a744-3e7bf1c93a1f",
		name: "Luna Shadowstep",
		class: "Ladina",
		level: 6,
		description:
			"Humana especializada em furtividade e infiltração. Membro de uma guilda de ladrões que opera nas sombras da capital.",
		lastPlayed: new Date().toISOString(),
		system: "D&D 5e",
	},
	{
		id: "48761e6e-1927-11f0-b788-3e7bf1c93a1f",
		name: "Arthus Lightbringer",
		class: "Paladino",
		level: 8,
		description:
			"Paladino humano devotado ao deus da luz. Conhecido por sua misericórdia em batalha e pelos feitos heroicos nas Cruzadas do Sul.",
		lastPlayed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
		system: "Tormenta 20",
	},
];

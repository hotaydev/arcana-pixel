export interface IGame {
	id: string;
	title: string;
	universe: string;
	description: string;
	lastPlayed: string;
	players: number;
	image?: string;
}

export const mockedGames: IGame[] = [
	{
		id: "5406a634-170d-11f0-b19e-3e7bf1c93a1f",
		title: "Sombras de Santa Cecília",
		universe: "Ordem Paranormal",
		description:
			"Uma cidade do interior, uma série de acontecimentos inexplicáveis e um chamado para investigar o que não deveria existir.",
		lastPlayed: "2025-04-08T14:30:00",
		players: 5,
		image: undefined,
	},
	{
		id: "5b1f22fc-170d-11f0-80fc-3e7bf1c93a1f",
		title: "A Coroa do Dragão Esquecido",
		universe: "Dungeons and Dragons",
		description:
			"Rumores sobre um antigo poder reacendem conflitos e ambições em um mundo à beira da ruína.",
		lastPlayed: "2025-04-05T19:45:00",
		players: 4,
		image: undefined,
	},
	{
		id: "5b72f8e6-170d-11f0-a3e7-3e7bf1c93a1f",
		title: "O Julgamento de Valkaria",
		universe: "Tormenta RPG",
		description:
			"Em tempos conturbados, heróis improváveis recebem uma missão que vai além do que se pode compreender.",
		lastPlayed: "2025-03-28T20:00:00",
		players: 6,
		image: undefined,
	},
];

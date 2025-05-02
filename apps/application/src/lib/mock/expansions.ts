import { BookMarked, Users, VenetianMask, WandSparkles, Workflow, Map } from "@lucide/svelte";

// Mock data for expansions
export const mockedFeaturedExpansions = [
	{
		id: "11bc2b34-17dd-11f0-8fe8-3e7bf1c93a1f",
		title: "Grimório Arcano Expandido",
		author: "Arcana Pixel",
		type: "rules",
		universe: "Dungeons and Dragons",
		description: "100+ novas magias para todas as classes de conjuradores.",
		downloads: 12450,
		rating: 4.8,
		official: true,
		image: "/images/grimoire.jpg",
	},
	{
		id: "167d617e-17dd-11f0-80d0-3e7bf1c93a1f",
		title: "Mapa Detalhado - Cidadela de Ravenloft",
		author: "MapMaster",
		type: "maps",
		universe: "Dungeons and Dragons",
		description: "Mapas de alta resolução da cidadela com todas as salas e passagens secretas.",
		downloads: 8763,
		rating: 4.7,
		official: false,
		image: "/images/ravenloft.jpg",
	},
	{
		id: "15ddfe86-17dd-11f0-9118-3e7bf1c93a1f",
		title: "Bestiário da Ordem",
		author: "Arcana Pixel",
		type: "creatures",
		universe: "Ordem Paranormal",
		description: "Compilação oficial de criaturas para o RPG Ordem Paranormal.",
		downloads: 9845,
		rating: 4.9,
		official: true,
		image: "/images/bestiary.jpg",
	},
];

export const mockedPopularExpansions = [
	{
		id: "16cb7710-17dd-11f0-a124-3e7bf1c93a1f",
		title: "NPCs Memoráveis",
		author: "RPGMestres",
		type: "npcs",
		universe: "Universal",
		description: "100 NPCs completos com background, personalidade e estatísticas.",
		downloads: 7650,
		rating: 4.5,
		official: false,
		image: null,
	},
	{
		id: "1849a7ba-17dd-11f0-b2b8-3e7bf1c93a1f",
		title: "Sistema de Combate Tático Avançado",
		author: "CombatPro",
		type: "rules",
		universe: "Universal",
		description: "Regras alternativas para combates mais estratégicos e dinâmicos.",
		downloads: 6230,
		rating: 4.3,
		official: false,
		image: null,
	},
	{
		id: "19333b46-17dd-11f0-a74c-3e7bf1c93a1f",
		title: "Kit de Iniciação - Cthulhu",
		author: "Arcana Pixel",
		type: "systems",
		universe: "Call of Cthulhu",
		description: "Tudo que você precisa para iniciar uma campanha de horror cósmico.",
		downloads: 9120,
		rating: 4.6,
		official: true,
		image: null,
	},
	{
		id: "37362ae0-17dd-11f0-ab06-3e7bf1c93a1f",
		title: "Mapa - Cidade de Neverwinter",
		author: "CartaGrafica",
		type: "maps",
		universe: "Dungeons and Dragons",
		description: "Mapa detalhado da cidade com pontos de interesse e guia.",
		downloads: 5470,
		rating: 4.4,
		official: false,
		image: null,
	},
	{
		id: "381f70d8-17dd-11f0-a2ce-3e7bf1c93a1f",
		title: "Automações de Combate para VTT",
		author: "VTTScripter",
		type: "automation",
		universe: "Dungeons and Dragons",
		description: "Scripts para automatizar ações de combate em plataformas virtuais.",
		downloads: 4980,
		rating: 4.2,
		official: false,
		image: null,
	},
];

// Category types
export const mockedExpansionsCategories = [
	{ id: "rules", name: "Regras", icon: BookMarked, count: 342 },
	{ id: "maps", name: "Mapas", icon: Map, count: 586 },
	{ id: "npcs", name: "NPCs", icon: Users, count: 412 },
	{ id: "creatures", name: "Criaturas", icon: VenetianMask, count: 613 },
	{ id: "systems", name: "Sistemas", icon: WandSparkles, count: 98 },
	{ id: "automation", name: "Automações", icon: Workflow, count: 67 },
];

// Universes (RPG systems)
export const mockedExpansionsUniverses = [
	{ id: "dnd", name: "Dungeons & Dragons", count: 865 },
	{ id: "ordem", name: "Ordem Paranormal", count: 348 },
	{ id: "tormenta", name: "Tormenta RPG", count: 425 },
	{ id: "cthulhu", name: "Call of Cthulhu", count: 267 },
	{ id: "universal", name: "Universal", count: 452 },
];

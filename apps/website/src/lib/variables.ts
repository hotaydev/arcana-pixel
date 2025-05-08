import { BookIcon, PersonIcon, UsersIcon, StarIcon } from './components/icons';
import { m } from '$lib/paraglide/messages.js';
import type { locales } from './paraglide/runtime';

export const BASE_URL = 'https://www.arcanapixel.com';
export const DOCUMENTATION_LINK = 'https://docs.arcanapixel.com';
export const GITHUB_LINK = 'https://github.com/hotaydev/arcana-pixel';
export const LINKEDIN_LINK = 'https://www.linkedin.com/company/hotay';
export const DISCORD_LINK = 'https://dircord.gg/cvWUW2yMPM';
export const SIGNUP_API_URL = 'https://n8n.hotay.dev/webhook/arcanapixel-subscribe';
export const POSTHOG_API_URL = 'https://insights.hotay.dev';
export const POSTHOG_CLIENT_KEY = 'phc_JBYFh2Ew3kdz3hfD8IIxV62Ml7ipQnAINBYflUv2608';
export const SLOGAN = m.slogan();

export const SITEMAP_URLS: string[] = [
	'/',
	'/blog',
	'/code-of-conduct',
	'/license',
	'/privacy-policy',
	'/terms-of-service'
];

export const FOOTER_LINKS = [
	{
		title: m.footer_links_product(),
		items: [
			{ text: m.footer_links_mission(), url: '/blog/post/our-mission' },
			{ text: m.footer_links_features(), url: '/#features' },
			{ text: m.footer_links_pricing(), url: '/#pricing' },
			{ text: m.footer_links_roadmap(), url: '/#roadmap' }
		]
	},
	{
		title: m.footer_links_resources(),
		items: [
			{ text: m.footer_links_docs(), url: DOCUMENTATION_LINK },
			{ text: m.footer_links_blog(), url: '/blog' },
			{ text: m.footer_links_support(), url: DISCORD_LINK }
		]
	},
	{
		title: m.footer_links_community(),
		items: [
			{ text: 'GitHub', url: GITHUB_LINK },
			{ text: 'Discord', url: DISCORD_LINK }
			// { text: 'Twitter', url: 'https://twitter.com/arcana_pixel' },
			// { text: 'YouTube', url: 'https://youtube.com/arcana_pixel' }
		]
	},
	{
		title: m.footer_links_legal(),
		items: [
			{ text: m.footer_links_privacy(), url: '/privacy-policy' },
			{ text: m.footer_links_terms(), url: '/terms-of-service' },
			{ text: m.footer_links_license(), url: '/license' },
			{ text: m.footer_links_coc(), url: '/code-of-conduct' }
		]
	}
];

export const SUPPORTED_SYSTEMS = [
	{
		name: 'Ordem Paranormal',
		status: m.rpg_system_supported(),
		logo: '/assets/images/logos/ordem-paranormal-logo.webp',
		creature: '/assets/images/creatures/blood-zombie.webp',
		description: m.rpg_system_description_op()
	},
	{
		name: 'D&D 5e',
		status: m.rpg_system_supported(),
		logo: '/assets/images/logos/dnd-logo.webp',
		creature: '/assets/images/creatures/beholder.webp',
		description: m.rpg_system_description_dnd()
	},
	{
		name: 'Tormenta 20',
		status: m.rpg_system_coming_soon(),
		logo: '/assets/images/logos/tormenta-logo.webp',
		creature: '/assets/images/creatures/tormenta-creature.webp',
		description: m.rpg_system_description_tormenta()
	},
	{
		name: 'Call of Cthulhu',
		status: m.rpg_system_coming_soon(),
		logo: '/assets/images/logos/call-of-cthulhu-logo.webp',
		creature: '/assets/images/creatures/cthulhu.webp',
		description: m.rpg_system_description_call_of_cthulhu()
	}
];

export const ROADMAP_MILESTONES = [
	{
		title: m.roadmap_milestone_development(),
		date: m.roadmap_milestone_development_date(),
		description: m.roadmap_milestone_development_description(),
		icon: BookIcon,
		active: true
	},
	{
		title: m.roadmap_milestone_closed_beta(),
		date: m.roadmap_milestone_closed_beta_date(),
		description: m.roadmap_milestone_closed_beta_description(),
		icon: PersonIcon,
		active: false
	},
	{
		title: m.roadmap_milestone_open_beta(),
		date: m.roadmap_milestone_open_beta_date(),
		description: m.roadmap_milestone_open_beta_description(),
		icon: UsersIcon,
		active: false
	},
	{
		title: m.roadmap_milestone_full_launch(),
		date: m.roadmap_milestone_full_launch_date(),
		description: m.roadmap_milestone_full_launch_description(),
		icon: StarIcon,
		active: false
	}
];

export type Locale = (typeof locales)[number];
export const AVAILABLE_LANGUAGES: {
	code: Locale;
	name: string;
	flag: string;
}[] = [
	{
		code: 'pt',
		name: 'Português',
		flag: '/assets/images/flags/brazil.webp'
	},
	{
		code: 'en',
		name: 'English',
		flag: '/assets/images/flags/usa.webp'
	},
	{
		code: 'es',
		name: 'Español',
		flag: '/assets/images/flags/spain.webp'
	}
	// {
	// 	code: 'fr',
	// 	name: 'Français',
	// 	flag: '/assets/images/flags/france.webp'
	// },
	// {
	// 	code: 'it',
	// 	name: 'Italiano',
	// 	flag: '/assets/images/flags/italy.webp'
	// }
];

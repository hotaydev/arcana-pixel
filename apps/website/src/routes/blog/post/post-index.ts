import { m } from '$lib/paraglide/messages.js';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tags: string[];
};

export const posts: Record<string, BlogPost> = {
	'our-mission': {
		slug: 'our-mission',
		title: m.blog_post_our_mission_title(),
		description: m.blog_post_our_mission_description(),
		date: '2025-04-24T12:00:00-03:00',
		author: 'Taylor Hoffmann',
		tags: m
			.blog_post_our_mission_tags()
			.split(',')
			.map((tag) => tag.trim())
	}
};

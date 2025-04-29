import { m } from '$lib/paraglide/messages.js';

export type PostAuthor = {
	name: string;
	url: string;
};

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: PostAuthor;
	tags: string[];
};

const taylorHoffmann: PostAuthor = {
	name: 'Taylor Hoffmann',
	url: 'https://www.linkedin.com/in/hoffmann-taylor/'
};

export const posts: Record<string, BlogPost> = {
	'our-mission': {
		slug: 'our-mission',
		title: m.blog_post_our_mission_title(),
		description: m.blog_post_our_mission_description(),
		date: '2025-04-24T12:00:00-03:00',
		author: taylorHoffmann,
		tags: m
			.blog_post_our_mission_tags()
			.split(',')
			.map((tag) => tag.trim())
	}
};

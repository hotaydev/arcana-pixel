import type { BlogPost } from '$lib/models/blog-post';
import { m } from '$lib/paraglide/messages.js';
import { taylorHoffmann } from './blog-authors';
import { Tags } from './blog-tags';

export const posts: Record<string, BlogPost> = {
	'our-mission': {
		slug: 'our-mission',
		title: m.blog_post_our_mission_title(),
		description: m.blog_post_our_mission_description(),
		date: '2025-04-24T12:00:00-03:00',
		author: taylorHoffmann,
		tags: [Tags.Announcement, Tags.Mission].map((tag) => m[tag]())
	},
	'ordem-paranormal': {
		slug: 'ordem-paranormal',
		title: m.blog_post_ordem_paranormal_title(),
		description: m.blog_post_ordem_paranormal_description(),
		date: '2025-05-21T12:00:00-03:00',
		author: taylorHoffmann,
		tags: [Tags.VTT, Tags.Rituals, Tags.OrdemParanormal].map((tag) => m[tag]())
	}
};

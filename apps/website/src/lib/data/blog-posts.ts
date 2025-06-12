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
		tags: [Tags.VTT, Tags.OrdemParanormal].map((tag) => m[tag]())
	},
	'what-is-a-vtt': {
		slug: 'what-is-a-vtt',
		title: m.blog_post_what_is_a_vtt_title(),
		description: m.blog_post_what_is_a_vtt_description(),
		date: '2025-06-02T15:20:00-03:00',
		author: taylorHoffmann,
		tags: [Tags.VTT, Tags.DidYouKnow].map((tag) => m[tag]())
	},
	'why-we-are-open-source': {
		slug: 'why-we-are-open-source',
		title: m.blog_post_why_we_are_open_source_title(),
		description: m.blog_post_why_we_are_open_source_description(),
		date: '2025-06-12T11:20:00-03:00',
		author: taylorHoffmann,
		tags: [Tags.VTT, Tags.DidYouKnow, Tags.Mission].map((tag) => m[tag]())
	}
};

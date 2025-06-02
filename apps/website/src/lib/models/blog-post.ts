import type { PostAuthor } from './blog-author';

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: PostAuthor;
	tags: string[];
};

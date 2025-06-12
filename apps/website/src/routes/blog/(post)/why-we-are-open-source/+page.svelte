<script lang="ts">
	import BlogContent from '$lib/components/blog/BlogContent.svelte';
	import { posts } from '$lib/data/blog-posts';
	import type { BlogPost } from '$lib/models/blog-post';
	import { m } from '$lib/paraglide/messages.js';
	import { DISCORD_LINK, GITHUB_LINK } from '$lib/variables';

	const metadata: BlogPost = posts['why-we-are-open-source'];
</script>

<BlogContent {metadata}>
	{@html m.blog_post_why_we_are_open_source({ github: DISCORD_LINK, discord: GITHUB_LINK })}
</BlogContent>

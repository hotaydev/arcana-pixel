<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { DISCORD_LINK } from '$lib/variables';
	import BlogContent from '$lib/components/blog/BlogContent.svelte';
	import type { BlogPost } from '$lib/models/blog-post';
	import { posts } from '$lib/data/blog-posts';

	const metadata: BlogPost = posts['our-mission'];
</script>

<BlogContent {metadata}>
	{@html m.blog_post_our_mission_content({ discord: DISCORD_LINK })}
</BlogContent>

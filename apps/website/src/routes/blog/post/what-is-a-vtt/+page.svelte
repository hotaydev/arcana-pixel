<script lang="ts">
	import BlogContent from '$lib/components/blog/BlogContent.svelte';
	import { posts } from '$lib/data/blog-posts';
	import type { BlogPost } from '$lib/models/blog-post';
	import { m } from '$lib/paraglide/messages.js';
	import { DISCORD_LINK, GITHUB_LINK } from '$lib/variables';

	const metadata: BlogPost = posts['what-is-a-vtt'];
</script>

<BlogContent {metadata}>
	{@html m.blog_post_what_is_a_vtt_content({ github: GITHUB_LINK, discord: DISCORD_LINK })}
</BlogContent>

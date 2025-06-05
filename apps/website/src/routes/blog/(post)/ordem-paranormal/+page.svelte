<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import BlogContent from '$lib/components/blog/BlogContent.svelte';
	import type { BlogPost } from '$lib/models/blog-post';
	import { posts } from '$lib/data/blog-posts';

	const metadata: BlogPost = posts['ordem-paranormal'];
</script>

<BlogContent {metadata}>
	{@html m.blog_post_ordem_paranormal_content()}
</BlogContent>

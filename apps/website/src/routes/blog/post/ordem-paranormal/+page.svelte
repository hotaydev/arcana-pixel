<script lang="ts">
	import BlogFooter from '$lib/components/blog/BlogFooter.svelte';
	import BlogHead from '$lib/components/blog/BlogHead.svelte';
	import BlogHeader from '$lib/components/blog/BlogHeader.svelte';
	import { posts, type BlogPost } from '../post-index';
	import { m } from '$lib/paraglide/messages.js';

	const metadata: BlogPost = posts['ordem-paranormal'];
</script>

<BlogHead {metadata} />

<article class="blog-post">
	<BlogHeader {metadata} />

	<div class="post-content">
		{@html m.blog_post_ordem_paranormal_content()}
	</div>

	<BlogFooter {metadata} />
</article>

<style>
	.blog-post {
		max-width: 900px;
		margin: 0 auto;
	}

	.post-content {
		margin-bottom: 3rem;
	}

	.post-content :global(section) {
		margin-bottom: 2rem;
	}

	.post-content :global(p) {
		margin-bottom: 1.5rem;
		line-height: 1.8;
		color: var(--gray);
		font-size: 1.1rem;
	}

	.post-content :global(strong) {
		color: var(--light);
	}

	.post-content :global(abbr) {
		text-decoration: none;
		border-bottom: 1px dotted var(--primary);
		cursor: help;
	}

	@media (max-width: 768px) {
		.post-content {
			padding: 1.5rem;
		}
	}
</style>

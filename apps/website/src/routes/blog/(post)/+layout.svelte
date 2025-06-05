<script lang="ts">
	import '../../../app.css';
	import { GoBack } from '$lib/components/icons';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<div class="blog-post-container">
	<div class="container">
		<slot />
	</div>
</div>

<div class="back-to-blog">
	<div class="container">
		<a href={localizeHref('/blog')} class="back-link">
			<GoBack />
			{m.blog_back_to_blog()}
		</a>
	</div>
</div>

<style>
	.blog-post-container {
		padding: 8rem 0 3rem;
		min-height: 70vh;
	}

	.back-to-blog {
		background-color: var(--dark-surface);
		padding: 1.5rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--primary-light);
		font-weight: 500;
		transition: all 0.3s ease;
		margin: 0 auto;
		width: fit-content;
	}

	.back-link:hover {
		opacity: 0.8;
		transform: translateX(-5px);
	}

	@media (max-width: 768px) {
		.blog-post-container {
			padding: 6rem 0 2rem;
		}
	}
</style>

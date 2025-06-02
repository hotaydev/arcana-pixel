<script lang="ts">
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import type { BlogPost } from '$lib/models/blog-post';

	const { metadata }: { metadata: BlogPost } = $props();

	const currentLocale = getLocale();
</script>

<header class="post-header">
	<div class="post-meta">
		<div class="post-tags">
			{#each metadata.tags as tag (tag)}
				<a href={localizeHref(`/blog/?tag=${encodeURIComponent(tag)}`)} class="post-tag">{tag}</a>
			{/each}
		</div>
		<time datetime={metadata.date}>
			{new Date(metadata.date).toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</time>
	</div>
	<h1>{metadata.title}</h1>

	{#if currentLocale !== 'pt'}
		<div class="translation-notice">
			<span class="translation-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" y1="16" x2="12" y2="12"></line>
					<line x1="12" y1="8" x2="12.01" y2="8"></line>
				</svg>
			</span>
			<p>{m.blog_post_translation_notice()}</p>
		</div>
	{/if}
</header>

<style>
	.post-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1.5rem;
		gap: 1rem;
	}

	.post-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.post-tag {
		background: rgba(94, 18, 157, 0.2);
		color: var(--primary-light);
		padding: 0.3rem 0.8rem;
		border-radius: 4px;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.3s ease;
		text-decoration: none;
		display: inline-block;
	}

	.post-tag:hover {
		background: rgba(94, 18, 157, 0.4);
		transform: translateY(-2px);
	}

	time {
		color: var(--gray);
		font-size: 0.95rem;
	}

	h1 {
		font-size: 3rem;
		line-height: 1.2;
		margin-top: 1rem;
		position: relative;
		display: inline-block;
		padding-bottom: 0.5rem;
	}

	h1::after {
		content: '';
		position: absolute;
		left: 25%;
		right: 25%;
		bottom: 0;
		height: 3px;
		background: var(--gradient);
	}

	.translation-notice {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: rgba(94, 18, 157, 0.1);
		border-radius: 6px;
		padding: 0.7rem 1rem;
		margin-top: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.translation-notice p {
		font-style: italic;
		color: var(--gray);
		font-size: 0.9rem;
		margin: 0;
		width: 100%;
	}

	.translation-icon {
		font-size: 1.2rem;
		color: var(--primary-light);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.translation-icon svg {
		width: 20px;
		height: 20px;
	}

	@media (max-width: 768px) {
		.post-header {
			margin-bottom: 2rem;
		}

		h1 {
			font-size: 2rem;
		}

		.translation-notice {
			max-width: 100%;
			padding: 0.6rem 0.8rem;
		}
	}
</style>

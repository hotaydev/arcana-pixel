<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';

	export let metadata;
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

	@media (max-width: 768px) {
		.post-header {
			margin-bottom: 2rem;
		}

		h1 {
			font-size: 2rem;
		}
	}
</style>

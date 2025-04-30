<script lang="ts">
	import { FacebookIcon, LinkedInIcon, TwitterIcon } from '../icons';
	import { m } from '$lib/paraglide/messages.js';
	import type { BlogPost } from '../../../routes/blog/post/post-index';

	export let metadata: BlogPost;

	const encodedTitle = encodeURIComponent(metadata.title);
	const encodedUrl = encodeURIComponent(`https://www.arcanapixel.com/blog/post/${metadata.slug}`);
</script>

<footer class="post-footer">
	<div class="author-info">
		<div class="author-name">
			<a href={metadata.author.url} target="_blank" rel="noopener noreferrer"
				>{m.blog_written_by_author()} {metadata.author.name}</a
			>
		</div>
	</div>
	<div class="share-post">
		<span>{m.blog_share_post()}:</span>
		<div class="share-buttons">
			<a
				href="https://x.com/intent/post?text={encodedTitle}&url={encodedUrl}"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={m.blog_share_post_x()}
			>
				<TwitterIcon />
			</a>
			<a
				href="https://www.facebook.com/sharer/sharer.php?u={encodedUrl}"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={m.blog_share_post_facebook()}
			>
				<FacebookIcon />
			</a>
			<a
				href="https://www.linkedin.com/sharing/share-offsite/?url={encodedUrl}&title={encodedTitle}"
				target="_blank"
				rel="noopener noreferrer"
				aria-label={m.blog_share_post_linkedin()}
			>
				<LinkedInIcon />
			</a>
		</div>
	</div>
</footer>

<style>
	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.author-info {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-style: italic;
		color: var(--gray);
		font-size: 1rem;
	}

	.share-post {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: var(--gray);
	}

	.share-buttons {
		display: flex;
		gap: 1rem;
	}

	.share-buttons a {
		color: var(--gray);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.05);
	}

	.share-buttons a:hover {
		color: var(--primary-light);
		background-color: rgba(94, 18, 157, 0.2);
		transform: translateY(-3px);
	}

	@media (max-width: 768px) {
		.post-footer {
			flex-direction: column;
			align-items: flex-start;
			gap: 1.5rem;
		}

		.share-post {
			width: 100%;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.share-buttons {
			margin-top: 0.5rem;
		}
	}
</style>

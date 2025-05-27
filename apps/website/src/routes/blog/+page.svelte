<script lang="ts">
	import { posts, type BlogPost } from './post/post-index';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { CloseIcon, SearchIcon } from '$lib/components/icons';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';

	// State variables using runes
	let searchQuery = $state('');
	let tagFilter = $state('');
	let filteredPosts = $state<BlogPost[]>(
		[...Object.values(posts)].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	);

	// Apply filters whenever search or tag changes
	$effect(() => {
		let results = [...Object.values(posts)];

		// Apply tag filter if present
		if (tagFilter) {
			results = results.filter((post) =>
				post.tags.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase())
			);
		}

		// Apply search filter if present
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			results = results.filter(
				(post) =>
					post.title.toLowerCase().includes(query) ||
					post.description.toLowerCase().includes(query) ||
					post.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		filteredPosts = results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	});

	// Update URL when filters change
	$effect(() => {
		if (browser) {
			const params = new URLSearchParams();

			if (searchQuery) {
				params.set('search', searchQuery);
			}

			if (tagFilter) {
				params.set('tag', tagFilter);
			}

			goto(`?${params.toString()}`, { replaceState: true, keepFocus: true });
		}
	});

	// Handle tag clicks in the posts list
	function handleTagClick(tag: string) {
		tagFilter = tag === tagFilter ? '' : tag;
	}

	// Clear all filters
	function clearAllFilters() {
		searchQuery = '';
		tagFilter = '';
	}

	// Initialize from URL parameters on page load
	$effect.root(() => {
		if (browser) {
			const params = page.url.searchParams;
			tagFilter = params.get('tag') || '';
			searchQuery = params.get('search') || '';
		}
	});
</script>

<svelte:head>
	<title>{m.blog_page_title()}</title>
	<meta name="description" content={m.blog_head_description()} />
	<meta name="keywords" content={m.blog_head_keywords()} />
</svelte:head>

<div class="blog-container">
	<div class="container">
		<h1>{m.blog_main_title()}</h1>
		<p class="subtitle">{m.blog_subtitle()}</p>

		<div class="search-container">
			<div class="search-box">
				<input type="text" placeholder={m.blog_search_placeholder()} bind:value={searchQuery} />
				{#if searchQuery}
					<button class="clear-button" onclick={() => (searchQuery = '')}>
						<CloseIcon />
					</button>
				{/if}
				<!-- Search magnifying glass icon -->
				<div class="search-button">
					<SearchIcon />
				</div>
			</div>
		</div>

		{#if tagFilter}
			<div class="filter-info">
				<p>
					{m.blog_filter_showing()}
					<span class="highlight">{tagFilter}</span>
				</p>
				<button class="clear-filters" onclick={clearAllFilters}>
					{m.blog_clear_filter()}
				</button>
			</div>
		{/if}

		<div class="posts-container">
			{#if filteredPosts.length > 0}
				{#each filteredPosts as post (post.slug)}
					<article class="post-card">
						<div class="post-content">
							<div class="post-meta">
								<span class="post-date"
									>{new Date(post.date).toLocaleDateString(undefined, {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}</span
								>
								<div class="post-tags">
									{#each post.tags as tag (tag)}
										<button
											class="post-tag {tagFilter === tag ? 'active' : ''}"
											onclick={() => handleTagClick(tag)}
										>
											{tag}
										</button>
									{/each}
								</div>
							</div>
							<h2 class="post-title">
								<a href={localizeHref(`/blog/post/${post.slug}`)}>{post.title}</a>
							</h2>
							<p class="post-excerpt">{post.description}</p>
							<div class="post-footer">
								<span class="post-author">
									{m.blog_by_author()}
									{post.author.name}
								</span>
								<a href={localizeHref(`/blog/post/${post.slug}`)} class="read-more">
									{m.blog_read_more()}
								</a>
							</div>
						</div>
					</article>
				{/each}
			{:else}
				<div class="no-results">
					<p>
						{tagFilter
							? `${m.blog_no_results_tag()} "${tagFilter}"`
							: `${m.blog_no_results_search()} "${searchQuery}"`}
					</p>
					<button class="clear-search" onclick={clearAllFilters}>
						{m.blog_clear_filters()}
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.blog-container {
		padding: 8rem 0;
		min-height: 80vh;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.subtitle {
		text-align: center;
		color: var(--gray);
		margin-bottom: 3rem;
		font-size: 1.1rem;
	}

	.search-container {
		margin-bottom: 3rem;
		display: flex;
		justify-content: center;
	}

	.search-box {
		position: relative;
		width: 100%;
		max-width: 600px;
	}

	input[type='text'] {
		width: 100%;
		padding: 1rem 4rem 1rem 1.5rem;
		background-color: var(--dark-surface);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--light);
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	input[type='text']:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 2px var(--glow-primary);
	}

	.search-button {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--primary-light);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.search-button:hover {
		background-color: rgba(94, 18, 157, 0.2);
	}

	.clear-button {
		position: absolute;
		right: 50px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--gray);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.clear-button:hover {
		color: var(--light);
		background-color: rgba(255, 255, 255, 0.1);
	}

	.filter-info {
		background-color: rgba(94, 18, 157, 0.1);
		padding: 0.8rem 1.2rem;
		border-radius: 6px;
		margin-bottom: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.filter-info p {
		margin: 0;
		font-size: 0.95rem;
		color: var(--gray);
	}

	.highlight {
		color: var(--primary-light);
		font-weight: 500;
	}

	.posts-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-card {
		background-color: var(--dark-surface);
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
		position: relative;
	}

	.post-card:hover {
		transform: translateY(-5px);
		border-color: rgba(94, 18, 157, 0.3);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.post-content {
		padding: 1.5rem;
	}

	.post-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.post-date {
		color: var(--gray);
		font-size: 0.9rem;
	}

	.post-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.post-tag {
		background: rgba(94, 18, 157, 0.2);
		color: var(--primary-light);
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.post-tag:hover {
		background: rgba(94, 18, 157, 0.4);
		transform: translateY(-2px);
	}

	.post-tag.active {
		background: rgba(94, 18, 157, 0.5);
		box-shadow: 0 0 5px var(--glow-primary);
	}

	.post-title {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	.post-title a {
		color: var(--light);
		transition: color 0.3s ease;
	}

	.post-title a:hover {
		color: var(--primary-light);
	}

	.post-excerpt {
		color: var(--gray);
		margin-bottom: 1.5rem;
		line-height: 1.6;
	}

	.post-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding-top: 1rem;
	}

	.post-author {
		font-style: italic;
		color: var(--gray);
		font-size: 0.9rem;
	}

	.read-more {
		color: var(--primary-light);
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.read-more:hover {
		text-decoration: underline;
	}

	.no-results {
		text-align: center;
		padding: 3rem 0;
		color: var(--gray);
	}

	.clear-search {
		margin-top: 1rem;
		background: var(--gradient);
		color: var(--light);
		border: none;
		padding: 0.5rem 1.5rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.clear-search:hover {
		opacity: 0.9;
	}

	.clear-filters {
		background: none;
		border: 1px solid var(--primary-light);
		color: var(--primary-light);
		padding: 0.3rem 0.8rem;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 0.85rem;
	}

	.clear-filters:hover {
		background: rgba(94, 18, 157, 0.2);
	}

	@media (max-width: 992px) {
		.blog-container {
			padding: 6rem 0 2rem;
		}

		h1 {
			font-size: 2rem;
		}

		.post-meta {
			flex-direction: column;
			align-items: flex-start;
		}

		.post-title {
			font-size: 1.3rem;
		}
	}
</style>

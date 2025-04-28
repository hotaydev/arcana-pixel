<script lang="ts">
	import { GITHUB_LINK, DISCORD_LINK } from '$lib/variables';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';

	// Extract repo information from GitHub link
	const repoUrl = new URL(GITHUB_LINK);
	const [, owner, repo] = repoUrl.pathname.split('/');

	// Track loading state
	let isLoading = true;
	let hasError = false;

	// Define types for our stats configuration
	type StaticStat = {
		id: 'discord' | 'license';
		label: string;
		value: string;
		static: true;
	};

	type DynamicStat = {
		id: 'commits' | 'stars';
		label: string;
		loadingValue: string;
		defaultValue: string;
		format: (value: number) => string;
		static?: false;
	};

	type StatConfig = StaticStat | DynamicStat;

	// Shared format function for numbers
	const formatNumber = (value: number): string =>
		value >= 1000 ? `${(value / 1000).toFixed(1)}K+` : `${value}`;

	// Define the base stats structure with default values
	const statsConfig: StatConfig[] = [
		{
			id: 'commits',
			label: 'Commits',
			loadingValue: '...',
			defaultValue: '1K+',
			format: formatNumber
		},
		{
			id: 'stars',
			label: m.community_stars(),
			loadingValue: '...',
			defaultValue: '5K+',
			format: formatNumber
		},
		{
			id: 'discord',
			label: m.community_discord(),
			value: m.community_discord_active(),
			static: true
		},
		{
			id: 'license',
			label: m.community_license(),
			value: 'AGPL-3.0',
			static: true
		}
	];

	// Create stats array with loading state
	let stats = statsConfig.map((stat) => ({
		value: stat.static ? stat.value : stat.loadingValue,
		label: stat.label
	}));

	// Function to fetch GitHub stats
	async function fetchGitHubStats() {
		try {
			isLoading = true;
			hasError = false;

			// Fetch stars count
			const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

			if (!repoResponse.ok) {
				throw new Error(`GitHub API error: ${repoResponse.status}`);
			}

			const repoData = await repoResponse.json();
			const starCount = repoData.stargazers_count;

			// Fetch commits count
			// The API returns paginated results, we need to check the Link header
			const commitsResponse = await fetch(
				`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`
			);

			if (!commitsResponse.ok) {
				throw new Error(`GitHub API error: ${commitsResponse.status}`);
			}

			// Check the Link header for total pages
			const linkHeader = commitsResponse.headers.get('Link') || '';
			const match = linkHeader.match(/page=(\d+)>; rel="last"/);
			let commitsCount = '500+'; // Default fallback

			if (match && match[1]) {
				// GitHub paginates results, so we multiply page count by per_page value
				commitsCount = `${parseInt(match[1])}+`;
			} else {
				// If there's no pagination or less than a page, count from a larger fetch
				const allCommitsResponse = await fetch(
					`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`
				);
				if (!allCommitsResponse.ok) {
					throw new Error(`GitHub API error: ${allCommitsResponse.status}`);
				}
				const allCommits = await allCommitsResponse.json();
				commitsCount = allCommits.length;
			}

			// Update stats with fetched data
			const fetchedValues: Record<string, number> = {
				commits: parseInt(commitsCount.toString()),
				stars: starCount
			};

			// Apply the values using the original config
			stats = statsConfig.map((stat) => {
				if (stat.static) {
					return { value: stat.value, label: stat.label };
				}

				const dynamicStat = stat as DynamicStat;
				const rawValue = fetchedValues[dynamicStat.id];
				const formattedValue = dynamicStat.format(rawValue);

				return { value: formattedValue, label: stat.label };
			});
		} catch (error) {
			console.error('Error fetching GitHub stats:', error);
			hasError = true;

			// Use fallback values from statsConfig
			stats = statsConfig.map((stat) => ({
				value: stat.static ? stat.value : stat.defaultValue,
				label: stat.label
			}));
		} finally {
			isLoading = false;
		}
	}

	onMount(fetchGitHubStats);

	const dices = [
		{
			name: 'D4',
			image: '/assets/images/dices/pixel-d4.webp',
			position: { top: 15, left: 20 }
		},
		{
			name: 'D6',
			image: '/assets/images/dices/pixel-d6.webp',
			position: { top: 15, left: 65 }
		},
		{
			name: 'D8',
			image: '/assets/images/dices/pixel-d8.webp',
			position: { top: 60, left: 20 }
		},
		{
			name: 'D10',
			image: '/assets/images/dices/pixel-d10.webp',
			position: { top: 90, left: 60 }
		},
		{
			name: 'D12',
			image: '/assets/images/dices/pixel-d12.webp',
			position: { top: 50, left: 90 }
		},
		{
			name: 'D20',
			image: '/assets/images/dices/pixel-d20.webp',
			position: { top: 50, left: 50 }
		}
	];

	// D20 is the central node
	const d20 = dices.find((dice) => dice.name === 'D20')!;
	const surroundingDices = dices.filter((dice) => dice.name !== 'D20');
</script>

<section id="community" class="section">
	<div class="container">
		<div class="community-grid">
			<div class="community-content">
				<h2>{@html m.community_title()}</h2>
				<p>{m.community_description()}</p>

				<div class="stats-grid">
					{#each stats as stat (stat.label)}
						<div class="stat-item">
							<span
								class="stat-value gradient-text"
								class:loading={isLoading && stat.value === '...'}>{stat.value}</span
							>
							<span class="stat-label">{stat.label}</span>
						</div>
					{/each}
				</div>

				{#if hasError}
					<div class="error-message">
						<p>{m.community_could_not_load_stats()}</p>
						<button class="retry-btn" on:click={fetchGitHubStats}>{m.community_retry()}</button>
					</div>
				{/if}

				<div class="community-cta">
					<a href={GITHUB_LINK} class="btn-secondary">{m.community_contribute_github()}</a>
					<a href={DISCORD_LINK} class="btn-primary">{m.community_join_discord()}</a>
				</div>
			</div>

			<div class="community-image">
				<div class="image-wrapper">
					<div class="dice-graph">
						<!-- Draw SVG connections -->
						<svg class="connections-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
							<!-- Define gradients for connections -->
							<defs>
								{#each surroundingDices as dice, i (dice.name)}
									<linearGradient
										id="lineGradient{i}"
										gradientUnits="userSpaceOnUse"
										x1={d20.position.left}
										y1={d20.position.top}
										x2={dice.position.left}
										y2={dice.position.top}
									>
										<stop offset="0%" stop-color="var(--primary)" />
										<stop offset="100%" stop-color="var(--dark-surface)" />
									</linearGradient>
								{/each}
							</defs>

							{#each surroundingDices as dice, i (dice.name)}
								<line
									class="connection-line"
									x1={d20.position.left}
									y1={d20.position.top}
									x2={dice.position.left}
									y2={dice.position.top}
									stroke="url(#lineGradient{i})"
									stroke-width={dice.name === 'D12' ? 3 : 2}
								/>
							{/each}
						</svg>

						<!-- Center D20 -->
						<div
							class="dice-node d20-node"
							style="top: {d20.position.top}%; left: {d20.position
								.left}%; transform: translate(-50%, -50%);"
						>
							<div class="dice-bg">
								<img src={d20.image} alt="D20" />
							</div>
						</div>

						<!-- Surrounding dice -->
						{#each surroundingDices as dice (dice.name)}
							<div
								class="dice-node dice-{dice.name.toLowerCase()}"
								style="top: {dice.position.top}%; left: {dice.position
									.left}%; transform: translate(-50%, -50%);"
							>
								<div class="dice-bg">
									<img src={dice.image} alt={dice.name} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		overflow: hidden;
		user-select: auto;
	}

	.community-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		position: relative;
		z-index: 2;
		align-items: center;
	}

	.community-content {
		position: relative;
		z-index: 3;
	}

	.community-content h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 1.5rem;
		line-height: 1.2;
	}

	.community-content p {
		font-size: 1.1rem;
		color: var(--gray);
		margin-bottom: 2.5rem;
		line-height: 1.7;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	.stat-value.loading {
		position: relative;
		color: var(--primary-transparent);
	}

	.stat-value.loading::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 3px;
		width: 100%;
		background: linear-gradient(
			90deg,
			var(--primary-transparent),
			var(--primary),
			var(--primary-transparent)
		);
		background-size: 200% 100%;
		animation: loading 1.5s infinite;
	}

	@keyframes loading {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	.stat-label {
		font-size: 1rem;
		color: var(--gray);
	}

	.community-cta {
		display: flex;
		gap: 1rem;
	}

	.community-cta a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.community-image {
		position: relative;
	}

	.image-wrapper {
		position: relative;
		overflow: hidden;
		padding: 2rem;
		min-height: 350px;
	}

	.dice-graph {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 350px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.connections-svg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.connection-line {
		stroke-width: 2;
		animation: pulse 3s infinite;
	}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}

	.dice-node {
		position: absolute;
		transition: all 0.3s ease;
		z-index: 2;
	}

	.dice-bg {
		background: linear-gradient(135deg, var(--primary), var(--dark-surface));
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		padding: 15%;
	}

	.d20-node {
		z-index: 3;
	}

	.d20-node .dice-bg {
		width: 110px;
		height: 110px;
	}

	.dice-d4 .dice-bg,
	.dice-d8 .dice-bg {
		width: 65px;
		height: 65px;
	}

	.dice-d6 .dice-bg,
	.dice-d10 .dice-bg {
		width: 75px;
		height: 75px;
	}

	.dice-d12 .dice-bg {
		width: 85px;
		height: 85px;
	}

	.dice-node img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
	}

	@media (max-width: 768px) {
		.community-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.community-image {
			order: -1;
		}

		.stats-grid {
			margin-bottom: 2rem;
		}

		.community-cta {
			flex-direction: column;
		}

		.d20-node .dice-bg {
			width: 90px;
			height: 90px;
		}

		.dice-d4 .dice-bg,
		.dice-d8 .dice-bg {
			width: 55px;
			height: 55px;
		}

		.dice-d6 .dice-bg,
		.dice-d10 .dice-bg,
		.dice-d12 .dice-bg {
			width: 65px;
			height: 65px;
		}
	}

	.error-message {
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
		color: #ff6b6b;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.error-message p {
		margin: 0;
		font-size: 0.9rem;
	}

	.retry-btn {
		background: transparent;
		color: var(--primary);
		border: 1px solid var(--primary);
		padding: 0.3rem 0.8rem;
		border-radius: 4px;
		font-size: 0.8rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.retry-btn:hover {
		background: var(--primary-transparent);
	}
</style>

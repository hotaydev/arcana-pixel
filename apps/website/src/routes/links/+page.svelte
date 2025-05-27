<script lang="ts">
	import {
		DiscordIcon,
		LinkedInIcon,
		GithubIcon,
		MapIcon,
		WebsiteIcon
	} from '$lib/components/icons';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { DISCORD_LINK, GITHUB_LINK, LINKEDIN_LINK } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';

	// Dice images for background decoration
	const dices = [
		{ name: 'D4', image: '/assets/images/dices/pixel-d4.webp' },
		{ name: 'D6', image: '/assets/images/dices/pixel-d6.webp' },
		{ name: 'D8', image: '/assets/images/dices/pixel-d8.webp' },
		{ name: 'D20', image: '/assets/images/dices/pixel-d20.webp' },
		{ name: 'D12', image: '/assets/images/dices/pixel-d12.webp' }
	];
</script>

<svelte:head>
	<title>{m.links_page_title()}</title>
	<meta name="description" content={m.links_page_description()} />
	<meta name="keywords" content={m.links_page_keywords()} />
</svelte:head>

<div class="container">
	<div class="content">
		<h1>{m.links_page_main_title()}</h1>

		<section class="links-container">
			<a href={DISCORD_LINK} class="link-item" target="_blank" rel="noopener noreferrer">
				<div class="icon-container">
					<DiscordIcon size={40} />
				</div>
				<span>Discord</span>
			</a>

			<a href={localizeHref('blog/post/our-mission')} class="link-item">
				<div class="icon-container">
					<MapIcon size={36} />
				</div>
				<span>{m.footer_links_mission()}</span>
			</a>

			<a href={localizeHref('/')} class="link-item">
				<div class="icon-container">
					<WebsiteIcon size={36} />
				</div>
				<span>{m.links_page_link_website()}</span>
			</a>
		</section>

		<div class="social-icons">
			<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" class="social-icon">
				<DiscordIcon />
			</a>
			<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" class="social-icon">
				<GithubIcon />
			</a>
			<a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" class="social-icon">
				<LinkedInIcon />
			</a>
		</div>
	</div>

	<!-- Floating dice background -->
	<div class="floating-dices">
		{#each dices as dice, i (dice.name)}
			<div class="floating-dice dice-{i + 1}">
				<img src={dice.image} alt={dice.name} />
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		padding: 8rem 0 3rem;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		position: relative;
		overflow: hidden;
	}

	.content {
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 10;
		background: var(--color-bg, #fff);
		background: linear-gradient(180deg, var(--color-bg, #fff) 0%, rgba(255, 255, 255, 0.9) 100%);
		border-radius: 1rem;
		padding: 3rem 2rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 2.5rem;
		text-align: center;
		background: linear-gradient(135deg, var(--color-primary, #6366f1), #9f7aea);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shimmer 2s infinite;
		background-size: 200% auto;
	}

	@keyframes shimmer {
		0% {
			background-position: 0% center;
		}
		50% {
			background-position: 100% center;
		}
		100% {
			background-position: 0% center;
		}
	}

	.links-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;
	}

	.link-item {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: #e0e0e0;
		border-radius: 0.5rem;
		text-decoration: none;
		color: var(--color-text, #333);
		transition: all 0.3s ease;
		border: 1px solid transparent;
		position: relative;
		overflow: hidden;
	}

	.link-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: all 0.6s ease;
	}

	.link-item:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		border-color: var(--color-primary, #6366f1);
	}

	.link-item:hover::before {
		left: 100%;
	}

	.icon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		margin-right: 1rem;
		color: var(--color-primary, #6366f1);
	}

	.social-icons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		margin-top: auto;
		padding-top: 2rem;
	}

	.social-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary, #6366f1), #9f7aea);
		color: white;
		transition: all 0.3s ease;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.social-icon:hover {
		transform: translateY(-3px) rotate(8deg);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
	}

	.social-icon :global(svg) {
		width: 1.5rem;
		height: 1.5rem;
	}

	/* Floating dice background */
	.floating-dices {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: hidden;
	}

	.floating-dice {
		position: absolute;
		opacity: 0.5;
	}

	.floating-dice img {
		width: 60px;
		height: 60px;
	}

	.dice-1 {
		top: 20%;
		left: 5%;
		animation: float 15s ease-in-out infinite;
	}

	.dice-2 {
		bottom: 18%;
		left: 10%;
		animation: float 18s ease-in-out infinite reverse;
	}

	.dice-3 {
		top: 8%;
		right: 7%;
		animation: float 12s ease-in-out infinite 2s;
	}

	.dice-4 {
		bottom: 8%;
		right: 24%;
		animation: float 20s ease-in-out infinite 1s;
	}

	.dice-5 {
		top: 50%;
		right: 5%;
		animation: float 16s ease-in-out infinite 3s;
	}

	@keyframes float {
		0% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(10deg);
		}
		100% {
			transform: translateY(0) rotate(0deg);
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 6rem 0 2rem;
		}

		.content {
			padding: 1.5rem;
		}

		.floating-dice {
			opacity: 0.3;
		}
	}
</style>

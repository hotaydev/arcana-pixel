<script lang="ts">
	import { DiscordIcon, EmailIcon, GithubIcon } from '$lib/components/icons';
	import { DISCORD_LINK, GITHUB_LINK, SUPPORT_EMAIL } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.support_page_title()}</title>
	<meta name="description" content={m.support_page_description()} />
	<meta name="keywords" content={m.support_page_keywords()} />
</svelte:head>

<div class="support-container">
	<div class="container">
		<h1>{m.support_page_main_title()}</h1>
		<p class="subtitle">{m.support_page_subtitle()}</p>

		<div class="support-options">
			<div class="support-card">
				<div class="support-icon discord">
					<DiscordIcon />
				</div>
				<h2>{m.support_page_discord_title()}</h2>
				<p>
					{m.support_page_discord_description()}
				</p>
				<a
					href={DISCORD_LINK}
					target="_blank"
					rel="noopener noreferrer"
					class="support-button discord-button"
				>
					<DiscordIcon />
					{m.support_page_discord_button()}
				</a>
			</div>

			<div class="support-card">
				<div class="support-icon github">
					<GithubIcon />
				</div>
				<h2>{m.support_page_github_title()}</h2>
				<p>
					{m.support_page_github_description()}
				</p>
				<a
					href={GITHUB_LINK}
					target="_blank"
					rel="noopener noreferrer"
					class="support-button github-button"
				>
					<GithubIcon />
					{m.support_page_github_button()}
				</a>
			</div>

			<div class="support-card">
				<div class="support-icon email">
					<EmailIcon />
				</div>
				<h2>{m.support_page_email_title()}</h2>
				<p>
					{m.support_page_email_description()}
				</p>
				<a href="mailto:{SUPPORT_EMAIL}" class="support-button email-button">
					<EmailIcon />
					{m.support_page_email_button()}
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.support-container {
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
		margin-bottom: 4rem;
		font-size: 1.1rem;
	}

	.support-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.support-card {
		background-color: var(--dark-surface);
		padding: 2rem;
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		text-align: center;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.support-card:hover {
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.support-icon {
		width: 60px;
		height: 60px;
		margin: 0 auto 1.5rem;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.support-icon.discord {
		background: rgba(88, 101, 242, 0.1);
		color: #5865f2;
	}

	.support-icon.github {
		background: rgba(255, 255, 255, 0.1);
		color: var(--white);
	}

	.support-icon.email {
		background: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.support-card h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--white);
	}

	.support-card p {
		color: var(--gray);
		line-height: 1.6;
		margin-bottom: 2rem;
		flex-grow: 1;
	}

	.support-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid transparent;
	}

	.discord-button {
		background: #5865f2;
		color: white;
	}

	.discord-button:hover {
		background: #4752c4;
		transform: translateY(-1px);
	}

	.github-button {
		background: #24292e;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.github-button:hover {
		background: #1b1f23;
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	.email-button {
		background: #10b981;
		color: white;
	}

	.email-button:hover {
		background: #059669;
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.support-container {
			padding: 6rem 0;
		}

		h1 {
			font-size: 2rem;
		}

		.support-options {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.support-card {
			padding: 1.5rem;
		}
	}
</style>

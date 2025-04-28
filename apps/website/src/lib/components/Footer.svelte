<script lang="ts">
	import Logo from './Logo.svelte';
	import { FOOTER_LINKS, SLOGAN, GITHUB_LINK, DISCORD_LINK, LINKEDIN_LINK } from '$lib/variables';
	import { DiscordIcon, GithubIcon, LinkedInIcon } from './icons';
	import { m } from '$lib/paraglide/messages.js';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="cat-container">
		<div class="cat cat-1" title={m.cat_aiko()}>
			<img src="/assets/images/cats/cat1.webp" alt="Aiko" />
		</div>
		<div class="cat cat-2" title={m.cat_pandora()}>
			<img src="/assets/images/cats/cat2.webp" alt="Pandora" />
		</div>
	</div>
	<div class="container footer-content">
		<div class="footer-logo">
			<a href={localizeHref('/')}>
				<Logo size="" />
			</a>
			<p>{SLOGAN}</p>
		</div>
		<div class="footer-links">
			{#each FOOTER_LINKS as section (section.title)}
				<div class="footer-column">
					<h3>{section.title}</h3>
					<ul>
						{#each section.items as item (item.text)}
							<li>
								<a
									href={localizeHref(item.url)}
									target={item.url.startsWith('http') ? '_blank' : null}
									rel={item.url.startsWith('http') ? 'noopener noreferrer' : null}>{item.text}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
	<div class="footer-bottom">
		<div class="container">
			<p>&copy; {currentYear} Arcana Pixel. {m.footer_all_rights_reserved()}.</p>
			<div class="social-links">
				<LanguageSwitcher />
				<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
					<GithubIcon size={24} />
				</a>
				<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" aria-label="Discord">
					<DiscordIcon />
				</a>
				<a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<LinkedInIcon />
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: 4rem 0 1rem;
		background-color: var(--dark-surface);
		position: relative;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.cat-container {
		position: absolute;
		top: -40px;
		width: 100%;
		z-index: 10;
		pointer-events: none;
	}

	.cat {
		position: absolute;
		transition: all 0.3s ease;
		pointer-events: auto;
		cursor: pointer;
	}

	.cat img {
		width: 100%;
	}

	.cat-1 {
		left: 15%;
		transform: translate(-50%, -26%);
		width: 60px;
	}

	.cat-2 {
		right: 15%;
		transform: translate(50%, -15%);
		width: 80px;
	}

	.cat::after {
		content: attr(title);
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		background: var(--dark-surface);
		color: var(--light);
		padding: 5px 10px;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 0.8rem;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		pointer-events: none;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.cat:hover::after {
		opacity: 1;
		visibility: visible;
		bottom: calc(100% + 10px);
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.footer-logo {
		max-width: 300px;
	}

	.footer-logo p {
		color: var(--gray);
		font-size: 0.9rem;
		margin-top: 1rem;
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.footer-column h3 {
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		color: var(--light);
	}

	.footer-column ul {
		list-style: none;
	}

	.footer-column li {
		margin-bottom: 0.8rem;
	}

	.footer-column a {
		color: var(--gray);
		transition: all 0.3s ease;
		font-size: 0.9rem;
		position: relative;
	}

	.footer-column a:hover {
		color: var(--primary-light);
	}

	.footer-column a::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient);
		transition: width 0.3s ease;
	}

	.footer-column a:hover::after {
		width: 100%;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding-top: 1.5rem;
		text-align: center;
	}

	.footer-bottom .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-bottom p {
		color: var(--gray);
		font-size: 0.9rem;
	}

	.social-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.social-links a {
		color: var(--gray);
		transition: all 0.3s ease;
	}

	.social-links a:hover {
		color: var(--primary-light);
	}

	@media (max-width: 600px) {
		.cat-container {
			display: none;
		}
	}

	@media (max-width: 992px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.footer-links {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 576px) {
		.footer-links {
			grid-template-columns: 1fr;
		}

		.footer-bottom .container {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>

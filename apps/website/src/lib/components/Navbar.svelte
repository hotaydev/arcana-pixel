<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import Logo from './Logo.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Using a different function to close the menu to avoid clicking in a link, then resizing the page (if so, when reaching the mobile size, the page would pop the menu as if the user clicked to open it)
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav class="navbar">
	<div class="container navbar-container">
		<div class="logo">
			<a href={localizeHref('/')}>
				<Logo size="" />
			</a>
		</div>

		<button class="menu-toggle" onclick={toggleMenu} aria-label={m.navbar_toggle_menu()}>
			<span class:open={isMenuOpen}></span>
			<span class:open={isMenuOpen}></span>
			<span class:open={isMenuOpen}></span>
		</button>

		<div class="nav-links" class:open={isMenuOpen}>
			<a href={localizeHref('/#features')} onclick={closeMenu}>{m.navbar_features()}</a>
			<a href={localizeHref('/#systems')} onclick={closeMenu}>{m.navbar_systems()}</a>
			<a href={localizeHref('/#pricing')} onclick={closeMenu}>{m.navbar_pricing()}</a>
			<a href={localizeHref('/#roadmap')} onclick={closeMenu}>{m.navbar_roadmap()}</a>
			<a href={localizeHref('/blog')} onclick={closeMenu}>{m.navbar_blog()}</a>

			<div class="language-container">
				<LanguageSwitcher isHeader={true} />
			</div>

			<div class="nav-buttons">
				<a href={localizeHref('/#beta')} class="btn-primary" onclick={closeMenu}
					>{m.navbar_button()}</a
				>
			</div>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		padding: 1rem 0;
		backdrop-filter: blur(10px);
		background-color: rgba(18, 18, 18, 0.8);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		user-select: auto; /* Make text selectable */
	}

	.navbar-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-links a:not(.btn-primary, .btn-secondary) {
		position: relative;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.nav-links a:not(.btn-primary, .btn-secondary):hover {
		color: var(--primary-light);
	}

	.nav-links a:not(.btn-primary, .btn-secondary)::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient);
		transition: width 0.3s ease;
	}

	.nav-links a:not(.btn-primary, .btn-secondary):hover::after {
		width: 100%;
	}

	.language-container {
		margin: 0;
	}

	.nav-buttons {
		display: flex;
		gap: 1rem;
		margin-left: 1rem;
	}

	.nav-buttons a {
		transition: all 0.3s ease;
		font-weight: 500;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-around;
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: none;
		cursor: pointer;
		z-index: 10;
		padding: 0;
	}

	.menu-toggle span {
		width: 2rem;
		height: 0.25rem;
		background: var(--light);
		border-radius: 10px;
		transition: all 0.3s ease-in-out;
		position: relative;
		transform-origin: center;
		display: block;
	}

	.menu-toggle span:nth-child(1).open {
		transform: translateY(0.7rem) rotate(45deg);
	}

	.menu-toggle span:nth-child(2).open {
		opacity: 0;
	}

	.menu-toggle span:nth-child(3).open {
		transform: translateY(-0.7rem) rotate(-45deg);
	}

	@media (max-width: 1100px) {
		.menu-toggle {
			display: flex;
		}

		.nav-links {
			position: fixed;
			top: 0;
			right: -100%;
			width: 100%;
			max-width: 300px;
			height: 100vh;
			background-color: var(--dark-surface);
			flex-direction: column;
			padding: 5rem 2rem 2rem 2rem;
			transition: right 0.3s ease-in-out;
			box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
		}

		.nav-links.open {
			right: 0;
		}

		.language-container {
			margin: 0.5rem 0;
			width: 100%;
		}

		.nav-buttons {
			flex-direction: column;
			width: 100%;
			margin: 1rem 0 0 0;
		}

		.nav-buttons a {
			text-align: center;
		}
	}

	.nav-buttons a.btn-primary {
		background: var(--gradient);
		color: var(--light);
	}

	.nav-buttons a.btn-primary:hover {
		opacity: 0.9;
		color: var(--light);
	}
</style>

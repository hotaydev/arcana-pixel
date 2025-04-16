<script lang="ts">
	import { fade } from "svelte/transition";
	import ArcanaLogo from "$lib/components/common/logo.svelte";
	import { ChevronDown, LogOut, Settings, User, Moon, Sun } from "@lucide/svelte";
	import Avatar from "$lib/components/icons/avatar.svelte";

	let showUserMenu = false;
	let currentTheme = "dark";

	export let username = "Taylor Hoffmann";

	function handleDocumentClick(event: MouseEvent) {
		if (!event.composedPath().includes(document.querySelector(".user-profile")!)) {
			showUserMenu = false;
		}
	}
	document.addEventListener("click", handleDocumentClick);

	// Theme toggle function
	function toggleTheme() {
		currentTheme = currentTheme === "dark" ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", currentTheme);
		localStorage.setItem("theme", currentTheme);
	}

	import { onMount } from "svelte";

	onMount(() => {
		// Check if user has saved theme preference
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			currentTheme = savedTheme;
			document.documentElement.setAttribute("data-theme", currentTheme);
		}
	});
</script>

<nav class="top-bar">
	<ArcanaLogo />

	<div class="middle-area">
		<slot />
	</div>

	<div class="nav-actions">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="user-profile"
			on:click={() => {
				showUserMenu = !showUserMenu;
			}}
		>
			<Avatar />
			<span class="username">{username}</span>
			<ChevronDown size={16} />

			<!-- User dropdown menu -->
			{#if showUserMenu}
				<div class="user-menu" transition:fade={{ duration: 150 }}>
					<ul>
						<li>
							<User size={16} />
							<span>Perfil</span>
						</li>
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li on:click={toggleTheme}>
							{#if currentTheme === "dark"}
								<Sun size={16} />
								<span>Tema Claro</span>
							{:else}
								<Moon size={16} />
								<span>Tema Escuro</span>
							{/if}
						</li>
						<li>
							<Settings size={16} />
							<span>Configurações</span>
						</li>
						<li class="divider"></li>
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<li
							class="logout"
							on:click={() => {
								window.location.href = "/auth";
							}}
						>
							<LogOut size={16} />
							<span>Sair</span>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	/* Top Navigation Bar */
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background-color: var(--background-color-level-1);
		border-bottom: 1px solid var(--divider-color);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.middle-area {
		flex-grow: 1;
		max-width: 500px;
		margin: 0 2rem;
		position: relative;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		position: relative;
		padding: 0.5rem;
		border-radius: 6px;
		transition: background-color 0.2s ease;
	}

	.user-profile:hover {
		background-color: var(--background-color-level-0);
	}

	.username {
		font-weight: 500;
		max-width: 140px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* User Menu Dropdown */
	.user-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		width: 200px;
		background-color: var(--background-color-level-1);
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		z-index: 100;
	}

	.user-menu ul {
		list-style: none;
	}

	.user-menu li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.user-menu li:hover {
		background-color: var(--background-color-level-2);
	}

	.user-menu li.divider {
		height: 1px;
		background-color: var(--divider-color);
		padding: 0;
		margin: 0.25rem 0;
	}

	.user-menu li.logout {
		color: #ff6b6b;
	}

	/* Transitions for UI elements */
	.user-menu {
		transition:
			opacity 0.15s ease-in-out,
			transform 0.15s ease-in-out;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.top-bar {
			padding: 1rem;
			flex-wrap: wrap;
		}

		.middle-area {
			order: 3;
			margin: 1rem 0 0;
			max-width: 100%;
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		.nav-actions {
			gap: 0.75rem;
		}

		.username {
			max-width: 80px;
		}
	}
</style>

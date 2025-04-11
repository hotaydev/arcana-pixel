<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import "../global.css";

	// Mock data for games
	const games = [
		{
			id: "5406a634-170d-11f0-b19e-3e7bf1c93a1f",
			title: "Dragon's Lair",
			description: "A campaign through the ancient ruins of Drakmor",
			lastPlayed: "2025-04-08T14:30:00",
			players: 5,
			image: "/assets/game-covers/dragons-lair.jpg",
		},
		{
			id: "5b1f22fc-170d-11f0-80fc-3e7bf1c93a1f",
			title: "Cosmic Voyagers",
			description: "Space-faring adventure across distant galaxies",
			lastPlayed: "2025-04-05T19:45:00",
			players: 4,
			image: "/assets/game-covers/cosmic-voyagers.jpg",
		},
		{
			id: "5b72f8e6-170d-11f0-a3e7-3e7bf1c93a1f",
			title: "Shadows of Eldoria",
			description: "Dark fantasy campaign in the haunted kingdom",
			lastPlayed: "2025-03-28T20:00:00",
			players: 6,
			image: "/assets/game-covers/shadows-of-eldoria.jpg",
		},
	];

	// User profile mock data
	const user = {
		name: "Taylor Hoffmann",
	};

	// UI state
	let showUserMenu = false;
	let showImportDialog = false;
	let searchQuery = "";

	// Toggle user dropdown menu
	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	function handleDocumentClick(event: MouseEvent) {
		if (!event.composedPath().includes(document.querySelector(".user-profile")!)) {
			showUserMenu = false;
		}
	}

	document.addEventListener("click", handleDocumentClick);

	// Open import dialog
	function openImportDialog() {
		showImportDialog = true;
	}

	// Close import dialog
	function closeImportDialog() {
		showImportDialog = false;
	}

	// Format date to relative time
	function formatRelativeTime(dateString: string) {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return "Hoje";
		} else if (diffDays === 1) {
			return "Ontem";
		} else if (diffDays < 7) {
			return `${diffDays} dias atrás`;
		} else if (diffDays < 30) {
			const weeks = Math.floor(diffDays / 7);
			return `${weeks} ${weeks === 1 ? "semana" : "semanas"} atrás`;
		} else {
			return date.toLocaleDateString();
		}
	}

	// Handle create new game
	function createNewGame() {
		console.log("Creating new game");
		// In a real app, this would navigate to game creation page
	}

	// Handle open game
	function openGame(gameId: string) {
		console.log(`Opening game ${gameId}`);
		window.location.href = `/game/${gameId}`;
		// In a real app, this would navigate to the game
	}

	// Handle import game file
	function handleImportGame() {
		console.log("Importing game");
		closeImportDialog();
		// In a real app, this would process the imported file
	}

	// Filter games based on search query
	$: filteredGames = games.filter(
		(game) =>
			game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			game.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Show help panel
	function showHelp() {
		console.log("Showing help options");
		// In a real app, this would show documentation or Discord links
	}
</script>

<main>
	<!-- Top navigation bar -->
	<nav class="top-bar">
		<div class="logo">
			<img src="/assets/images/logo.webp" alt="Arcana Pixel" width="40" height="40" />
			<h1>Arcana Pixel</h1>
		</div>

		<div class="search-bar">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
					stroke="var(--text-color-dim)"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M21 21L16.65 16.65"
					stroke="var(--text-color-dim)"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input type="text" placeholder="Procurar campanhas..." bind:value={searchQuery} />
		</div>

		<div class="nav-actions">
			<button class="import-button" on:click={openImportDialog}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7 10L12 15L17 10"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 15V3"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span>Importar</span>
			</button>

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="user-profile" on:click={toggleUserMenu}>
				<div class="avatar">
					<!-- Fallback avatar if image fails to load -->
					<svg
						width="40"
						height="40"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12" r="10" fill="var(--background-color-level-3)" />
						<path
							d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
							fill="var(--background-color-level-4)"
						/>
						<path
							d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20"
							fill="var(--background-color-level-4)"
						/>
					</svg>
				</div>
				<span class="username">{user.name}</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 9L12 15L18 9"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<!-- User dropdown menu -->
				{#if showUserMenu}
					<div class="user-menu" transition:fade={{ duration: 150 }}>
						<ul>
							<li>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span>Perfil</span>
							</li>
							<li>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
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
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M16 17L21 12L16 7"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M21 12H9"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span>Sair</span>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Main content area -->
	<div class="content-container">
		<header class="page-header">
			<h1>Meus jogos</h1>
			<p>Gerencie suas sessões e campanhas</p>
		</header>

		<!-- Games grid -->
		<div class="games-grid">
			<!-- Create new game card -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="game-card new-game" on:click={createNewGame}>
				<div class="new-game-content">
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 5V19"
							stroke="var(--text-color-dim)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M5 12H19"
							stroke="var(--text-color-dim)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<p>Criar novo jogo</p>
				</div>
			</div>

			<!-- Game cards -->
			{#each filteredGames as game}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="game-card" on:click={() => openGame(game.id)}>
					<div class="game-image">
						<!-- Fallback image if game image fails to load -->
						<div class="game-image-fallback">
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
									stroke="var(--text-color-dim)"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
									stroke="var(--text-color-dim)"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</div>

					<div class="game-info">
						<h3>{game.title}</h3>
						<p class="game-description">{game.description}</p>

						<div class="game-meta">
							<div class="last-played">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M12 6V12L16 14"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span>{formatRelativeTime(game.lastPlayed)}</span>
							</div>

							<div class="players-count">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span>{game.players} jogadores</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Help button -->
	<button type="button" class="help-button" on:click={showHelp} aria-label="Help">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M9.09 9.00001C9.3251 8.33167 9.78915 7.76811 10.4 7.40914C11.0108 7.05016 11.7289 6.91894 12.4272 7.03872C13.1255 7.15849 13.7588 7.52153 14.2151 8.06353C14.6713 8.60554 14.9211 9.29153 14.92 10C14.92 12 11.92 13 11.92 13"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M12 17H12.01"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	<!-- Import game dialog -->
	{#if showImportDialog}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal-overlay" on:click={closeImportDialog}>
			<div class="modal" on:click|stopPropagation>
				<div class="modal-header">
					<h2>Importar sistema ou campanha</h2>
					<button
						type="button"
						class="close-button"
						on:click={closeImportDialog}
						aria-label="Close"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 6L6 18"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6 6L18 18"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</div>

				<div class="modal-content">
					<p>Selecione o arquivo do jogo para importar:</p>

					<div class="file-drop-area">
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16"
								stroke="var(--text-color-dim)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M16 8L12 4L8 8"
								stroke="var(--text-color-dim)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 4L12 16"
								stroke="var(--text-color-dim)"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<p>Arraste e solte seu arquivo aqui ou <span class="browse-text">procure</span></p>
						<input type="file" class="file-input" accept=".json,.jsonc" />
					</div>

					<div class="supported-formats">
						<p>Formatos suportados: .json, .jsonc</p>
					</div>
				</div>

				<div class="modal-footer">
					<button class="secondary-button" on:click={closeImportDialog}>Cancelar</button>
					<button class="primary-button" on:click={handleImportGame}>Importar</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	/* Main Layout */
	main {
		color: var(--text-color);
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
	}

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

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo h1 {
		color: var(--title-color);
		font-weight: 600;
		font-size: 1.5rem;
		margin: 0;
	}

	.search-bar {
		flex-grow: 1;
		max-width: 500px;
		margin: 0 2rem;
		position: relative;
	}

	.search-bar svg {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
	}

	.search-bar input {
		width: 100%;
		padding: 0.75rem 0.75rem 0.75rem 2.5rem;
		border-radius: 8px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		font-size: 0.95rem;
		transition: all 0.2s ease-in-out;
	}

	.search-bar input:focus {
		outline: none;
		border-color: var(--xp-bar);
		box-shadow: 0 0 0 2px rgba(0, 143, 231, 0.2);
	}

	.search-bar input::placeholder {
		color: var(--text-color-dim);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.import-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid var(--background-color-level-3);
		background-color: var(--background-color-level-0);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.import-button:hover {
		background-color: var(--background-color-level-1);
		border-color: var(--background-color-level-4);
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

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background-color: var(--background-color-level-1);
		display: flex;
		align-items: center;
		justify-content: center;
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

	/* Main Content Area */
	.content-container {
		flex: 1;
		padding: 2rem;
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
	}

	.page-header {
		margin-bottom: 2rem;
	}

	.page-header h1 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--title-color);
		margin-bottom: 0.5rem;
	}

	.page-header p {
		color: var(--text-color-dim);
		font-size: 1.1rem;
	}

	/* Games Grid */
	.games-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	/* Game Card Styles */
	.game-card {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid transparent;
		transition: all 0.3s ease;
		cursor: pointer;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.game-card:hover {
		transform: translateY(-5px);
		border-color: var(--xp-bar);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.game-image {
		aspect-ratio: 16/9;
		background-color: var(--background-color-level-2);
		position: relative;
		overflow: hidden;
	}

	.game-image-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color-level-2);
	}

	.game-info {
		padding: 1.25rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.game-info h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--title-color);
		margin-bottom: 0.5rem;
	}

	.game-description {
		color: var(--text-color-dim);
		font-size: 0.95rem;
		margin-bottom: 1.25rem;
		line-height: 1.5;
		flex-grow: 1;
	}

	.game-meta {
		display: flex;
		justify-content: space-between;
		color: var(--text-color-dim);
		font-size: 0.85rem;
	}

	.last-played,
	.players-count {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	/* Create New Game Card */
	.new-game {
		border: 2px dashed var(--background-color-level-3);
		background-color: rgba(255, 255, 255, 0.02);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: auto;
		min-height: 240px;
	}

	.new-game:hover {
		border-color: var(--xp-bar);
		background-color: rgba(0, 143, 231, 0.05);
	}

	.new-game-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		color: var(--text-color-dim);
		padding: 2rem;
		text-align: center;
	}

	.new-game-content p {
		font-weight: 500;
	}

	/* Help Button */
	.help-button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background-color: var(--xp-bar);
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		transition: all 0.2s ease;
		z-index: 90;
	}

	.help-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(3px);
	}

	.modal {
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		animation: modal-appear 0.3s ease-out;
		border: 1px solid var(--background-color-level-3);
	}

	@keyframes modal-appear {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem;
		border-bottom: 1px solid var(--divider-color);
	}

	.modal-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--title-color);
	}

	.close-button {
		background: none;
		border: none;
		color: var(--text-color-dim);
		cursor: pointer;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background-color: var(--background-color-level-2);
		color: var(--text-color);
	}

	.modal-content {
		padding: 1.5rem;
	}

	.modal-content p {
		margin-bottom: 1.25rem;
		color: var(--text-color);
	}

	.file-drop-area {
		border: 2px dashed var(--background-color-level-3);
		border-radius: 8px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		text-align: center;
		color: var(--text-color-dim);
		position: relative;
		transition: all 0.2s ease;
		margin-bottom: 1rem;
	}

	.file-drop-area:hover {
		border-color: var(--xp-bar);
		background-color: rgba(0, 143, 231, 0.05);
	}

	.browse-text {
		color: var(--xp-bar);
		font-weight: 500;
		cursor: pointer;
	}

	.file-input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: pointer;
	}

	.supported-formats {
		color: var(--text-color-dim);
		font-size: 0.85rem;
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		padding: 1.25rem;
		border-top: 1px solid var(--divider-color);
	}

	.secondary-button,
	.primary-button {
		padding: 0.65rem 1.25rem;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.secondary-button {
		background-color: transparent;
		border: 1px solid var(--background-color-level-3);
		color: var(--text-color);
	}

	.secondary-button:hover {
		background-color: var(--background-color-level-2);
	}

	.primary-button {
		background-color: var(--xp-bar);
		border: none;
		color: white;
	}

	.primary-button:hover {
		background-color: rgba(0, 143, 231, 0.8);
	}

	/* Animation for the cards */
	.game-card {
		opacity: 0;
		transform: translateY(20px);
		animation: card-appear 0.4s ease-out forwards;
	}

	@keyframes card-appear {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Stagger card animations */
	.game-card:nth-child(1) {
		animation-delay: 0.05s;
	}
	.game-card:nth-child(2) {
		animation-delay: 0.1s;
	}
	.game-card:nth-child(3) {
		animation-delay: 0.15s;
	}
	.game-card:nth-child(4) {
		animation-delay: 0.2s;
	}
	.game-card:nth-child(5) {
		animation-delay: 0.25s;
	}
	.game-card:nth-child(6) {
		animation-delay: 0.3s;
	}

	/* Transitions for UI elements */
	.modal,
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

		.search-bar {
			order: 3;
			margin: 1rem 0 0;
			max-width: 100%;
			width: 100%;
		}

		.content-container {
			padding: 1.5rem 1rem;
		}

		.games-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			gap: 1rem;
		}

		.help-button {
			bottom: 1.5rem;
			right: 1.5rem;
			width: 3rem;
			height: 3rem;
		}
	}

	@media (max-width: 480px) {
		.nav-actions {
			gap: 0.75rem;
		}

		.import-button span {
			display: none;
		}

		.import-button {
			padding: 0.5rem;
		}

		.username {
			max-width: 80px;
		}

		.games-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

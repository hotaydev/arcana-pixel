<script lang="ts">
	import { Toaster } from "svelte-5-french-toast";
	import "../../global.css";
	import { onMount } from "svelte";

	// State for login/register toggle
	let isLogin = true;

	// State for form submission
	let email = "";
	let isSubmitting = false;
	let emailSent = false;

	// Animation state
	let mounted = false;

	// Toggle between login and register views
	function toggleView() {
		isLogin = !isLogin;
	}

	// Handle form submission (mock)
	function handleSubmit() {
		if (!email) return;

		isSubmitting = true;

		// Simulate API call
		setTimeout(() => {
			emailSent = true;
			isSubmitting = false;
		}, 1500);
	}

	// Social login handlers (mock)
	function loginWithGoogle() {
		console.log("Login with Google");
		window.location.href = "/";
	}

	function loginWithGithub() {
		console.log("Login with GitHub");
		window.location.href = "/";
	}

	onMount(() => {
		// Trigger animation after component mounts
		setTimeout(() => {
			mounted = true;
		}, 100);
	});
</script>

<main>
	<div class="left-panel">
		<div class="logo-container">
			<img src="/assets/images/logo.webp" alt="Arcana Pixel" width="40" height="40" />
			<h1>Arcana Pixel</h1>
		</div>
		<div class="hero-text">
			<h2>Jogue com confiança</h2>
			<p>
				Seu assistente digital para rolagem de dados, fichas de personagens e gerenciamento de
				aventuras.
			</p>
		</div>
		<div class="attribution attribution-hero">
			<p>© {new Date().getFullYear()} Arcana Pixel. Todos os direitos reservados.</p>
		</div>
	</div>

	<div class="right-panel card">
		<div class="auth-container">
			<div class="auth-header">
				<h2>{isLogin ? "Olá viajante" : "Junte-se a nós"}</h2>
				<p>
					{isLogin
						? "Entre para continuar suas aventuras"
						: "Crie uma conta para iniciar sua próxima aventura"}
				</p>
			</div>

			{#if !emailSent}
				<div class="auth-options">
					<button class="social-button google" on:click={loginWithGoogle}>
						<svg width="20" height="20" viewBox="0 0 24 24">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						<span>Continuar com o Google</span>
					</button>

					<button class="social-button github" on:click={loginWithGithub}>
						<svg width="20" height="20" viewBox="0 0 24 24">
							<path
								d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
								fill="currentColor"
							/>
						</svg>
						<span>Continuar com o GitHub</span>
					</button>

					<div class="divider">
						<span>ou</span>
					</div>

					<form on:submit|preventDefault={handleSubmit}>
						<div class="form-group">
							<label for="email">E-mail</label>
							<input
								type="email"
								id="email"
								placeholder="voce@exemplo.com"
								bind:value={email}
								required
							/>
						</div>

						<button type="submit" class="submit-button" disabled={isSubmitting || !email}>
							{#if isSubmitting}
								<div class="spinner"></div>
							{:else}
								Enviar link mágico
							{/if}
						</button>
					</form>
				</div>
			{:else}
				<div class="email-sent">
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
							stroke="var(--life-bar)"
							stroke-width="2"
						/>
						<path
							d="M8 12L11 15L16 9"
							stroke="var(--life-bar)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<h3>Verifique sua caixa de entrada</h3>
					<p>Enviamos um link mágico para <strong>{email}</strong></p>
					<p class="small">Clique no link no e-mail para fazer login</p>

					<button class="secondary-button" on:click={() => (emailSent = false)}>
						Tentar de outro jeito
					</button>
				</div>
			{/if}

			<div class="auth-footer">
				<p>
					{isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
					<button class="text-button" on:click={toggleView}>
						{isLogin ? "Crie uma" : "Entre"}
					</button>
				</p>
			</div>
		</div>
	</div>

	<div class="attribution attribution-panel">
		<p>© {new Date().getFullYear()} Arcana Pixel. Todos os direitos reservados.</p>
	</div>

	<Toaster />
</main>

<style>
	main {
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;

		padding: 2rem;
		gap: 2rem;
		overflow: hidden;
	}

	.left-panel {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem;
		color: var(--text-color);
	}

	.logo-container {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.logo-container h1 {
		font-weight: 700;
		font-size: 2rem;
		color: var(--title-color);
	}

	.hero-text {
		margin-top: 4rem;
	}

	.hero-text h2 {
		font-size: 3.5rem;
		font-weight: 700;
		color: var(--title-color);
		margin-bottom: 1.5rem;
		line-height: 1.1;
	}

	.hero-text p {
		font-size: 1.3rem;
		line-height: 1.6;
		color: var(--text-color-dim);
		max-width: 90%;
	}

	.attribution {
		font-size: 0.9rem;
		color: var(--text-color-dim);
	}

	.attribution-panel {
		display: none;
	}

	.right-panel {
		width: 30rem;
		max-width: 100%;
		min-height: 36rem;
		display: flex;
		flex-direction: column;
		padding: 2.5rem;
		box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.25);
	}

	.auth-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.auth-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.auth-header h2 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--title-color);
		margin-bottom: 0.5rem;
	}

	.auth-header p {
		color: var(--text-color-dim);
	}

	.auth-options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.social-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		width: 100%;
		padding: 0.9rem;
		border-radius: 8px;
		border: 1px solid var(--divider-color);
		background: var(--background-color-level-1);
		color: var(--text-color);
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.social-button:hover {
		background: var(--background-color-level-2);
		border-color: var(--border-color);
	}

	.social-button svg {
		flex-shrink: 0;
	}

	.divider {
		display: flex;
		align-items: center;
		margin: 1.5rem 0;
		color: var(--text-color-dim);
	}

	.divider::before,
	.divider::after {
		content: "";
		flex: 1;
		height: 1px;
		background: var(--divider-color);
	}

	.divider span {
		padding: 0 1rem;
		font-size: 0.9rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.form-group label {
		font-size: 0.9rem;
		color: var(--text-color);
	}

	.form-group input {
		padding: 0.9rem;
		border-radius: 8px;
		border: 1px solid var(--divider-color);
		background: var(--background-color-level-2);
		color: var(--text-color);
		font-size: 1rem;
		transition: all 0.2s ease;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--xp-bar);
	}

	.form-group input::placeholder {
		color: var(--text-color-dim);
	}

	.submit-button {
		width: 100%;
		padding: 0.9rem;
		border-radius: 8px;
		border: none;
		background: var(--xp-bar);
		color: white;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.submit-button:hover:not(:disabled) {
		opacity: 0.9;
	}

	.submit-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.spinner {
		width: 1.2rem;
		height: 1.2rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: white;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.email-sent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 100%;
		gap: 1rem;
		margin: 2rem 0;
	}

	.email-sent h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--title-color);
		margin-top: 1rem;
	}

	.email-sent p {
		color: var(--text-color);
		max-width: 80%;
	}

	.email-sent .small {
		font-size: 0.9rem;
		color: var(--text-color-dim);
	}

	.secondary-button {
		margin-top: 1.5rem;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		border: 1px solid var(--divider-color);
		background: var(--background-color-level-2);
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.secondary-button:hover {
		background: var(--background-color-level-3);
	}

	.auth-footer {
		margin-top: auto;
		text-align: center;
		color: var(--text-color-dim);
	}

	.text-button {
		background: none;
		border: none;
		color: var(--xp-bar);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		margin-left: 0.5rem;
	}

	.text-button:hover {
		text-decoration: underline;
	}

	/* Responsive adjustments */
	@media (max-width: 1100px) {
		main {
			flex-direction: column;
			padding: 1rem;
		}

		.left-panel {
			width: 100%;
			height: auto;
			padding: 1.5rem 1rem;
		}

		.hero-text,
		.attribution-hero {
			display: none;
		}

		.attribution-panel {
			display: flex;
		}

		.right-panel {
			width: 100%;
			max-width: 500px;
		}
	}

	@media (max-width: 600px) {
		.right-panel {
			padding: 1.5rem;
		}
	}
</style>

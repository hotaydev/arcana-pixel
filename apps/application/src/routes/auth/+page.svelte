<script lang="ts">
	import { Toaster } from "svelte-5-french-toast";
	import GoogleIcon from "$lib/components/icons/google.svelte";
	import GithubIcon from "$lib/components/icons/github.svelte";
	import ArcanaLogo from "$lib/components/common/logo.svelte";
	import { loginWithEmailMagicLink, loginWithGithub, loginWithGoogle } from "$lib/services/auth";
	import { CircleCheck } from "@lucide/svelte";

	// State for login/register toggle
	let isLogin = $state(true);

	// State for form submission
	let email = $state("");
	let isSubmitting = $state(false);
	let emailSent = $state(false);

	const copyright = `© ${new Date().getFullYear()} Arcana Pixel. Todos os direitos reservados.`;

	// Handle form submission (mock)
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!email) return;

		isSubmitting = true;

		try {
			await loginWithEmailMagicLink();
			emailSent = true;
		} catch (error) {
			emailSent = false;
		}

		isSubmitting = false;
	}
</script>

<main>
	<div class="left-panel">
		<ArcanaLogo />

		<div class="hero-text">
			<h2>Jogue com confiança</h2>
			<p>
				Seu assistente digital para rolagem de dados, fichas de personagens e gerenciamento de
				aventuras.
			</p>
		</div>
		<div class="attribution attribution-hero">
			<p>{copyright}</p>
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
					<button class="social-button google" onclick={loginWithGoogle}>
						<GoogleIcon />
						<span>Continuar com o Google</span>
					</button>

					<button class="social-button github" onclick={loginWithGithub}>
						<GithubIcon />
						<span>Continuar com o GitHub</span>
					</button>

					<div class="divider">
						<span>ou</span>
					</div>

					<form onsubmit={handleSubmit}>
						<div class="form-group">
							<label for="email">E-mail</label>
							<input
								type="email"
								id="email"
								placeholder="nome@exemplo.com"
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
					<CircleCheck size={48} color="var(--life-bar)" />
					<h3>Verifique sua caixa de entrada</h3>
					<p>Enviamos um link mágico para <strong>{email}</strong></p>
					<p class="small">Clique no link no e-mail para fazer login</p>

					<button class="secondary-button" onclick={() => (emailSent = false)}>
						Tentar de outro jeito
					</button>
				</div>
			{/if}

			<div class="auth-footer">
				<p>
					{isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
					<button
						class="text-button"
						onclick={() => {
							isLogin = !isLogin;
						}}
					>
						{isLogin ? "Crie uma" : "Entre"}
					</button>
				</p>
			</div>
		</div>
	</div>

	<div class="attribution attribution-panel">
		<p>{copyright}</p>
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
		border-color: var(--primary-color);
	}

	.form-group input::placeholder {
		color: var(--text-color-dim);
	}

	.submit-button {
		width: 100%;
		padding: 0.9rem;
		border-radius: 8px;
		border: none;
		background: var(--primary-color);
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
		color: var(--primary-color);
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

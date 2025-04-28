<script lang="ts">
	import { DOCUMENTATION_LINK, SUPPORTED_SYSTEMS } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section id="systems" class="section">
	<div class="container">
		<div class="section-header">
			<h2>{@html m.supported_systems_title()}</h2>
			<p>{m.supported_systems_description()}</p>
		</div>

		<div class="systems-grid">
			{#each SUPPORTED_SYSTEMS as system (system.name)}
				<div class="system-card">
					<div class="system-status">{system.status}</div>
					<div class="system-logo">
						<img src={system.logo} alt="{system.name} logo" />
					</div>
					<h3>{system.name}</h3>
					<p>{system.description}</p>
					<div class="creature-wrapper">
						<div class="creature-image">
							<img src={system.creature} alt={system.name} />
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="extensibility-message">
			<div class="message-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" y1="8" x2="12" y2="12"></line>
					<line x1="12" y1="16" x2="12.01" y2="16"></line>
				</svg>
			</div>
			<p>
				{@html m.supported_systems_extend_with_your_own_systems({ link: DOCUMENTATION_LINK })}
			</p>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		overflow: hidden;
		padding: 6rem 0;
	}

	.section-header {
		text-align: center;
		max-width: 700px;
		margin: 0 auto 4rem;
		position: relative;
		z-index: 3;
	}

	.section-header h2 {
		font-size: clamp(2rem, 4vw, 3rem);
		margin-bottom: 1rem;
	}

	.section-header p {
		font-size: 1.2rem;
		color: var(--gray);
	}

	.systems-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
		position: relative;
		z-index: 2;
	}

	.system-card {
		background-color: var(--dark-surface);
		border-radius: 10px;
		padding: 2.6rem 2rem 2rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		min-height: 450px;
		overflow: hidden;
		background-image: linear-gradient(
			to bottom right,
			var(--dark-surface),
			var(--dark-surface) 60%,
			rgba(94, 18, 157, 0.1)
		);
	}

	.system-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px -15px rgba(94, 18, 157, 0.4);
		border-color: rgba(167, 129, 235, 0.3);
		background-image: linear-gradient(
			to bottom right,
			var(--dark-surface),
			var(--dark-surface) 50%,
			rgba(94, 18, 157, 0.25)
		);
	}

	.system-card:hover .creature-image {
		opacity: 1;
		filter: drop-shadow(0 0 60px var(--primary));
	}

	.system-card:hover .creature-wrapper::after {
		opacity: 0.35;
	}

	.system-status {
		position: absolute;
		top: 0.8rem;
		right: 1rem;
		padding: 0.2rem 0.8rem;
		background: var(--primary);
		color: white;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 500;
		z-index: 10;
	}

	.system-logo {
		width: 100%;
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		position: relative;
		z-index: 5;
	}

	.system-logo img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.system-card h3 {
		text-align: center;
		margin-bottom: 1rem;
		font-size: 1.4rem;
	}

	.system-card p {
		color: var(--gray);
		line-height: 1.6;
		margin-bottom: 1rem;
		flex-grow: 1;
		position: relative;
		z-index: 5;
	}

	.creature-wrapper {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		overflow: hidden;
	}

	.creature-wrapper::after {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 300%;
		height: 300%;
		background: radial-gradient(
			ellipse at bottom right,
			var(--primary-transparent),
			transparent 90%
		);
		opacity: 0.15;
		transition: opacity 0.5s ease;
	}

	.creature-image {
		position: absolute;
		bottom: -20px;
		right: -20px;
		width: 180px;
		height: 180px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		opacity: 0.6;
		transition: all 0.5s ease;
		/* filter: drop-shadow(0 0 0 var(--primary)); */
	}

	.creature-image img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.extensibility-message {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 3rem;
		padding: 1.5rem;
		background-color: var(--dark-surface);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
	}

	.message-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--primary-transparent);
		color: var(--primary-light);
		flex-shrink: 0;
	}

	.extensibility-message p {
		margin: 0;
		line-height: 1.5;
	}

	.extensibility-message :global(a) {
		color: var(--primary-light);
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.extensibility-message :global(a:hover) {
		text-decoration: underline;
	}

	@media (max-width: 1200px) {
		.systems-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.systems-grid {
			grid-template-columns: 1fr;
		}

		.system-card {
			min-height: 400px;
		}
	}
</style>

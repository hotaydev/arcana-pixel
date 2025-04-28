<script lang="ts">
	import { ROADMAP_MILESTONES, SIGNUP_API_URL } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale } from '$lib/paraglide/runtime';
	let email = '';
	let submitted = false;

	function handleSubmit() {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (email.trim() !== '' && emailRegex.test(email)) {
			const currentLang = getLocale();

			fetch(SIGNUP_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					lang: currentLang
				})
			})
				.then((response) => {
					if (response.ok) {
						submitted = true;
					} else {
						console.error('Failed to submit email');
					}
				})
				.catch((error) => {
					console.error('Error submitting email:', error);
				});
		}
	}

	const launchDate = new Date('2025-06-25');
</script>

<section id="roadmap" class="section">
	<div class="container">
		<div class="section-header">
			<h2>{@html m.roadmap_title()}</h2>
			<p>
				{m.roadmap_description()}
			</p>
		</div>

		<div class="timeline">
			{#each ROADMAP_MILESTONES as milestone, index (milestone.title)}
				<div class="milestone {milestone.active ? 'active' : ''}">
					<div class="milestone-icon">
						<milestone.icon />
					</div>
					<div class="milestone-content">
						<div class="milestone-info">
							<h3>{milestone.title}</h3>
							<span class="milestone-date">{milestone.date}</span>
						</div>
						<p>{milestone.description}</p>
					</div>
					{#if index < ROADMAP_MILESTONES.length - 1}
						<div class="timeline-line"></div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="cta-wrapper" id="beta">
			<div class="cta-container">
				<div class="cta-content">
					<h2>{@html m.roadmap_beta_title()}</h2>
					<p>
						{m.roadmap_beta_description()}
					</p>

					{#if !submitted}
						<form class="beta-form" on:submit|preventDefault={handleSubmit}>
							<input
								type="email"
								placeholder={m.roadmap_beta_email_placeholder()}
								bind:value={email}
								required
							/>
							<button type="submit" class="btn-primary">{m.roadmap_beta_button()}</button>
						</form>
					{:else}
						<div class="success-message">
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
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
							<p>{m.roadmap_beta_success_title()}</p>
						</div>
					{/if}

					<div class="beta-info">
						<div class="info-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
							</svg>
							<span>{m.roadmap_beta_limited_spots()}</span>
						</div>
						<div class="info-item">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
								<line x1="16" y1="2" x2="16" y2="6"></line>
								<line x1="8" y1="2" x2="8" y2="6"></line>
								<line x1="3" y1="10" x2="21" y2="10"></line>
							</svg>
							<span
								>{m.roadmap_beta_launch()}
								{launchDate.toLocaleDateString(undefined, {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}</span
							>
						</div>
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
		padding: 5rem 0;
	}

	.section-header {
		text-align: center;
		max-width: 700px;
		margin: 0 auto 5rem;
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

	/* Timeline styling */
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		position: relative;
		z-index: 2;
		max-width: 900px;
		margin: 0 auto;
	}

	.milestone {
		display: flex;
		gap: 2rem;
		position: relative;
	}

	.milestone-icon {
		background-color: var(--dark-surface);
		border: 2px solid var(--gray);
		min-width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--gray);
		position: relative;
		z-index: 3;
		transition: all 0.3s ease;
	}

	.milestone.active .milestone-icon {
		background: var(--gradient);
		border-color: var(--primary-light);
		color: white;
		box-shadow: 0 0 20px rgba(94, 18, 157, 0.5);
	}

	.milestone-content {
		flex: 1;
		padding: 1.5rem;
		background-color: var(--dark-surface);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		position: relative;
		transition: all 0.3s ease;
		z-index: 2;
	}

	.milestone.active .milestone-content {
		border-color: rgba(167, 129, 235, 0.3);
		box-shadow: 0 10px 25px -15px rgba(94, 18, 157, 0.4);
		background-image: linear-gradient(
			to bottom right,
			var(--dark-surface),
			var(--dark-surface) 60%,
			rgba(94, 18, 157, 0.1)
		);
	}

	.milestone-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.milestone-info h3 {
		font-size: 1.4rem;
		margin: 0;
	}

	.milestone-date {
		font-size: 0.9rem;
		color: var(--gray);
		font-weight: 500;
	}

	.milestone-content p {
		color: var(--gray);
		line-height: 1.6;
		margin: 0;
	}

	.timeline-line {
		position: absolute;
		top: 60px;
		left: 30px;
		width: 2px;
		height: calc(100% + 2rem);
		background: var(--gray);
		opacity: 0.2;
		z-index: 1;
	}

	.milestone.active .timeline-line {
		background: var(--primary-light);
		opacity: 0.5;
	}

	/* CTA Section */

	.cta-wrapper {
		padding: 6rem 0;
	}

	.cta-container {
		position: relative;
		z-index: 3;
		background-color: var(--dark-surface);
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 900px;
		margin: 0 auto;
	}

	.cta-content {
		padding: 3rem;
		text-align: center;
	}

	.cta-content h2 {
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
	}

	.cta-content p {
		color: var(--gray);
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.beta-form {
		display: flex;
		gap: 1rem;
		max-width: 600px;
		margin: 0 auto 2rem;
	}

	.beta-form input {
		flex: 1;
		height: 50px;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		padding: 0 1.5rem;
		color: var(--light);
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.beta-form input:focus {
		outline: none;
		border-color: var(--primary-light);
		background-color: rgba(255, 255, 255, 0.07);
	}

	.beta-form button {
		height: 50px;
		padding: 0 2rem;
		border-radius: 5px;
		font-weight: 500;
		font-size: 1rem;
		cursor: pointer;
		border: none;
		transition: all 0.3s ease;
	}

	.success-message {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		background-color: rgba(73, 169, 95, 0.1);
		border: 1px solid rgba(73, 169, 95, 0.2);
		border-radius: 5px;
		color: #4caf50;
		margin-bottom: 2rem;
	}

	.beta-info {
		display: flex;
		justify-content: center;
		gap: 2rem;
		color: var(--gray);
	}

	.info-item {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.milestone {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.milestone-icon {
			min-width: 50px;
			height: 50px;
			align-self: flex-start;
			margin-left: 0;
			z-index: 3;
		}

		.timeline-line {
			left: 25px;
			top: 50px;
			z-index: 1;
		}

		.timeline {
			padding-left: 1rem;
		}

		.milestone-content {
			width: 100%;
			margin-left: 0;
			z-index: 2;
		}

		.beta-form {
			flex-direction: column;
			gap: 1rem;
		}

		.cta-content {
			padding: 2rem 1.5rem;
		}

		.beta-info {
			flex-direction: column;
			gap: 1rem;
		}

		.beta-form input {
			padding: 1rem 1.5rem;
		}

		.section {
			padding: 7rem 0 3rem;
		}
	}
</style>

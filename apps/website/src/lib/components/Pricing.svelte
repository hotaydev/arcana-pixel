<script lang="ts">
	import { GITHUB_LINK } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';
	import { CheckIcon } from './icons';

	interface Plan {
		name: string;
		price: string;
		description: string;
		features: string[];
		cta: string;
		popular?: boolean;
	}

	const plans: Plan[] = [
		{
			name: m.pricing_free_title(),
			price: '0',
			description: m.pricing_free_description(),
			features: [
				m.pricing_feature_all_core_features(),
				m.pricing_feature_up_to_characters_per_user({ count: 5 }),
				m.pricing_features_use_any_community_and_official_content(),
				m.pricing_features_up_to_campaigns({ count: 1 }),
				m.pricing_features_up_to_players({ count: 6 })
			],
			cta: m.pricing_get_started()
		},
		{
			name: m.pricing_adventurer_title(),
			price: '5',
			description: m.pricing_adventurer_description(),
			features: [
				m.pricing_feature_all_core_features(),
				m.pricing_feature_up_to_characters_per_user({ count: 50 }),
				m.pricing_features_up_to_storage({ count: 1 }),
				m.pricing_features_up_to_campaigns({ count: 5 }),
				m.pricing_features_up_to_players({ count: 6 }),
				m.pricing_features_group_checkout()
			],
			cta: m.pricing_choose_plan(),
			popular: true
		},
		{
			name: m.pricing_legendary_title(),
			price: '25',
			description: m.pricing_legendary_description(),
			features: [
				m.pricing_feature_all_core_features(),
				m.pricing_features_unlimited_characters(),
				m.pricing_features_up_to_storage({ count: 10 }),
				m.pricing_features_unlimited_campaigns(),
				m.pricing_features_up_to_players({ count: 10 }),
				m.pricing_features_streaming_tools()
			],
			cta: m.pricing_choose_plan()
		}
	];

	let activeIndex: number = 0;
	let carouselContainer: HTMLElement | undefined;

	onMount(() => {
		if (!carouselContainer) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.getAttribute('data-index') || '0');
						activeIndex = index;
					}
				});
			},
			{
				root: carouselContainer,
				threshold: 0.6
			}
		);

		const cards = carouselContainer.querySelectorAll('.price-card');
		cards.forEach((card) => observer.observe(card));

		return () => {
			cards.forEach((card) => observer.unobserve(card));
		};
	});

	function scrollToCard(index: number) {
		const cards = carouselContainer?.querySelectorAll('.price-card');
		if (cards && cards[index]) {
			cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
			activeIndex = index;
		}
	}
</script>

<section id="pricing" class="section">
	<div class="container">
		<div class="section-header">
			<h2>{@html m.pricing_title()}</h2>
			<p>{m.pricing_description()}</p>
		</div>

		<div class="pricing-carousel-wrapper">
			<div class="pricing-carousel" bind:this={carouselContainer}>
				{#each plans as plan, i (plan.name)}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						class="price-card {plan.popular ? 'popular' : ''}"
						data-index={i}
						onclick={() => scrollToCard(i)}
					>
						{#if plan.popular}
							<div class="popular-badge">{m.pricing_popular()}</div>
						{/if}
						<div class="price-header">
							<h3>{plan.name}</h3>
							<div class="price">
								<span class="currency">{m.pricing_currency()}</span>
								<span class="amount">{plan.price}</span>
								<span class="period">/{m.pricing_period()}</span>
							</div>
							<p>{plan.description}</p>
						</div>

						<ul class="features-list">
							{#each plan.features as feature (feature)}
								<li>
									<CheckIcon />
									{feature}
								</li>
							{/each}
						</ul>

						<a href={localizeHref('/#beta')} class={plan.popular ? 'btn-primary' : 'btn-secondary'}>
							{plan.cta}
						</a>
					</div>
				{/each}
			</div>

			<div class="carousel-indicators">
				{#each plans as plan, i (plan.name)}
					<button
						class="indicator {i === activeIndex ? 'active' : ''}"
						onclick={() => scrollToCard(i)}
						aria-label={m.go_to_plan_slide({ plan: plans[i].name })}
					></button>
				{/each}
			</div>
		</div>

		<div class="pricing-note">
			<p>{m.pricing_note()}</p>
			<p>
				{@html m.pricing_note_self_hosting({ link: GITHUB_LINK })}
			</p>
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		overflow: hidden;
		user-select: auto;
	}

	.pricing-carousel-wrapper {
		position: relative;
		z-index: 2;
	}

	.pricing-carousel {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* Internet Explorer/Edge */
		gap: 2rem;
		padding: 3rem 0 1.5rem;
	}

	.pricing-carousel::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}

	.price-card {
		background-color: var(--dark-surface);
		border-radius: 10px;
		padding: 2.5rem 2rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 0 0 auto;
		width: 90%;
		max-width: 400px;
		scroll-snap-align: center;
		margin-bottom: 1rem;
	}

	/* Medium screens - show about 1.5 cards */
	@media (min-width: 768px) {
		.price-card {
			width: calc(65% - 1rem);
		}
	}

	/* Large screens - show multiple cards */
	@media (min-width: 1200px) {
		.price-card {
			width: calc(33.333% - 1.333rem);
		}
	}

	.price-card.popular {
		border: 1px solid var(--primary-light);
		z-index: 1;
		box-shadow: 0 20px 40px -15px rgba(94, 18, 157, 0.3);
	}

	@media (min-width: 992px) {
		.price-card.popular {
			transform: scale(1.05);
		}
	}

	.price-card:hover {
		transform: translateY(-5px);
	}

	.price-card.popular:hover {
		transform: translateY(-5px);
	}

	@media (min-width: 992px) {
		.price-card.popular:hover {
			transform: scale(1.05) translateY(-5px);
		}
	}

	.carousel-indicators {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	/* Hide indicators on large screens where all cards are visible */
	@media (min-width: 1200px) {
		.carousel-indicators {
			display: none;
		}
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.2);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.indicator.active {
		background-color: var(--primary-light);
		width: 14px;
		height: 14px;
	}

	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--gradient);
		color: white;
		font-size: 0.8rem;
		font-weight: 600;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		white-space: nowrap;
	}

	.price-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.price-header h3 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.price {
		display: flex;
		align-items: baseline;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.currency {
		font-size: 1.5rem;
		font-weight: 600;
		margin-right: 0.2rem;
	}

	.amount {
		font-size: 3.5rem;
		font-weight: 700;
		line-height: 1;
	}

	.period {
		font-size: 1rem;
		color: var(--gray);
		margin-left: 0.5rem;
	}

	.price-header p {
		color: var(--gray);
		font-size: 0.95rem;
	}

	.features-list {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		flex-grow: 1;
	}

	.features-list li {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		color: var(--light);
	}

	.price-card a {
		text-align: center;
		display: block;
		width: 100%;
	}

	.pricing-note {
		text-align: center;
		margin-top: 2rem;
		color: var(--gray);
		font-size: 0.9rem;
		position: relative;
		z-index: 2;
	}

	.pricing-note p {
		margin: 0.5rem 0;
	}

	.pricing-note :global(a) {
		color: var(--primary-light);
		transition: all 0.3s ease;
	}

	.pricing-note :global(a:hover) {
		color: var(--light);
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
</style>

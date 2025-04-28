<script lang="ts">
	import {
		MapIcon,
		CharacterIcon,
		DiceIcon,
		AudioIcon,
		LibraryIcon,
		CrossPlatformIcon
	} from './icons';
	import { m } from '$lib/paraglide/messages.js';

	const features = [
		{
			title: m.features_interactive_maps_title(),
			description: m.features_interactive_maps_description(),
			icon: MapIcon
		},
		{
			title: m.features_character_management_title(),
			description: m.features_character_management_description(),
			icon: CharacterIcon
		},
		{
			title: m.features_advanced_dice_title(),
			description: m.features_advanced_dice_description(),
			icon: DiceIcon
		},
		{
			title: m.features_immersive_effects_title(),
			description: m.features_immersive_effects_description(),
			icon: AudioIcon
		},
		{
			title: m.features_asset_library_title(),
			description: m.features_asset_library_description(),
			icon: LibraryIcon
		},
		{
			title: m.features_cross_platform_title(),
			description: m.features_cross_platform_description(),
			icon: CrossPlatformIcon
		}
	];
</script>

<section id="features" class="section">
	<div class="container">
		<div class="section-header">
			<h2>{@html m.features_title()}</h2>
			<p>{m.features_description()}</p>
		</div>

		<div class="features-grid">
			{#each features as feature (feature.title)}
				<div class="feature-card">
					<div class="feature-icon">
						<feature.icon />
					</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.section {
		position: relative;
		overflow: hidden;
		user-select: auto;
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
		user-select: auto;
	}

	.section-header p {
		font-size: 1.2rem;
		color: var(--gray);
		user-select: auto;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		position: relative;
		z-index: 2;
	}

	.feature-card {
		background-color: var(--dark-surface);
		border-radius: 10px;
		padding: 2rem;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 30px -15px rgba(94, 18, 157, 0.3);
		border-color: rgba(167, 129, 235, 0.2);
	}

	.feature-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		background: var(--gradient);
		border-radius: 12px;
		margin-bottom: 1.5rem;
		color: white;
	}

	.feature-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.feature-card p {
		color: var(--gray);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
		}

		.feature-card {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}

		.feature-icon {
			margin-bottom: 0;
			margin-right: 1rem;
		}

		.feature-card h3 {
			margin-bottom: 0.5rem;
			flex: 1;
		}

		.feature-card p {
			width: 100%;
			margin-top: 1rem;
		}
	}
</style>

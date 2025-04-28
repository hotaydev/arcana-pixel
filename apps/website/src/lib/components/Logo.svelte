<script lang="ts">
	export let size: '' | 'small' | 'large' = '';
</script>

<div class="logo-container {size}">
	<img src="/assets/images/dices/pixel-d20.webp" alt="D20" class="logo-icon" />
	<span class="logo-text">Arcana Pixel</span>
</div>

<style>
	.logo-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-icon {
		width: 32px;
		height: 32px;
		flex-shrink: 0;
	}

	.small .logo-icon {
		width: 24px;
		height: 24px;
	}

	.large .logo-icon {
		width: 40px;
		height: 40px;
	}

	.logo-text {
		font-weight: 700;
		color: white;
	}

	.small .logo-text {
		font-size: 1.2rem;
	}

	.large .logo-text {
		font-size: 1.8rem;
	}
</style>

<script>
	import { CircleHelp } from "@lucide/svelte";
</script>

<!-- Help button -->
<button type="button" class="help-button" aria-label="Help">
	<CircleHelp size={24} color="white" />
</button>

<style>
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

	/* Media Queries */
	@media (max-width: 768px) {
		.help-button {
			bottom: 1.5rem;
			right: 1.5rem;
			width: 3rem;
			height: 3rem;
		}
	}
</style>

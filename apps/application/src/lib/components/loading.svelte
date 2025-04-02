<script lang="ts">
	export let size: number = 4;
</script>

<div class="load" style="width: {size}rem; height: {size}rem;"></div>

<style>
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.load {
		border: solid 5px var(--background-color-level-4);
		border-radius: 50%;
		border-right-color: transparent;
		border-bottom-color: transparent;
		-webkit-transition: all 0.5s ease-in;
		-webkit-animation-name: rotate;
		-webkit-animation-duration: 1s;
		-webkit-animation-iteration-count: infinite;
		-webkit-animation-timing-function: linear;

		transition: all 0.5s ease-in;
		animation-name: rotate;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
</style>

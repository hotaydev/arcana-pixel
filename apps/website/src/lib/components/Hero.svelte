<script lang="ts">
	import { onMount } from 'svelte';
	import { GITHUB_LINK, DISCORD_LINK } from '$lib/variables';
	import { m } from '$lib/paraglide/messages.js';
	import { GithubIcon } from './icons';
	import DiscordIcon from './icons/social/discord.svelte';
	import { fly } from 'svelte/transition';

	let isVisible = false;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animationFrame: number;

	interface Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		color: string;
		opacity: number;
	}

	function createParticles() {
		const particleCount = window.innerWidth < 768 ? 30 : 50;
		particles = [];

		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 3 + 1,
				speedX: Math.random() * 0.5 - 0.25,
				speedY: Math.random() * 0.5 - 0.25,
				color: Math.random() > 0.5 ? '#a781eb' : '#6366f1',
				opacity: Math.random() * 0.5 + 0.2
			});
		}
	}

	function animate() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach((particle) => {
			particle.x += particle.speedX;
			particle.y += particle.speedY;

			if (particle.x < 0 || particle.x > canvas.width) {
				particle.speedX *= -1;
			}

			if (particle.y < 0 || particle.y > canvas.height) {
				particle.speedY *= -1;
			}

			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fillStyle =
				particle.color +
				Math.floor(particle.opacity * 255)
					.toString(16)
					.padStart(2, '0');
			ctx.fill();
		});

		animationFrame = requestAnimationFrame(animate);
	}

	function handleResize() {
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			createParticles();
		}
	}

	onMount(() => {
		isVisible = true;

		if (canvas) {
			ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			createParticles();
			animate();

			window.addEventListener('resize', handleResize);
		}

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});
</script>

<section class="hero">
	{#if isVisible}
		<div class="hero-center" in:fly={{ y: 20, duration: 800, opacity: 0 }}>
			<div class="hero-content">
				<h1>
					{@html m.landing_title()}
				</h1>
				<p>
					{m.landing_description()}
				</p>
				<div class="hero-buttons">
					<a href="#features" class="btn-primary">{m.landing_explore_features()}</a>
					<a href={GITHUB_LINK} class="btn-secondary" style="padding: 0.75rem 1rem !important;">
						<GithubIcon size={24} />
					</a>
					<a href={DISCORD_LINK} class="btn-secondary" aria-label="Discord">
						<DiscordIcon size={30} />
					</a>
				</div>
				<div class="hero-stats">
					<div class="stat">
						<span class="gradient-text">100%</span>
						<p>{m.open_source()}</p>
					</div>
					<div class="stat">
						<span class="gradient-text">{m.free()}</span>
						<p>{m.forever_plan()}</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
	<div class="hero-bg">
		<canvas bind:this={canvas} class="particles-canvas"></canvas>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: 8rem 0 5rem;
		user-select: auto;
		isolation: isolate;
	}

	.btn-secondary {
		padding: 0.75rem !important;
		/* display: flex;
		align-items: center;
		justify-content: center; */
	}

	.hero-center {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
		position: relative;
		z-index: 3;
		padding: 4rem 1rem;
	}

	.hero-content {
		position: relative;
		z-index: 2;
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: 1.5rem;
		line-height: 1.1;
	}

	.hero-content p {
		font-size: 1.2rem;
		color: var(--gray);
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 3rem;
		justify-content: center;
	}

	.hero-stats {
		display: flex;
		gap: 2.5rem;
		justify-content: center;
	}

	.stat span {
		font-size: 2rem;
		font-weight: 700;
		display: block;
	}

	.stat p {
		font-size: 0.9rem;
		margin: 0;
	}

	.hero-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: hidden;
	}

	.particles-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
	}
</style>

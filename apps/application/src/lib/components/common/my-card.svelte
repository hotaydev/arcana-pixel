<script lang="ts">
	import { Clock, Swords } from "@lucide/svelte";
	import type { Component } from "svelte";

	export let id: string;
	export let title: string;
	export let subtitle: string;
	export let description: string;
	export let lastPlayed: string;
	export let rigthIcon: Component;
	export let rigthText: string;
	export let imageType: "portrait" | "landscape" = "landscape";
	export let index: number;
	export let fallbackImageIcon: Component;
	export let open: (id: string) => void;

	// Format date to relative time
	function formatRelativeTime(dateString: string) {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			return "Hoje";
		} else if (diffDays === 1) {
			return "Ontem";
		} else if (diffDays < 7) {
			return `${diffDays} dias atrás`;
		} else if (diffDays < 30) {
			const weeks = Math.floor(diffDays / 7);
			return `${weeks} ${weeks === 1 ? "semana" : "semanas"} atrás`;
		} else {
			return date.toLocaleDateString();
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="my-card" on:click={() => open(id)} style="animation-delay: {index * 0.1 + 0.1}s;">
	<div class="avatar" style="aspect-ratio: {imageType === 'portrait' ? '1/1' : '16/9'};">
		<div class="avatar-fallback">
			<svelte:component
				this={fallbackImageIcon ?? Swords}
				size={48}
				color="var(--text-color-dim)"
			/>
		</div>
	</div>

	<div class="info">
		<h3>{title}</h3>
		<h4>{subtitle}</h4>
		<p class="description">{description}</p>

		<div class="meta">
			<div class="meta-item">
				<Clock size={14} />
				<span>{formatRelativeTime(lastPlayed)}</span>
			</div>

			<div class="meta-item">
				<svelte:component this={rigthIcon} size={14} />
				<span>{rigthText}</span>
			</div>
		</div>
	</div>
</div>

<style>
	.avatar {
		background-color: var(--background-color-level-2);
		position: relative;
		overflow: hidden;
		max-height: 180px;
	}

	.avatar-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-color-level-2);
	}

	.info {
		padding: 1.25rem;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.info h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--title-color);
	}

	.info h4 {
		font-weight: 600;
		color: var(--text-color-dim);
		margin-bottom: 0.5rem;
	}

	.description {
		color: var(--text-color-dim);
		font-size: 0.95rem;
		margin-bottom: 1.25rem;
		line-height: 1.5;
		flex-grow: 1;
	}

	.meta {
		display: flex;
		justify-content: space-between;
		color: var(--text-color-dim);
		font-size: 0.85rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.my-card {
		background-color: var(--background-color-level-1);
		border-radius: var(--border-radius);
		overflow: hidden;
		border: 1px solid transparent;
		transition: all 0.3s ease;
		cursor: pointer;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.my-card:hover {
		transform: translateY(-5px);
		border-color: var(--primary-color);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	/* Animation for the cards */
	.my-card {
		opacity: 0;
		transform: translateY(20px);
		animation: card-appear 0.4s ease-out forwards;
	}

	@keyframes card-appear {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

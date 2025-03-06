<script lang="ts">
	import { character } from "$lib/features/character-sheet/stores/character.store";

	const formatNumberWithDots = (num: number): string => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	let characterName = $character?.name;
	let characterAvatar = $character?.avatar;
	let characterID = $character?.id;
	let currentHP = $character?.hp.current;
	let maxHP = $character?.hp.max;
	let currentXP = formatNumberWithDots($character?.xp.current);
	let maxXP = formatNumberWithDots($character?.xp.max);
</script>

<div class="info">
	<div class="avatar">
		<img src={characterAvatar} alt="Character Avatar" />
		<a
			class="overlay"
			href="https://www.dndbeyond.com/characters/{characterID}"
			target="_blank"
			rel="noopener noreferrer"
		>
			Editar
		</a>
	</div>
	<h2>{characterName}</h2>
	<p class="subtitle">Tiefling Feiticeiro Nv. 5</p>

	<div class="progress">
		<div class="progress-bar">
			<span class="progress-bar-fill hp" style="width: 70%;"></span>
		</div>
		<p>{currentHP} / {maxHP} HP</p>
	</div>

	<div class="progress">
		<div class="progress-bar">
			<span class="progress-bar-fill xp" style="width: 20%;"></span>
		</div>
		<p>
			{currentXP} / {maxXP} XP
		</p>
	</div>

	<hr />
</div>

<style>
	.info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		width: 100%;
	}

	.info .avatar {
		width: 6rem;
		height: 6rem;
		margin-bottom: 10px;
		position: relative;
		display: inline-block;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
	}

	.info .avatar > * {
		border: 3px solid var(--border-color);
	}

	.info .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}

	.info .avatar .overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 16px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		text-decoration: none;
	}

	.info .avatar:hover .overlay {
		opacity: 1;
	}

	.info h2 {
		font-size: 1.3rem;
		font-weight: 600;
	}

	.info .subtitle {
		font-size: 0.8rem;
		color: var(--text-color-dim);
		font-weight: 300;
		margin-bottom: 0.6rem;
	}

	hr {
		width: 85%;
		margin: 1rem 0;

		display: block;
		height: 1px;
		border: 0;
		border-top: 2px solid var(--divider-color);
		padding: 0;
	}

	.progress {
		width: 80%;
		margin: 2px 0;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.progress p {
		font-size: 0.8rem;
		color: var(--text-color-dim);
		font-weight: 300;
	}

	.progress-bar {
		width: 100%;
		background-color: var(--background-color-level-3);
		border-radius: 8px;
		flex: 1;
	}

	.progress-bar-fill {
		display: block;
		height: 8px;
		border-radius: 8px;
		transition: width 500ms ease-in-out;
	}

	.progress-bar-fill.hp {
		background-color: var(--life-bar);
	}
	.progress-bar-fill.xp {
		background-color: var(--xp-bar);
	}

	@media (max-width: 1800px) {
		.progress {
			width: 85%;
		}
	}

	@media (max-width: 1400px) {
		hr {
			width: 90%;
		}
		.progress {
			width: 90%;
		}

		.info .avatar {
			width: 5rem;
			height: 5rem;
		}

		.progress p {
			font-size: 0.7rem;
		}
	}

	@media (max-width: 1200px) {
		hr {
			width: 100%;
		}
		.progress {
			width: 100%;
		}

		.info .avatar {
			width: 4.5rem;
			height: 4.5rem;
		}
	}

	/* TODO: adjust also for smaller devices (mobile) */
</style>

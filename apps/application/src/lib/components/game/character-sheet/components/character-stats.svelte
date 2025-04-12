<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<script lang="ts">
	import { diceBox } from "$lib/stores/dice.store";
	import { character } from "$lib/stores/character.store";
	import { get } from "svelte/store";
	import { EyeOff } from "@lucide/svelte";
	import { getStatModifier } from "$lib/services/character/character-parser";

	let hideExtraStats = $state(false); // TODO: save this state to a local store
	let currentRollingDiceTimeout: NodeJS.Timeout;

	const rollStatDice = (modifier: number) => {
		if (currentRollingDiceTimeout) clearTimeout(currentRollingDiceTimeout);
		const diceRoll = `1d20${modifier > 0 ? `+${modifier}` : modifier < 0 ? `-${modifier}` : ""}`;
		(get(diceBox) as any).roll(diceRoll).then((results: any) => {
			currentRollingDiceTimeout = setTimeout(() => {
				(get(diceBox) as any).remove({ groupId: 0, rollId: 0 });
			}, 2 * 1000); // 2 Seconds
		});
	};

	let str = $character?.stats.str;
	let dex = $character?.stats.dex;
	let con = $character?.stats.con;
	let wis = $character?.stats.wis;
	let int = $character?.stats.int;
	let cha = $character?.stats.cha;

	let initiative = $character?.initiative;
	let defense = $character?.ac;
	let speed = $character?.speed;
	let proficiency = $character?.proficiency_bonus;
</script>

<div class="stats">
	<div class="stat-row">
		<div class="stat" onclick={() => rollStatDice(getStatModifier(str))}>
			<strong>FOR</strong>
			<p>+{getStatModifier(str)}</p>
			<span>- {str} -</span>
		</div>
		<div class="stat" onclick={() => rollStatDice(getStatModifier(dex))}>
			<strong>DES</strong>
			<p>+{getStatModifier(dex)}</p>
			<span>- {dex} -</span>
		</div>
		<div class="stat" onclick={() => rollStatDice(getStatModifier(con))}>
			<strong>CON</strong>
			<p>+{getStatModifier(con)}</p>
			<span>- {con} -</span>
		</div>
		<div class="stat" onclick={() => rollStatDice(getStatModifier(int))}>
			<strong>INT</strong>
			<p>+{getStatModifier(int)}</p>
			<span>- {int} -</span>
		</div>
		<div class="stat" onclick={() => rollStatDice(getStatModifier(wis))}>
			<strong>SAB</strong>
			<p>+{getStatModifier(wis)}</p>
			<span>- {wis} -</span>
		</div>
		<div class="stat" onclick={() => rollStatDice(getStatModifier(cha))}>
			<strong>CAR</strong>
			<p>+{getStatModifier(cha)}</p>
			<span>- {cha} -</span>
		</div>
	</div>

	{#if hideExtraStats}
		<button onclick={() => (hideExtraStats = false)}>Mostrar estatísticas extras</button>
	{:else}
		<div class="stat-row extra-stats">
			<div class="stat">
				<strong>DEFESA</strong>
				<p>{defense}</p>
			</div>
			<div class="stat" style="cursor: pointer;" onclick={() => rollStatDice(initiative)}>
				<strong><abbr title="INICIATIVA">INICIAT.</abbr></strong>
				<p>+{initiative}</p>
			</div>
			<div class="stat" style="cursor: pointer;" onclick={() => rollStatDice(proficiency)}>
				<strong><abbr title="PROFICIÊNCIA">PROFIC.</abbr></strong>
				<p>+{proficiency}</p>
			</div>
			<div class="stat">
				<strong><abbr title="VELOCIDADE">VELOCID.</abbr></strong>
				<p>{speed}m</p>
			</div>

			<div class="hide-stats" title="Esconder Extras">
				<EyeOff onclick={() => (hideExtraStats = true)} />
			</div>
		</div>
	{/if}
</div>

<style>
	.stats {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		width: 100%;
		margin-top: 1rem;
		gap: 1rem;
	}

	.stats button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: var(--text-color);
	}

	.stat-row {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;

		width: 100%;
		gap: 8px;
	}

	.stat-row .stat {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 8px 12px;
		gap: 6px;
		background-color: var(--background-color-level-2);
		border: 2px solid var(--border-color);
		border-radius: var(--border-radius);
		cursor: pointer;
	}

	.extra-stats .stat {
		background-color: var(--background-color-level-1);
		cursor: default;
	}

	.stat-row .stat > strong {
		font-size: 1rem;
		font-weight: 500;
	}

	.stat-row .stat > strong abbr {
		text-decoration: none;
	}

	.stat-row .stat > p {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.stat-row .stat > span {
		font-size: 0.7rem;
		font-weight: 300;
		color: var(--text-color-dim);
	}

	.stat-row .hide-stats {
		cursor: pointer;
		margin-left: 0.5rem;
	}

	@media (min-width: 1650px) and (max-width: 1820px) {
		.stat-row {
			gap: 6px;
		}

		.stat-row .stat > strong {
			font-size: 0.9rem;
		}

		.stat-row .stat > p {
			font-size: 1.3rem;
		}

		.stat-row .stat {
			padding: 8px 10px;
		}
	}

	@media (min-width: 1510px) and (max-width: 1649px) {
		.stat-row {
			gap: 5px;
		}

		.stat-row .stat > strong {
			font-size: 0.7rem;
		}

		.stat-row .stat > p {
			font-size: 1.2rem;
		}

		.stat-row .stat > span {
			font-size: 0.6rem;
		}

		.stat-row .stat {
			padding: 8px 10px;
		}
	}

	@media (max-width: 1050px) {
		.stat-row {
			gap: 6px;
		}

		.stat-row .stat {
			padding: 8px 10px;
		}
	}
</style>

<script lang="ts">
	// This page is just an example!

	import ArcanaMap from "$lib/features/map/main.svelte";
	import { Toaster } from "svelte-5-french-toast";
	import { showWiki } from "$lib/features/wiki-bar/stores/wiki.store";
	import { fade, fly } from "svelte/transition";
	import {
		Shield,
		Heart,
		Brain,
		Dumbbell,
		Flame,
		Wind,
		BookOpen,
		Map,
		User,
		Sparkles,
		Sword,
		Eye,
		Backpack,
		ChevronLeft,
		ChevronRight,
		Dice5,
		Scroll,
		PenTool,
		Save,
		PlusCircle,
		MinusCircle,
	} from "@lucide/svelte";

	// Character data store
	import { writable } from "svelte/store";

	// Mock character data - this would come from your actual store
	const character = writable({
		name: "Eldric Stormborn",
		class: "Wizard",
		level: 7,
		race: "High Elf",
		background: "Sage",
		alignment: "Neutral Good",
		experience: 23000,
		experienceToNextLevel: 28000,
		stats: {
			strength: 10,
			dexterity: 16,
			constitution: 14,
			intelligence: 18,
			wisdom: 13,
			charisma: 12,
		},
		hp: {
			current: 38,
			max: 45,
		},
		ac: 14,
		proficiencyBonus: 3,
		initiative: 3,
		speed: 30,
		savingThrows: ["intelligence", "wisdom"],
		skills: {
			acrobatics: false,
			animalHandling: false,
			arcana: true,
			athletics: false,
			deception: false,
			history: true,
			insight: true,
			intimidation: false,
			investigation: true,
			medicine: false,
			nature: false,
			perception: true,
			performance: false,
			persuasion: false,
			religion: true,
			sleightOfHand: false,
			stealth: false,
			survival: false,
		},
		spellcasting: {
			ability: "intelligence",
			saveDC: 15,
			attackBonus: 7,
		},
	});

	// UI state management
	let showCharacterSheet = true;
	let showDicePanel = false;
	let selectedTab = "attributes";

	// Calculate modifier from ability score
	function getModifier(score) {
		return Math.floor((score - 10) / 2);
	}

	// Format modifier with + or -
	function formatModifier(mod) {
		return mod >= 0 ? `+${mod}` : `${mod}`;
	}

	// Toggle panels
	function toggleCharacterSheet() {
		showCharacterSheet = !showCharacterSheet;
	}

	function toggleDicePanel() {
		showDicePanel = !showDicePanel;
	}

	// Mock dice roll function
	function rollDice(sides: number) {
		return Math.floor(Math.random() * sides) + 1;
	}

	// Mock function to roll with advantage/disadvantage
	function rollWithAdvantageOrDisadvantage(sides: number, isAdvantage: boolean) {
		const roll1 = rollDice(sides);
		const roll2 = rollDice(sides);
		return {
			roll1,
			roll2,
			result: isAdvantage ? Math.max(roll1, roll2) : Math.min(roll1, roll2),
		};
	}

	// Wiki toggle with animation support
	function toggleWiki() {
		showWiki.update((value) => !value);
	}
</script>

<main>
	<!-- Wiki / Location Notes Section -->
	<section class="wiki" class:wiki-open={$showWiki} transition:fly={{ x: -300, duration: 400 }}>
		<button class="wiki-toggle" on:click={toggleWiki}>
			{#if $showWiki}
				<ChevronLeft size={24} />
			{:else}
				<ChevronRight size={24} />
			{/if}
		</button>

		<div class="wiki-content">
			<h2><BookOpen size={20} /> World Compendium</h2>
			<!-- Placeholder for WikiSidebar component -->
			<div class="wiki-placeholder">
				<p>Wiki content will be displayed here</p>
			</div>
		</div>
	</section>

	<!-- Map Section - Center piece -->
	<section class="map" class:map-expanded={!$showWiki} class:map-with-sheet={showCharacterSheet}>
		<div class="map-header">
			<h2><Map size={20} /> Realm of Arcana</h2>
			<div class="map-controls">
				<button class="icon-button" title="Toggle Character Sheet" on:click={toggleCharacterSheet}>
					<User size={20} />
				</button>
				<button class="icon-button" title="Toggle Dice Roller" on:click={toggleDicePanel}>
					<Dice5 size={20} />
				</button>
			</div>
		</div>

		<ArcanaMap />

		<!-- Dice Panel - conditionally shown -->
		{#if showDicePanel}
			<div class="dice-panel" transition:fade={{ duration: 200 }}>
				<div class="dice-panel-header">
					<h3><Dice5 size={20} /> Dice Roller</h3>
					<button class="close-button" on:click={toggleDicePanel}>×</button>
				</div>
				<div class="dice-buttons">
					<button class="dice-button d4" on:click={() => rollDice(4)}>d4</button>
					<button class="dice-button d6" on:click={() => rollDice(6)}>d6</button>
					<button class="dice-button d8" on:click={() => rollDice(8)}>d8</button>
					<button class="dice-button d10" on:click={() => rollDice(10)}>d10</button>
					<button class="dice-button d12" on:click={() => rollDice(12)}>d12</button>
					<button class="dice-button d20" on:click={() => rollDice(20)}>d20</button>
					<button class="dice-button d100" on:click={() => rollDice(100)}>d100</button>
				</div>
				<div class="roll-options">
					<label>
						<input type="checkbox" /> Advantage
					</label>
					<label>
						<input type="checkbox" /> Disadvantage
					</label>
				</div>
				<div class="roll-history">
					<h4>Roll History</h4>
					<ul>
						<li>d20: 18 (Attack Roll)</li>
						<li>2d6: 8 (Damage)</li>
						<li>d20: 7 (Perception Check)</li>
					</ul>
				</div>
			</div>
		{/if}
	</section>

	<!-- Character Sheet Section - Right panel -->
	{#if showCharacterSheet}
		<section class="character-sheet" transition:fly={{ x: 300, duration: 400 }}>
			<div class="character-header">
				<div class="character-name-level">
					<h2>{$character.name}</h2>
					<p>Level {$character.level} {$character.race} {$character.class}</p>
				</div>
				<button class="close-button" on:click={toggleCharacterSheet}>×</button>
			</div>

			<div class="experience-bar">
				<div
					class="experience-fill"
					style="width: {($character.experience / $character.experienceToNextLevel) * 100}%"
				></div>
				<span class="experience-text"
					>XP: {$character.experience} / {$character.experienceToNextLevel}</span
				>
			</div>

			<div class="vital-stats">
				<div class="vital-stat">
					<Shield size={20} />
					<span>AC</span>
					<span class="vital-value">{$character.ac}</span>
				</div>
				<div class="vital-stat">
					<Heart size={20} />
					<span>HP</span>
					<span class="vital-value">{$character.hp.current}/{$character.hp.max}</span>
					<div class="hp-controls">
						<button
							class="icon-button small"
							on:click={() =>
								($character.hp.current = Math.min($character.hp.current + 1, $character.hp.max))}
						>
							<PlusCircle size={16} />
						</button>
						<button
							class="icon-button small"
							on:click={() => ($character.hp.current = Math.max($character.hp.current - 1, 0))}
						>
							<MinusCircle size={16} />
						</button>
					</div>
				</div>
				<div class="vital-stat">
					<Sparkles size={20} />
					<span>Initiative</span>
					<span class="vital-value">+{$character.initiative}</span>
				</div>
				<div class="vital-stat">
					<Wind size={20} />
					<span>Speed</span>
					<span class="vital-value">{$character.speed} ft</span>
				</div>
			</div>

			<div class="character-tabs">
				<button
					class:active={selectedTab === "attributes"}
					on:click={() => (selectedTab = "attributes")}
				>
					<Brain size={16} /> Abilities
				</button>
				<button class:active={selectedTab === "skills"} on:click={() => (selectedTab = "skills")}>
					<Dumbbell size={16} /> Skills
				</button>
				<button class:active={selectedTab === "spells"} on:click={() => (selectedTab = "spells")}>
					<Flame size={16} /> Spells
				</button>
				<button
					class:active={selectedTab === "inventory"}
					on:click={() => (selectedTab = "inventory")}
				>
					<Backpack size={16} /> Inventory
				</button>
				<button class:active={selectedTab === "notes"} on:click={() => (selectedTab = "notes")}>
					<PenTool size={16} /> Notes
				</button>
			</div>

			{#if selectedTab === "attributes"}
				<div class="tab-content attributes" transition:fade={{ duration: 150 }}>
					<div class="ability-scores">
						{#each ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] as ability}
							<div
								class="ability-score"
								class:saving-throw-proficient={$character.savingThrows.includes(ability)}
							>
								<div class="ability-name">{ability.slice(0, 3).toUpperCase()}</div>
								<div class="ability-value">{$character.stats[ability]}</div>
								<div class="ability-modifier">
									{formatModifier(getModifier($character.stats[ability]))}
								</div>
							</div>
						{/each}
					</div>

					<div class="proficiency-bonus">
						<span>Proficiency Bonus:</span>
						<span class="prof-value">+{$character.proficiencyBonus}</span>
					</div>

					<div class="saving-throws">
						<h3>Saving Throws</h3>
						{#each ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"] as ability}
							<div
								class="saving-throw"
								class:proficient={$character.savingThrows.includes(ability)}
							>
								<input
									type="checkbox"
									checked={$character.savingThrows.includes(ability)}
									disabled
								/>
								<span class="saving-throw-name"
									>{ability.charAt(0).toUpperCase() + ability.slice(1)}</span
								>
								<span class="saving-throw-value">
									{formatModifier(
										getModifier($character.stats[ability]) +
											($character.savingThrows.includes(ability) ? $character.proficiencyBonus : 0)
									)}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{:else if selectedTab === "skills"}
				<div class="tab-content skills" transition:fade={{ duration: 150 }}>
					<div class="skills-list">
						{#each [{ name: "Acrobatics", ability: "dexterity", key: "acrobatics" }, { name: "Animal Handling", ability: "wisdom", key: "animalHandling" }, { name: "Arcana", ability: "intelligence", key: "arcana" }, { name: "Athletics", ability: "strength", key: "athletics" }, { name: "Deception", ability: "charisma", key: "deception" }, { name: "History", ability: "intelligence", key: "history" }, { name: "Insight", ability: "wisdom", key: "insight" }, { name: "Intimidation", ability: "charisma", key: "intimidation" }, { name: "Investigation", ability: "intelligence", key: "investigation" }, { name: "Medicine", ability: "wisdom", key: "medicine" }, { name: "Nature", ability: "intelligence", key: "nature" }, { name: "Perception", ability: "wisdom", key: "perception" }, { name: "Performance", ability: "charisma", key: "performance" }, { name: "Persuasion", ability: "charisma", key: "persuasion" }, { name: "Religion", ability: "intelligence", key: "religion" }, { name: "Sleight of Hand", ability: "dexterity", key: "sleightOfHand" }, { name: "Stealth", ability: "dexterity", key: "stealth" }, { name: "Survival", ability: "wisdom", key: "survival" }] as skill}
							<div class="skill" class:proficient={$character.skills[skill.key]}>
								<input type="checkbox" checked={$character.skills[skill.key]} disabled />
								<span class="skill-name">{skill.name}</span>
								<span class="skill-ability">({skill.ability.slice(0, 3).toUpperCase()})</span>
								<span class="skill-value">
									{formatModifier(
										getModifier($character.stats[skill.ability]) +
											($character.skills[skill.key] ? $character.proficiencyBonus : 0)
									)}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{:else if selectedTab === "spells"}
				<div class="tab-content spells" transition:fade={{ duration: 150 }}>
					<div class="spellcasting-info">
						<div class="spell-details">
							<span
								>Spellcasting Ability: {$character.spellcasting.ability.charAt(0).toUpperCase() +
									$character.spellcasting.ability.slice(1)}</span
							>
							<span>Spell Save DC: {$character.spellcasting.saveDC}</span>
							<span>Spell Attack Bonus: +{$character.spellcasting.attackBonus}</span>
						</div>
					</div>

					<div class="spell-levels">
						<div class="spell-level">
							<h4>Cantrips</h4>
							<div class="spell-list">
								<div class="spell">
									<span class="spell-name">Fire Bolt</span>
									<span class="casting-time">1 action</span>
								</div>
								<div class="spell">
									<span class="spell-name">Mage Hand</span>
									<span class="casting-time">1 action</span>
								</div>
								<div class="spell">
									<span class="spell-name">Prestidigitation</span>
									<span class="casting-time">1 action</span>
								</div>
							</div>
						</div>

						<div class="spell-level">
							<h4>Level 1 <span class="slots">3/4 slots</span></h4>
							<div class="spell-list">
								<div class="spell">
									<span class="spell-name">Magic Missile</span>
									<span class="casting-time">1 action</span>
								</div>
								<div class="spell">
									<span class="spell-name">Shield</span>
									<span class="casting-time">1 reaction</span>
								</div>
							</div>
						</div>

						<div class="spell-level">
							<h4>Level 2 <span class="slots">2/3 slots</span></h4>
							<div class="spell-list">
								<div class="spell">
									<span class="spell-name">Invisibility</span>
									<span class="casting-time">1 action</span>
								</div>
							</div>
						</div>

						<div class="spell-level">
							<h4>Level 3 <span class="slots">1/3 slots</span></h4>
							<div class="spell-list">
								<div class="spell">
									<span class="spell-name">Fireball</span>
									<span class="casting-time">1 action</span>
								</div>
							</div>
						</div>

						<div class="spell-level">
							<h4>Level 4 <span class="slots">1/1 slots</span></h4>
							<div class="spell-list">
								<div class="spell">
									<span class="spell-name">Polymorph</span>
									<span class="casting-time">1 action</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else if selectedTab === "inventory"}
				<div class="tab-content inventory" transition:fade={{ duration: 150 }}>
					<div class="currency">
						<div class="currency-item">
							<span class="currency-label">PP:</span>
							<span class="currency-value">5</span>
						</div>
						<div class="currency-item">
							<span class="currency-label">GP:</span>
							<span class="currency-value">124</span>
						</div>
						<div class="currency-item">
							<span class="currency-label">SP:</span>
							<span class="currency-value">36</span>
						</div>
						<div class="currency-item">
							<span class="currency-label">CP:</span>
							<span class="currency-value">12</span>
						</div>
					</div>

					<div class="equipment">
						<h4>Equipped</h4>
						<div class="item">
							<span class="item-name">Staff of Power</span>
							<span class="item-property">Attuned, +2</span>
						</div>
						<div class="item">
							<span class="item-name">Bracers of Defense</span>
							<span class="item-property">+2 AC</span>
						</div>
						<div class="item">
							<span class="item-name">Spellbook</span>
						</div>

						<h4>Backpack</h4>
						<div class="item">
							<span class="item-name">Potion of Healing</span>
							<span class="item-count">×3</span>
						</div>
						<div class="item">
							<span class="item-name">Rations</span>
							<span class="item-count">×5</span>
						</div>
						<div class="item">
							<span class="item-name">Arcane Focus (Crystal)</span>
						</div>
						<div class="item">
							<span class="item-name">Component Pouch</span>
						</div>
						<div class="item">
							<span class="item-name">Scroll of Fireball</span>
						</div>
					</div>
				</div>
			{:else if selectedTab === "notes"}
				<div class="tab-content notes" transition:fade={{ duration: 150 }}>
					<div class="note-tabs">
						<button class="active">Campaign</button>
						<button>Quests</button>
						<button>People</button>
					</div>
					<div class="note-content">
						<textarea placeholder="Add your notes here...">
							The Archmage Zellara has tasked us with retrieving the Crystal of Eterna from the
							Ruins of Kaldar. The ruins are said to be guarded by ancient constructs and possibly a
							young dragon. Need to speak with the sage in Thornwall about the ancient runes before
							heading to the ruins. Party members: - Thorne (Fighter) - Lysandra (Rogue) - Garik
							(Cleric)
						</textarea>
						<div class="note-actions">
							<button class="icon-button"><Save size={16} /> Save</button>
						</div>
					</div>
				</div>
			{/if}
		</section>
	{/if}

	<Toaster />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		flex-direction: row;
		gap: 1rem;
		overflow: hidden;
		position: relative;
		padding: 1rem;
	}

	/* Wiki Section */
	.wiki {
		position: relative;
		flex: 0 0 25%;
		max-width: 25%;
		height: 100%;
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		transition: all 0.4s ease-in-out;
	}

	.wiki-open {
		flex: 0 0 25%;
		max-width: 25%;
	}

	.wiki-content {
		padding: 1.5rem;
		height: 100%;
		overflow-y: auto;
	}

	.wiki-content h2 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--title-color);
		margin-bottom: 1.5rem;
	}

	.wiki-toggle {
		position: absolute;
		top: 1rem;
		right: -12px;
		z-index: 100;
		background-color: var(--background-color-level-2);
		border: none;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--text-color);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.wiki-toggle:hover {
		background-color: var(--background-color-level-3);
	}

	.wiki-placeholder {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-color-dim);
		border: 1px dashed var(--border-color);
		border-radius: 8px;
		padding: 2rem;
	}

	/* Map Section */
	.map {
		position: relative;
		flex: 1;
		height: 100%;
		transition: all 0.4s ease-in-out;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.map-expanded {
		flex: 1;
	}

	.map-with-sheet {
		margin-right: 25%;
	}

	.map-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.5rem;
	}

	.map-header h2 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--title-color);
		font-size: 1.25rem;
	}

	.map-controls {
		display: flex;
		gap: 0.5rem;
	}

	/* Dice Panel */
	.dice-panel {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		width: 300px;
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
		z-index: 100;
		padding: 1rem;
	}

	.dice-panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.dice-panel-header h3 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--title-color);
		margin: 0;
	}

	.dice-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.dice-button {
		flex: 1 1 calc(25% - 0.5rem);
		padding: 0.5rem;
		border-radius: 8px;
		background-color: var(--background-color-level-2);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.dice-button:hover {
		background-color: var(--background-color-level-3);
	}

	.d20 {
		background-color: var(--xp-bar);
		color: var(--background-color-level-0);
	}

	.roll-options {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		color: var(--text-color);
	}

	.roll-options label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.roll-history {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.5rem;
		max-height: 150px;
		overflow-y: auto;
	}

	.roll-history h4 {
		color: var(--text-color);
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
	}

	.roll-history ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.roll-history li {
		color: var(--text-color-dim);
		font-size: 0.9rem;
		margin-bottom: 0.3rem;
	}

	/* Character Sheet Section */
	.character-sheet {
		position: fixed;
		top: 1rem;
		bottom: 1rem;
		right: 1rem;
		width: 25%;
		background-color: var(--background-color-level-1);
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.character-header {
		padding: 1rem;
		background-color: var(--background-color-level-2);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.character-name-level h2 {
		color: var(--title-color);
		margin: 0;
		font-weight: 600;
	}

	.character-name-level p {
		color: var(--text-color-dim);
		margin: 0;
		font-size: 0.9rem;
	}

	.close-button {
		background: none;
		border: none;
		color: var(--text-color);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		line-height: 1;
	}

	.close-button:hover {
		color: var(--title-color);
	}

	.experience-bar {
		height: 6px;
		background-color: var(--background-color-level-0);
		position: relative;
	}

	.experience-fill {
		height: 100%;
		background-color: var(--xp-bar);
		transition: width 0.3s ease;
	}

	.experience-text {
		position: absolute;
		right: 10px;
		top: 6px;
		color: var(--text-color-dim);
		font-size: 0.7rem;
	}

	.vital-stats {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background-color: var(--background-color-level-0);
	}

	.vital-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		color: var(--text-color-dim);
		font-size: 0.8rem;
		position: relative;
	}

	.vital-value {
		color: var(--title-color);
		font-weight: 600;
		font-size: 1.2rem;
	}

	.hp-controls {
		display: flex;
		gap: 0.25rem;
		margin-top: 0.25rem;
	}

	.character-tabs {
		display: flex;
		border-bottom: 1px solid var(--divider-color);
		padding: 0 0.5rem;
	}

	.character-tabs button {
		flex: 1;
		background: none;
		border: none;
		color: var(--text-color-dim);
		padding: 0.75rem 0.5rem;
		cursor: pointer;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.2s ease;
		border-bottom: 2px solid transparent;
	}

	.character-tabs button:hover {
		color: var(--text-color);
	}

	.character-tabs button.active {
		color: var(--title-color);
		border-bottom: 2px solid var(--xp-bar);
	}

	.tab-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	/* Ability Scores */
	.ability-scores {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.ability-score {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem 0.5rem;
		position: relative;
	}

	.ability-score::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 4px;
		height: 100%;
		background-color: transparent;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.saving-throw-proficient::before {
		background-color: var(--life-bar);
	}

	.ability-name {
		color: var(--text-color-dim);
		font-size: 0.8rem;
		text-transform: uppercase;
	}

	.ability-value {
		color: var(--title-color);
		font-size: 1.2rem;
		font-weight: 600;
	}

	.ability-modifier {
		color: var(--text-color);
		font-size: 0.9rem;
	}

	.proficiency-bonus {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		margin-bottom: 1rem;
		color: var(--text-color);
	}

	.prof-value {
		color: var(--title-color);
		font-weight: 600;
	}

	.saving-throws {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
	}

	.saving-throws h3 {
		color: var(--text-color);
		font-size: 1rem;
		margin-bottom: 0.75rem;
	}

	.saving-throw {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		padding: 0.3rem 0;
		border-bottom: 1px solid var(--background-color-level-1);
	}

	.saving-throw:last-child {
		margin-bottom: 0;
		border-bottom: none;
	}

	.saving-throw-name {
		flex: 1;
		margin-left: 0.5rem;
		color: var(--text-color-dim);
	}

	.saving-throw.proficient .saving-throw-name {
		color: var(--text-color);
	}

	.saving-throw-value {
		color: var(--title-color);
		font-weight: 500;
	}

	/* Skills Tab */
	.skills-list {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
	}

	.skill {
		display: flex;
		align-items: center;
		margin-bottom: 0.3rem;
		padding: 0.3rem 0;
		border-bottom: 1px solid var(--background-color-level-1);
	}

	.skill:last-child {
		margin-bottom: 0;
		border-bottom: none;
	}

	.skill-name {
		flex: 1;
		margin-left: 0.5rem;
		color: var(--text-color-dim);
	}

	.skill.proficient .skill-name {
		color: var(--text-color);
	}

	.skill-ability {
		color: var(--text-color-dim);
		font-size: 0.8rem;
		margin-right: 0.5rem;
	}

	.skill-value {
		color: var(--title-color);
		font-weight: 500;
		width: 30px;
		text-align: right;
	}

	/* Spells Tab */
	.spellcasting-info {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
		margin-bottom: 1rem;
	}

	.spell-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		color: var(--text-color);
	}

	.spell-levels {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.spell-level {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
	}

	.spell-level h4 {
		color: var(--text-color);
		font-size: 1rem;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.slots {
		color: var(--xp-bar);
		font-size: 0.8rem;
		font-weight: normal;
	}

	.spell-list {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.spell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.3rem 0;
		border-bottom: 1px solid var(--background-color-level-1);
	}

	.spell:last-child {
		border-bottom: none;
	}

	.spell-name {
		color: var(--text-color);
	}

	.casting-time {
		color: var(--text-color-dim);
		font-size: 0.8rem;
	}

	/* Inventory Tab */
	.currency {
		display: flex;
		justify-content: space-between;
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
		margin-bottom: 1rem;
	}

	.currency-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.currency-label {
		color: var(--text-color-dim);
		font-size: 0.8rem;
	}

	.currency-value {
		color: var(--title-color);
		font-weight: 600;
	}

	.equipment {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		padding: 0.75rem;
	}

	.equipment h4 {
		color: var(--text-color);
		font-size: 1rem;
		margin: 0.5rem 0;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.3rem 0;
		border-bottom: 1px solid var(--background-color-level-1);
	}

	.item:last-child {
		border-bottom: none;
	}

	.item-name {
		color: var(--text-color);
	}

	.item-property,
	.item-count {
		color: var(--text-color-dim);
		font-size: 0.8rem;
	}

	/* Notes Tab */
	.note-tabs {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.note-tabs button {
		background-color: var(--background-color-level-0);
		border: none;
		border-radius: 6px;
		color: var(--text-color-dim);
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.note-tabs button.active {
		color: var(--title-color);
		background-color: var(--background-color-level-2);
	}

	.note-content {
		background-color: var(--background-color-level-0);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		height: calc(100% - 40px);
	}

	.note-content textarea {
		flex: 1;
		background-color: transparent;
		border: none;
		color: var(--text-color);
		padding: 0.75rem;
		resize: none;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.note-content textarea:focus {
		outline: none;
	}

	.note-actions {
		padding: 0.5rem;
		border-top: 1px solid var(--background-color-level-2);
		display: flex;
		justify-content: flex-end;
	}

	/* Common UI Elements */
	.icon-button {
		background-color: var(--background-color-level-2);
		border: none;
		border-radius: 6px;
		color: var(--text-color);
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.2s ease;
	}

	.icon-button:hover {
		background-color: var(--background-color-level-3);
		color: var(--title-color);
	}

	.icon-button.small {
		padding: 0.25rem;
	}

	/* Media Queries */
	@media (max-width: 1200px) {
		.character-sheet,
		.wiki-open {
			flex: 0 0 30%;
			max-width: 30%;
		}
	}

	@media (max-width: 768px) {
		main {
			flex-direction: column;
		}

		.character-sheet,
		.wiki {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			max-width: 100%;
			z-index: 1000;
			border-radius: 0;
		}

		.map {
			margin-right: 0;
		}
	}
</style>

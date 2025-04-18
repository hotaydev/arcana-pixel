/**
 * Schema definition for a single Dungeons and Dragons Character to be loaded on Arcana Pixel
 */
export interface IPlayerDnD {
  /**
   * Schema definition for the single D&D character definitions to be loaded on Arcana Pixel
   */
  $schema?: "https://raw.githubusercontent.com/hotaydev/arcana-pixel/main/packages/schemas/compiled/player_dnd.json";

  /**
   * Identifier of the character in the source origin platform.
   * Ex. If the character is imported from D&D Beyond, this will be the character's ID; If it's create through Arcana Pixel, then it will be the internal indentifier.
   */
  id: string;

  /**
   * Source of the player's character definition, including D&D Beyond, PDF Sheet, Internal, etc.
   */
  source?: DndPlayerSource;

  /**
   * Name of the character
   */
  name: string;

  /**
   * Race/Species of the character
   */
  race: string;

  // TODO: Add racial traits + class Features + subclassDefinition classFeatures

  /**
   * Character Avatar URL
   */
  avatar: string;

  /**
   * List o character classes
   */
  classes: Class[];

  /**
   * Current character level. This is the sum of all classes levels.
   */
  level: number;

  /**
   * Current character experience
   */
  xp: ProgressionBar;

  /**
   * Current character Hit Points
   */
  hp: ProgressionBar;

  /**
   * Array of available spell slots, ordered by level
   * Ex. Level 1: array position 0, Level 2: array position 1, etc.
   */
  spellSlots: ProgressionBar[];

  /**
   * Charcter Armor Class (Defense)
   */
  armorClass: number;

  /**
   * Walking speed in meters per round
   */
  speed: number;

  /**
   * Proficiency bonus (added to proficient skills)
   */
  proficiencyBonus: number;

  /**
   * Initiative Bonus (Dexterity Modifier + any other bonuses)
   */
  initiative: number;

  /**
   * List of character stats
   */
  stats: Stats;

  /**
   * List of skills
   */
  skills: Skill[];

  /**
   * Character's money
   */
  currencies: Currencies;

  /**
   * Spellcasting ability.
   * If not provided, the character is not a spellcaster.
   */
  spellcastingAbility?: SpellCastingAbility[];

  /**
   * List of spells
   */
  spells: any[];

  /**
   * List of items
   */
  items: any[]; // It's inside data.inventory

  /**
   * Character's alignment
   */
  alignment?: Alignment;
}

/**
 * Schema definition for a single character class
 */
export interface Class {
  /**
   * Class name
   */
  class: string;

  /**
   * Class level
   */
  level: number;
}

/**
 * Schema definition for a single spellcasting ability
 */
export interface SpellCastingAbility {
  /**
   * Spellcasting ability (null when not a spellcaster)
   */
  stat?: StatsType;

  /**
   * Class that can cast spells using this stat
   */
  class: string;
}

/**
 * Schema definition for a single skill
 */
export interface Skill {
  /**
   * Skill identifier
   */
  skill: SkillsType;

  /**
   * Skill stat used
   */
  stat: Stat;

  /**
   * Indicates if the character is proficient in the skill
   */
  isProficient?: boolean;
}

/**
 * Schema definition for a single character stat
 */
export interface Stat {
  /**
   * Stat identifier
   */
  stat: StatsType;

  /**
   * Stat value
   */
  value: number;

  /**
   * Any bonuses to the stat
   */
  bonus?: number;

  /**
   * Indicates if the character is proficient in the stat. Used for saving throws.
   */
  isProficient?: boolean;
}

/**
 * Schema definition for all character stats
 */
export interface Stats {
  /**
   * Strength
   */
  str: Stat;

  /**
   * Dexterity
   */
  dex: Stat;

  /**
   * Constitution
   */
  con: Stat;

  /**
   * Intelligence
   */
  int: Stat;

  /**
   * Wisdom
   */
  wis: Stat;

  /**
   * Charisma
   */
  cha: Stat;
}

/**
 * Schema definition for a simple progression bar, with current and max values
 */
export interface ProgressionBar {
  /**
   * Current value
   */
  current: number;

  /**
   * Max value
   */
  max: number;
}

/**
 * Definition of available Skills identifiers
 */
export type SkillsType =
  | "acrobatics"
  | "animal_handling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleight_of_hand"
  | "stealth"
  | "survival";

/**
 * Definition of available Stats identifiers
 */
export type StatsType = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type Alignment =
  | "lawful_good"
  | "neutral_good"
  | "chaotic_good"
  | "lawful_neutral"
  | "neutral"
  | "chaotic_neutral"
  | "lawful_evil"
  | "neutral_evil"
  | "chaotic_evil";

/**
 * Definition of available character sources
 */
export type DndPlayerSource =
  | "dnd_beyond"
  | "roll20"
  | "pdf_character_sheet"
  | "arcana_pixel";

/**
 * Current character's money divided into game's currencies
 */
export interface Currencies {
  /**
   * Copper Pieces
   */
  cp: number;

  /**
   * Silver Pieces
   */
  sp: number;

  /**
   * Gold Pieces
   */
  gp: number;

  /**
   * Electrum Pieces
   */
  ep: number;

  /**
   * Platinum Pieces
   */
  pp: number;
}

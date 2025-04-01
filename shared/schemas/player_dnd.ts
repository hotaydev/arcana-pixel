/**
 * Schema definition for a single Dungeons and Dragons Character to be loaded on Arcana Pixel
 */
export interface IPlayerDnD {
  /**
   * Schema definition for the single D&D character definitions to be loaded on Arcana Pixel
   */
  $schema?: "https://raw.githubusercontent.com/hotaydev/arcana-pixel/main/shared/schemas/compiled/player_dnd.json";

  /**
   * Identifier of the character in the source origin platform.
   * Ex. If the character is imported from D&D Beyond, this will be the character's ID; If it's create through Arcana Pixel, then it will be the internal indentifier.
   */
  id: number;

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

  /**
   * Character Avatar URL
   */
  avatar: string;

  /**
   * List o character classes
   */
  classes: string[];

  /**
   * Current character level
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
   * Charcter Armor Class (Defense)
   */
  ac: number;

  /**
   * Initiative bonus (Dexterity modifier)
   */
  initiative: number;

  /**
   * Walking speed in meters per round
   */
  speed: number;

  /**
   * Proficiency bonus (added to proficient skills)
   */
  proficiency_bonus: number;

  /**
   * List of character stats
   */
  stats: Stats;

  /**
   * Saving throws based on character stats
   */
  saving_throws: Stats;

  /**
   * List of skills
   */
  skills: Skill[];
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
   * Skill stat used (based on character stats)
   */
  stat: StatsType;

  /**
   * Skill stat used (based on character stats)
   */
  modifier: number;

  /**
   * Indicates if the character is proficient in the skill
   */
  isProficient: boolean;
}

/**
 * Schema definition for character stats
 */
export interface  Stats {
  /**
   * Strength
   */
  str: number;

  /**
   * Dexterity
   */
  dex: number;

  /**
   * Constitution
   */
  con: number;

  /**
   * Intelligence
   */
  int: number;

  /**
   * Wisdom
   */
  wis: number;

  /**
   * Charisma
   */
  cha: number;
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
export type SkillsType = "acrobatics" | "animal_handling" | "arcana" | "athletics" | "deception" | "history" | "insight" | "intimidation" | "investigation" | "medicine" | "nature" | "perception" | "performance" | "persuasion" | "religion" | "sleight_of_hand" | "stealth" | "survival";

/**
 * Definition of available Stats identifiers
 */
export type StatsType = "str" | "dex" | "con" | "int" | "wis" | "cha";

/**
 * Definition of available character sources
 */
export type DndPlayerSource = "dnd_beyond" | "pdf_character_sheet" | "arcana_pixel";

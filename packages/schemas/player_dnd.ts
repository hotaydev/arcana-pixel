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

  /**
   * Indicates if the character is inspired
   */
  isInspired: boolean;

  // TODO: Add racial traits + class Features + subclassDefinition classFeatures

  /**
   * Character Avatar URL
   */
  avatar?: string;

  /**
   * List o character classes
   */
  classes: Class[];

  /**
   * Current character experience
   */
  xp: ProgressionBar;

  /**
   * Current character Hit Points
   */
  hp: ProgressionBar;

  /**
   * Temporary hit points
   * @default 0
   */
  tempHp?: number;

  /**
   * Array of available spell slots, ordered by level
   * Ex. Level 1: array position 0, Level 2: array position 1, etc.
   * If undefined, the character is not a spellcaster
   * Warlock have only one spell slot, which indicates the total spell slots available at any level
   */
  spellSlots?: ProgressionBar[];

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
   * @default undefined
   */
  spellcastingAbility?: SpellCastingAbility[];

  /**
   * List of spells
   * @default []
   */
  spells: Spell[];

  /**
   * List of items
   * @default []
   */
  items: InventoryItem[];

  /**
   * Character's profile information
   */
  profile: Profile;

  /**
   * Character's current exhaustion level (0-6)
   */
  exhaustion: number;

  /**
   * Current conditions affecting the character
   * @default []
   */
  conditions: Condition[];

  /**
   * Proficiencies of the character
   * @default []
   */
  proficiencies: Proficiency[];

  /**
   * Death saves of the character
   */
  deathSaves?: {
    /**
     * Amount of successes
     * @default 0
     */
    successes: number;

    /**
     * Amount of failures
     * @default 0
     */
    failures: number;
  };

  background?: Background;
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
   * @default 1
   */
  level: number;

  /**
   * Subclass name (e.g., "School of Evocation" for Wizard)
   */
  subclass?: string;

  /**
   * Hit dice used for healing
   */
  hitDice: HitDice;

  /**
   * Amount of hit dice already used
   * Max amount is the class level
   * @default 0
   */
  hitDiceUsed: number;
}

export type HitDice = "d6" | "d8" | "d10" | "d12";

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

/**
 * Schema definition for a single inventory item
 */
export interface InventoryItem {
  /**
   * Unique identifier for the item
   */
  id: number;

  /**
   * Name of the item
   */
  name: string;

  /**
   * Detailed description of the item
   */
  description: string;

  /**
   * Whether the item is currently equipped by the character
   */
  isEquiped: boolean;

  /**
   * Whether the item is magical in nature
   */
  isMagic: boolean;

  /**
   * Whether the item can contain other items
   */
  isContainer: boolean;

  /**
   * Whether the item is consumed on use
   */
  isConsumable: boolean;

  /**
   * Whether the item is currently attuned to the character
   */
  isAttuned: boolean;

  /**
   * Whether the item can be attuned to
   */
  canAttune: boolean;

  /**
   * Weight of the item in kilograms
   */
  weight: number;

  /**
   * Rarity level of the item (common, uncommon, rare, etc)
   */
  rarity: string;

  /**
   * Type of item (weapon, armor, potion, etc)
   */
  type: InventoryItemType | string;

  /**
   * Base damage number for weapons
   */
  damage?: number;

  /**
   * Type of damage dealt by the item
   */
  damageType?: DamageType;

  /**
   * Range in meters for ranged weapons
   */
  range?: number;

  /**
   * Long range in meters for ranged weapons
   */
  longRange?: number;

  /**
   * Bonus to armor class provided by armor or shields
   */
  armorClassBonus?: number;

  /**
   * Capacity of the item
   */
  capacity?: number;

  /**
   * Quantity of the item
   */
  quantity: number;

  /**
   * Price of the item
   */
  price?: Currencies;

  /**
   * Penalties to the character's stats (ex. heavy armor, etc)
   */
  penalty: Penalty[];
}

export interface Penalty {
  /**
   * Type of penalty
   */
  type: PenaltyType;

  /**
   * Penalty value
   */
  penalty: number;

  /**
   * Stat affected by the penalty
   */
  stat?: StatsType;

  /**
   * Skill affected by the penalty
   */
  skill?: SkillsType;
}

/**
 * Definition of available penalty types
 */
export type PenaltyType =
  | "skill"
  | "savingThrow"
  | "speed"
  | "armorClass"
  | "attackRoll"
  | "damageRoll"
  | "hp";

/**
 * Definition of available inventory item types
 */
export type InventoryItemType = "weapon" | "armor" | "potion" | "tool";

/**
 * Definition of available damage types
 */
export type DamageType =
  | "acid"
  | "bludgeoning"
  | "cold"
  | "fire"
  | "force"
  | "lightning"
  | "necrotic"
  | "piercing"
  | "poison"
  | "psychic"
  | "radiant"
  | "slashing"
  | "thunder";

/**
 * Schema definition for a character profile
 */
export interface Profile {
  /**
   * Character's age
   */
  age?: number;

  /**
   * Character's gender
   */
  gender?: string;

  /**
   * Character's height
   */
  height?: number;

  /**
   * Character's weight
   */
  weight?: number;

  /**
   * Character's eyes color
   */
  eyes?: string;

  /**
   * Character's faith
   */
  faith?: string;

  /**
   * Character's hair color
   */
  hair?: string;

  /**
   * Character's skin color
   */
  skin?: string;

  /**
   * Character's lifestyle
   */
  lifestyle?: Lifestyle;

  /**
   * Character's alignment
   */
  alignment?: Alignment;

  /**
   * Languages known by the character
   */
  languages?: string[];
}

/**
 * Schema definition for a character lifestyle
 */
export interface Lifestyle {
  /**
   * Name of the lifestyle
   */
  name:
    | "wretched"
    | "squalid"
    | "poor"
    | "modest"
    | "comfortable"
    | "wealthy"
    | "aristocratic";

  /**
   * Cost of the lifestyle
   */
  cost: Currencies;
}

/**
 * Schema definition for a single spell
 */
export interface Spell {
  /**
   * Unique identifier for the spell
   */
  id: number;

  /**
   * Indicates if the spell is prepared or not
   */
  isPrepared: boolean;

  /**
   * Indicates if the spell is a cantrip
   */
  isCantrip: boolean;

  /**
   * Range of the spell
   */
  range: Range;

  /**
   * Level of the spell
   */
  level: number;

  /**
   * Bonus to the spell when cast at higher levels
   */
  atHigherLevels?: SpellAtHigherLevels;

  /**
   * Components required to cast the spell
   */
  component: SpellComponent[];

  /**
   * Name of the spell
   */
  name: string;

  /**
   * Description of the spell
   */
  description: string;

  /**
   * Duration of the spell
   */
  duration: SpellDuration;

  /**
   * Indicates if the spell needs concentration
   */
  needConcentration: boolean;

  /**
   * Type of the spell
   */
  castAs: "action" | "bonus_action" | "reaction" | "ritual";

  /**
   * Damage type of the spell
   * Nullable when the spell doesn't deal damage
   */
  damageType?: DamageType;

  /**
   * Save DC (Difficulty Class) of the spell
   * Nullable when the spell isn't cast against a creature/character
   */
  save?: Stat;

  /**
   * Amount of healing the spell deals
   * Nullable when the spell doesn't deal healing
   */
  heals?: Dice;

  /**
   * Amount of damage the spell deals
   * Nullable when the spell doesn't deal damage
   */
  damage?: Dice;
}

/**
 * Schema definition for a spell range
 */
export interface Range {
  /**
   * Distance of the range
   * Is zero for touch and self
   */
  distance: number;

  /**
   * Type of the range
   */
  type: "touch" | "self" | "cone" | "sphere" | "line" | "cube" | "cylinder";
}

/**
 * Types of components required to cast a spell
 */
export type SpellComponent = "verbal" | "somatic" | "material" | "focus";

/**
 * Schema definition for casting a spell at higher levels
 */
export interface SpellAtHigherLevels {
  /**
   * Level of the spell
   */
  level: number;

  /**
   * Bonus to the spell
   */
  bonus: Dice;
}

/**
 * Schema definition for a dice roll
 * Can be used for damage, healing, bonuses, etc.
 */
export interface Dice {
  /**
   * Number of d4s
   */
  d4?: number;

  /**
   * Number of d6s
   */
  d6?: number;

  /**
   * Number of d8s
   */
  d8?: number;

  /**
   * Number of d10s
   */
  d10?: number;

  /**
   * Number of d12s
   */
  d12?: number;

  /**
   * Number of d20s
   */
  d20?: number;

  /**
   * Number of d100s
   */
  d100?: number;

  /**
   * Indicates if the dice roll has advantage
   */
  hasAdvantage?: boolean;

  /**
   * Indicates if the dice roll has disadvantage
   */
  hasDisadvantage?: boolean;

  /**
   * Indicates if the dice roll is summed
   * Skill checks get the higher value, so it's set to false;
   * Damage rolls, Healing, etc get the sum of all dice, so it's set to true;
   * @default false
   */
  isSum?: boolean;
}

/**
 * Schema definition for a spell duration
 */
export interface SpellDuration {
  /**
   * Duration time, specified by the unit
   */
  duration: number;

  /**
   * Unit of the duration
   */
  unit:
    | "instantaneous"
    | "round"
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "permanent"
    | "until_dispelled";
}

export type Condition =
  | "blinded"
  | "charmed"
  | "deafened"
  | "exhausted"
  | "frightened"
  | "grappled"
  | "incapacitated"
  | "invisible"
  | "paralyzed"
  | "petrified"
  | "poisoned"
  | "prone"
  | "restrained"
  | "stunned"
  | "unconscious";

export type ArmorType = "light" | "medium" | "heavy" | "shield";

export type WeaponType = "simple" | "martial";

export type ArtisanTool =
  | "alchemist_supplies"
  | "brewer_supplies"
  | "calligrapher_supplies"
  | "carpenter_tools"
  | "cartographer_tools"
  | "cobbler_tools"
  | "cook_utensils"
  | "glassblower_tools"
  | "jeweler_tools"
  | "leatherworker_tools"
  | "mason_tools"
  | "painter_supplies"
  | "potter_tools"
  | "smith_tools"
  | "tinker_tools"
  | "weaver_tools"
  | "woodcarver_tools";

export type GamingSet =
  | "dice_set"
  | "dragonchess_set"
  | "playing_card_set"
  | "three_dragon_ante_set";

export type MusicalInstrument =
  | "bagpipes"
  | "drum"
  | "dulcimer"
  | "flute"
  | "lute"
  | "lyre"
  | "horn"
  | "pan_flute"
  | "shawm"
  | "viol";

export type Kit =
  | "disguise_kit"
  | "forgery_kit"
  | "herbalism_kit"
  | "poisoners_kit"
  | "thieves_tools"
  | "navigator_tools"
  | "healer_kit";

export type Vehicle = "land_vehicles" | "water_vehicles";

export type ToolType =
  | ArtisanTool
  | GamingSet
  | MusicalInstrument
  | Kit
  | Vehicle;

export interface Proficiency {
  /**
   * Type of proficiency
   * Note: Saving throws and skills are not included in this list, both are handled separately
   */
  type: "armor" | "weapon" | "tool";

  /**
   * Proficiency value
   */
  proficiency: ArmorType | WeaponType | ToolType;
}

/**
 * Schema definition for a character background
 */
export interface Background {
  /**
   * Name of the background
   */
  name: string;

  /**
   * Description of the background
   */
  description?: string;

  /**
   * Special features provided by the background
   */
  features?: string[];
  // TODO: Add features structures (there's a TODO related to it in the start of this document)

  /**
   * Character personality traits from background
   */
  traits?: string[];

  /**
   * Character ideals from background
   */
  ideals?: string[];

  /**
   * Character bonds from background
   */
  bonds?: string[];

  /**
   * Character flaws from background
   */
  flaws?: string[];
}

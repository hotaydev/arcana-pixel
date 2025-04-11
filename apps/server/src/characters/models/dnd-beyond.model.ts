// Generated using https://transform.tools/json-to-typescript and a character JSON export from D&D Beyond

export interface IDndBeyondCharacter {
  id: number;
  userId: number;
  username: string;
  isAssignedToPlayer: boolean;
  readonlyUrl: string;
  decorations: Decorations;
  name: string;
  socialName?: unknown;
  gender?: unknown;
  faith: string;
  age?: unknown;
  hair?: unknown;
  eyes?: unknown;
  skin?: unknown;
  height?: unknown;
  weight?: unknown;
  inspiration: boolean;
  baseHitPoints: number;
  bonusHitPoints: number;
  overrideHitPoints?: unknown;
  removedHitPoints: number;
  temporaryHitPoints: number;
  currentXp: number;
  alignmentId: number;
  lifestyleId: number;
  stats: Stat[];
  bonusStats: Stat[];
  overrideStats: Stat[];
  background: Background;
  race: Race;
  raceDefinitionId?: unknown;
  raceDefinitionTypeId?: unknown;
  notes: Notes;
  traits: Traits;
  preferences: Preferences;
  configuration: Configuration;
  lifestyle?: unknown;
  inventory: Inventory[];
  currencies: Currencies;
  classes: Class[];
  feats: unknown[];
  features?: unknown;
  customDefenseAdjustments: unknown[];
  customSenses: unknown[];
  customSpeeds: unknown[];
  customProficiencies: unknown[];
  customActions: unknown[];
  characterValues: unknown[];
  conditions: unknown[];
  deathSaves: DeathSaves;
  adjustmentXp?: unknown;
  spellSlots: SpellSlot[];
  pactMagic: PactMagic[];
  activeSourceCategories: number[];
  spells: Spells;
  options: Options;
  choices: Choices;
  actions: Actions;
  modifiers: Modifiers;
  classSpells: ClassSpell[];
  customItems: unknown[];
  campaign?: unknown;
  creatures: unknown[];
  optionalOrigins: unknown[];
  optionalClassFeatures: unknown[];
  dateModified: string;
  providedFrom: string;
  canEdit: boolean;
  status: number;
  statusSlug?: unknown;
  campaignSetting?: unknown;
}

interface Decorations {
  avatarUrl: string;
  frameAvatarUrl?: unknown;
  backdropAvatarUrl?: unknown;
  smallBackdropAvatarUrl?: unknown;
  largeBackdropAvatarUrl?: unknown;
  thumbnailBackdropAvatarUrl?: unknown;
  defaultBackdrop: DefaultBackdrop;
  avatarId: number;
  portraitDecorationKey: string;
  frameAvatarDecorationKey?: unknown;
  frameAvatarId?: unknown;
  backdropAvatarDecorationKey?: unknown;
  backdropAvatarId?: unknown;
  smallBackdropAvatarDecorationKey: string;
  smallBackdropAvatarId?: unknown;
  largeBackdropAvatarDecorationKey: string;
  largeBackdropAvatarId?: unknown;
  thumbnailBackdropAvatarDecorationKey: string;
  thumbnailBackdropAvatarId?: unknown;
  themeColor?: unknown;
}

interface DefaultBackdrop {
  backdropAvatarUrl: string;
  smallBackdropAvatarUrl: string;
  largeBackdropAvatarUrl: string;
  thumbnailBackdropAvatarUrl: string;
}

interface Stat {
  id: number;
  name?: string;
  value: number;
}

interface Background {
  hasCustomBackground: boolean;
  definition: Definition;
  definitionId?: unknown;
  customBackground: CustomBackground;
}

interface Definition {
  id: number;
  entityTypeId: number;
  definitionKey: string;
  name: string;
  description: string;
  snippet: string;
  shortDescription: string;
  skillProficienciesDescription: string;
  toolProficienciesDescription: string;
  languagesDescription: string;
  equipmentDescription: string;
  featureName: string;
  featureDescription: string;
  avatarUrl?: unknown;
  largeAvatarUrl?: unknown;
  suggestedCharacteristicsDescription: string;
  suggestedProficiencies?: unknown;
  suggestedLanguages?: unknown;
  organization?: unknown;
  contractsDescription: string;
  spellsPreDescription: string;
  spellsPostDescription: string;
  personalityTraits: PersonalityTrait[];
  ideals: Ideal[];
  bonds: Bond[];
  flaws: Flaw[];
  isHomebrew: boolean;
  sources: Source[];
  spellListIds: unknown[];
  featList?: unknown;
  grantedFeats: unknown[];
}

interface PersonalityTrait {
  id: number;
  description: string;
  diceRoll: number;
}

interface Ideal {
  id: number;
  description: string;
  diceRoll: number;
}

interface Bond {
  id: number;
  description: string;
  diceRoll: number;
}

interface Flaw {
  id: number;
  description: string;
  diceRoll: number;
}

interface Source {
  sourceId: number;
  pageNumber?: unknown;
  sourceType: number;
}

interface CustomBackground {
  id: number;
  entityTypeId: number;
  name?: unknown;
  description?: unknown;
  featuresBackground?: unknown;
  characteristicsBackground?: unknown;
  featuresBackgroundDefinitionId?: unknown;
  characteristicsBackgroundDefinitionId?: unknown;
  backgroundType?: unknown;
}

interface Race {
  isSubRace: boolean;
  baseRaceName: string;
  entityRaceId: number;
  entityRaceTypeId: number;
  definitionKey: string;
  fullName: string;
  baseRaceId: number;
  baseRaceTypeId: number;
  description: string;
  avatarUrl: string;
  largeAvatarUrl: string;
  portraitAvatarUrl: string;
  moreDetailsUrl: string;
  isHomebrew: boolean;
  isLegacy: boolean;
  groupIds: number[];
  type: number;
  supportsSubrace?: unknown;
  subRaceShortName?: unknown;
  baseName: string;
  racialTraits: RacialTrait[];
  weightSpeeds: WeightSpeeds;
  featIds: unknown[];
  size?: unknown;
  sizeId: number;
  sources: Source3[];
}

interface RacialTrait {
  definition: Definition2;
}

interface Definition2 {
  id: number;
  definitionKey: string;
  entityTypeId: number;
  displayOrder: number;
  name: string;
  description: string;
  snippet?: string;
  hideInBuilder: boolean;
  hideInSheet: boolean;
  activation?: unknown;
  sourceId: number;
  sourcePageNumber: number;
  creatureRules: unknown[];
  spellListIds: unknown[];
  featureType: number;
  sources: Source2[];
  affectedFeatureDefinitionKeys: unknown[];
  isCalledOut: boolean;
  entityType: string;
  entityID: string;
  entityRaceId: number;
  entityRaceTypeId: number;
  displayConfiguration: DisplayConfiguration;
  requiredLevel?: unknown;
  categories: Category[];
}

interface Source2 {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
}

interface DisplayConfiguration {
  RACIALTRAIT: number;
  ABILITYSCORE: number;
  LANGUAGE: number;
  CLASSFEATURE: number;
}

interface Category {
  id: number;
  entityTypeId: number;
  entityId: number;
  definitionKey: string;
  entityTagId: number;
  tagName: string;
}

interface WeightSpeeds {
  normal: Normal;
  encumbered?: unknown;
  heavilyEncumbered?: unknown;
  pushDragLift?: unknown;
  override?: unknown;
}

interface Normal {
  walk: number;
  fly: number;
  burrow: number;
  swim: number;
  climb: number;
}

interface Source3 {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
}

interface Notes {
  allies?: unknown;
  personalPossessions: string;
  otherHoldings?: unknown;
  organizations?: unknown;
  enemies?: unknown;
  backstory?: unknown;
  otherNotes: string;
}

interface Traits {
  personalityTraits?: unknown;
  ideals?: unknown;
  bonds?: unknown;
  flaws?: unknown;
  appearance?: unknown;
}

interface Preferences {
  useHomebrewContent: boolean;
  progressionType: number;
  encumbranceType: number;
  ignoreCoinWeight: boolean;
  hitPointType: number;
  showUnarmedStrike: boolean;
  showScaledSpells: boolean;
  primarySense: number;
  primaryMovement: number;
  privacyType: number;
  sharingType: number;
  abilityScoreDisplayType: number;
  enforceFeatRules: boolean;
  enforceMulticlassRules: boolean;
  enableOptionalClassFeatures: boolean;
  enableOptionalOrigins: boolean;
  enableDarkMode: boolean;
  enableContainerCurrency: boolean;
}

interface Configuration {
  startingEquipmentType: number;
  abilityScoreType: number;
  showHelpText: boolean;
}

interface Inventory {
  id: number;
  entityTypeId: number;
  definition: Definition3;
  definitionId: number;
  definitionTypeId: number;
  displayAsAttack?: unknown;
  quantity: number;
  isAttuned: boolean;
  equipped: boolean;
  equippedEntityTypeId?: number;
  equippedEntityId?: number;
  chargesUsed: number;
  limitedUse?: unknown;
  containerEntityId: number;
  containerEntityTypeId: number;
  containerDefinitionKey: string;
  currency?: unknown;
}

interface Definition3 {
  id: number;
  baseTypeId: number;
  entityTypeId: number;
  definitionKey: string;
  canEquip: boolean;
  magic: boolean;
  name: string;
  snippet?: unknown;
  weight: number;
  weightMultiplier: number;
  capacity?: string;
  capacityWeight: number;
  type: string;
  description: string;
  canAttune: boolean;
  attunementDescription?: unknown;
  rarity: string;
  isHomebrew: boolean;
  version?: unknown;
  sourceId?: unknown;
  sourcePageNumber?: unknown;
  stackable: boolean;
  bundleSize: number;
  avatarUrl?: unknown;
  largeAvatarUrl?: unknown;
  filterType: string;
  cost: number;
  isPack: boolean;
  tags: string[];
  grantedModifiers: unknown[];
  subType?: string;
  isConsumable: boolean;
  weaponBehaviors: unknown[];
  baseItemId?: number;
  baseArmorName?: unknown;
  strengthRequirement?: unknown;
  armorClass?: unknown;
  stealthCheck?: unknown;
  damage?: Damage;
  damageType?: string;
  fixedDamage?: unknown;
  properties?: Property[];
  attackType?: number;
  categoryId?: number;
  range?: number;
  longRange?: number;
  isMonkWeapon: boolean;
  levelInfusionGranted?: unknown;
  sources: Source4[];
  armorTypeId?: unknown;
  gearTypeId?: number;
  groupedId?: unknown;
  canBeAddedToInventory: boolean;
  isContainer: boolean;
  isCustomItem: boolean;
  isLegacy: boolean;
}

interface Damage {
  diceCount: number;
  diceValue: number;
  diceMultiplier?: unknown;
  fixedValue?: unknown;
  diceString: string;
}

interface Property {
  id: number;
  name: string;
  description: string;
  notes?: unknown;
}

interface Source4 {
  sourceId: number;
  pageNumber?: unknown;
  sourceType: number;
}

interface Currencies {
  cp: number;
  sp: number;
  gp: number;
  ep: number;
  pp: number;
}

interface Class {
  id: number;
  entityTypeId: number;
  level: number;
  isStartingClass: boolean;
  hitDiceUsed: number;
  definitionId: number;
  subclassDefinitionId?: unknown;
  definition: Definition4;
  subclassDefinition: SubclassDefinition;
  classFeatures: ClassFeature3[];
}

interface Definition4 {
  id: number;
  definitionKey: string;
  name: string;
  description: string;
  equipmentDescription: string;
  parentClassId?: unknown;
  avatarUrl: string;
  largeAvatarUrl: string;
  portraitAvatarUrl: string;
  moreDetailsUrl: string;
  spellCastingAbilityId: number;
  sources: Source5[];
  classFeatures: ClassFeature[];
  hitDice: number;
  wealthDice: WealthDice;
  canCastSpells: boolean;
  knowsAllSpells: boolean;
  spellPrepareType?: unknown;
  spellCastingLearningStyle?: unknown;
  spellContainerName?: unknown;
  sourcePageNumber: number;
  subclassDefinition?: unknown;
  isHomebrew: boolean;
  primaryAbilities: number[];
  spellRules: SpellRules;
  prerequisites: Prerequisite[];
}

interface Source5 {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
}

interface ClassFeature {
  id: number;
  name: string;
  prerequisite?: unknown;
  description: string;
  requiredLevel: number;
  displayOrder: number;
}

interface WealthDice {
  diceCount: number;
  diceValue: number;
  diceMultiplier: number;
  fixedValue?: unknown;
  diceString: string;
}

interface SpellRules {
  multiClassSpellSlotDivisor: number;
  isRitualSpellCaster: boolean;
  levelCantripsKnownMaxes: number[];
  levelSpellKnownMaxes: number[];
  levelSpellSlots: number[][];
  multiClassSpellSlotRounding: number;
  levelPreparedSpellMaxes: unknown[];
}

interface Prerequisite {
  description: string;
  prerequisiteMappings: PrerequisiteMapping[];
  hidePrerequisite: boolean;
}

interface PrerequisiteMapping {
  id: number;
  entityId: number;
  entityTypeId: number;
  type: string;
  subType: string;
  value: number;
  friendlyTypeName: string;
  friendlySubTypeName: string;
}

interface SubclassDefinition {
  id: number;
  definitionKey: string;
  name: string;
  description: string;
  equipmentDescription?: unknown;
  parentClassId: number;
  avatarUrl?: unknown;
  largeAvatarUrl?: unknown;
  portraitAvatarUrl?: unknown;
  moreDetailsUrl: string;
  spellCastingAbilityId: number;
  sources: Source6[];
  classFeatures: ClassFeature2[];
  hitDice: number;
  wealthDice?: unknown;
  canCastSpells: boolean;
  knowsAllSpells: boolean;
  spellPrepareType?: unknown;
  spellCastingLearningStyle?: unknown;
  spellContainerName?: unknown;
  sourcePageNumber: number;
  subclassDefinition?: unknown;
  isHomebrew: boolean;
  primaryAbilities?: unknown;
  spellRules?: unknown;
  prerequisites?: unknown;
}

interface Source6 {
  sourceId: number;
  pageNumber: number;
  sourceType: number;
}

interface ClassFeature2 {
  id: number;
  name: string;
  prerequisite?: unknown;
  description: string;
  requiredLevel: number;
  displayOrder: number;
}

interface ClassFeature3 {
  definition: Definition5;
  levelScale?: unknown;
}

interface Definition5 {
  id: number;
  definitionKey: string;
  entityTypeId: number;
  displayOrder: number;
  name: string;
  description: string;
  snippet: string;
  activation?: unknown;
  multiClassDescription: string;
  requiredLevel: number;
  isSubClassFeature: boolean;
  limitedUse: LimitedUse[];
  hideInBuilder: boolean;
  hideInSheet: boolean;
  sourceId: number;
  sourcePageNumber?: number;
  creatureRules: unknown[];
  levelScales: unknown[];
  infusionRules: unknown[];
  spellListIds: unknown[];
  classId: number;
  featureType: number;
  sources: Source7[];
  affectedFeatureDefinitionKeys: unknown[];
  entityType: string;
  entityID: string;
  grantedFeats: unknown[];
}

interface LimitedUse {
  level?: unknown;
  uses: number;
}

interface Source7 {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
}

interface DeathSaves {
  failCount?: unknown;
  successCount?: unknown;
  isStabilized: boolean;
}

interface SpellSlot {
  level: number;
  used: number;
  available: number;
}

interface PactMagic {
  level: number;
  used: number;
  available: number;
}

interface Spells {
  race: Race2[];
  class: unknown[];
  background?: unknown;
  item: unknown[];
  feat: unknown[];
}

interface Race2 {
  overrideSaveDc?: unknown;
  limitedUse?: LimitedUse2;
  id: number;
  entityTypeId: number;
  definition: Definition6;
  definitionId: number;
  prepared: boolean;
  countsAsKnownSpell: boolean;
  usesSpellSlot: boolean;
  castAtLevel?: number;
  alwaysPrepared: boolean;
  restriction: string;
  spellCastingAbilityId: number;
  displayAsAttack?: unknown;
  additionalDescription?: unknown;
  castOnlyAsRitual: boolean;
  ritualCastingType?: unknown;
  range: Range2;
  activation: Activation2;
  baseLevelAtWill: boolean;
  atWillLimitedUseLevel?: unknown;
  isSignatureSpell?: unknown;
  componentId: number;
  componentTypeId: number;
  spellListId?: unknown;
}

interface LimitedUse2 {
  name?: unknown;
  statModifierUsesId?: unknown;
  resetType: number;
  numberUsed: number;
  minNumberConsumed?: unknown;
  maxNumberConsumed: number;
  maxUses: number;
  operator: number;
  useProficiencyBonus: boolean;
  proficiencyBonusOperator: number;
  resetDice?: unknown;
}

interface Definition6 {
  id: number;
  definitionKey: string;
  name: string;
  level: number;
  school: string;
  duration: Duration;
  activation: Activation;
  range: Range;
  asPartOfWeaponAttack: boolean;
  description: string;
  snippet: string;
  concentration: boolean;
  ritual: boolean;
  rangeArea?: unknown;
  damageEffect?: unknown;
  components: number[];
  componentsDescription: string;
  saveDcAbilityId?: number;
  healing?: unknown;
  healingDice: unknown[];
  tempHpDice: unknown[];
  attackType?: unknown;
  canCastAtHigherLevel: boolean;
  isHomebrew: boolean;
  version?: unknown;
  sourceId?: unknown;
  sourcePageNumber: number;
  requiresSavingThrow: boolean;
  requiresAttackRoll: boolean;
  atHigherLevels: AtHigherLevels;
  modifiers: Modifier[];
  conditions: unknown[];
  tags: string[];
  castingTimeDescription: string;
  scaleType?: string;
  sources: Source8[];
  spellGroups: unknown[];
  isLegacy: boolean;
}

interface Duration {
  durationInterval: number;
  durationUnit?: string;
  durationType: string;
}

interface Activation {
  activationTime: number;
  activationType: number;
}

interface Range {
  origin: string;
  rangeValue: number;
  aoeType?: string;
  aoeValue?: number;
}

interface AtHigherLevels {
  higherLevelDefinitions: unknown[];
  additionalAttacks: unknown[];
  additionalTargets: unknown[];
  areaOfEffect: unknown[];
  duration: unknown[];
  creatures: unknown[];
  special: unknown[];
  points: unknown[];
  range: unknown[];
}

interface Modifier {
  fixedValue?: unknown;
  id: string;
  entityId?: unknown;
  entityTypeId?: unknown;
  type: string;
  subType: string;
  dice?: unknown;
  restriction: string;
  statId?: unknown;
  requiresAttunement: boolean;
  duration?: unknown;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: unknown[];
  value?: unknown;
  availableToMulticlass?: unknown;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  die: Die;
  count: number;
  durationUnit?: unknown;
  usePrimaryStat: boolean;
  atHigherLevels: AtHigherLevels2;
}

interface Die {
  diceCount: number;
  diceValue: number;
  diceMultiplier?: unknown;
  fixedValue?: unknown;
  diceString: string;
}

interface AtHigherLevels2 {
  higherLevelDefinitions: HigherLevelDefinition[];
  additionalAttacks: unknown[];
  additionalTargets: unknown[];
  areaOfEffect: unknown[];
  duration: unknown[];
  creatures: unknown[];
  special: unknown[];
  points: unknown[];
  range: unknown[];
}

interface HigherLevelDefinition {
  level: number;
  typeId: number;
  dice: Dice;
  value?: unknown;
  details: string;
}

interface Dice {
  diceCount: number;
  diceValue: number;
  diceMultiplier?: unknown;
  fixedValue: number;
  diceString: string;
}

interface Source8 {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
}

interface Range2 {
  origin: string;
  rangeValue: number;
  aoeType?: string;
  aoeValue?: number;
}

interface Activation2 {
  activationTime: number;
  activationType: number;
}

interface Options {
  race: unknown[];
  class: Class2[];
  background?: unknown;
  item?: unknown;
  feat: unknown[];
}

interface Class2 {
  componentId: number;
  componentTypeId: number;
  definition: Definition7;
}

interface Definition7 {
  id: number;
  entityTypeId: number;
  name: string;
  description: string;
  snippet: string;
  activation?: unknown;
  sourceId: number;
  sourcePageNumber?: unknown;
  creatureRules: unknown[];
  spellListIds: unknown[];
}

interface Choices {
  race: unknown[];
  class: Class3[];
  background: Background2[];
  item?: unknown;
  feat: unknown[];
  choiceDefinitions: ChoiceDefinition[];
  definitionKeyNameMap?: unknown;
}

interface Class3 {
  componentId: number;
  componentTypeId: number;
  id: string;
  parentChoiceId?: string;
  type: number;
  subType?: number;
  optionValue: number;
  label?: string;
  isOptional: boolean;
  isInfinite: boolean;
  defaultSubtypes: unknown[];
  displayOrder?: number;
  options: unknown[];
  optionIds: number[];
  tagConstraints: unknown[];
}

interface Background2 {
  componentId: number;
  componentTypeId: number;
  id: string;
  parentChoiceId?: unknown;
  type: number;
  subType: number;
  optionValue: number;
  label: string;
  isOptional: boolean;
  isInfinite: boolean;
  defaultSubtypes: string[];
  displayOrder?: unknown;
  options: unknown[];
  optionIds: number[];
  tagConstraints: unknown[];
}

interface ChoiceDefinition {
  id: string;
  options: Option[];
}

interface Option {
  id: number;
  label: string;
  description?: string;
  sourceId?: unknown;
}

interface Actions {
  race: unknown[];
  class: Class4[];
  background?: unknown;
  item?: unknown;
  feat: unknown[];
}

interface Class4 {
  componentId: number;
  componentTypeId: number;
  id: string;
  entityTypeId: string;
  limitedUse?: LimitedUse3;
  name: string;
  description: string;
  snippet: string;
  abilityModifierStatId?: unknown;
  onMissDescription: string;
  saveFailDescription: string;
  saveSuccessDescription: string;
  saveStatId?: unknown;
  fixedSaveDc?: unknown;
  attackTypeRange?: unknown;
  actionType: number;
  attackSubtype?: unknown;
  dice?: unknown;
  value?: unknown;
  damageTypeId?: unknown;
  isMartialArts: boolean;
  isProficient: boolean;
  spellRangeType?: unknown;
  displayAsAttack?: unknown;
  range: Range3;
  activation: Activation3;
  numberOfTargets?: unknown;
  fixedToHit?: unknown;
  ammunition?: unknown;
}

interface LimitedUse3 {
  name?: unknown;
  statModifierUsesId?: unknown;
  resetType: number;
  numberUsed: number;
  minNumberConsumed: number;
  maxNumberConsumed: number;
  maxUses: number;
  operator: number;
  useProficiencyBonus: boolean;
  proficiencyBonusOperator: number;
  resetDice?: unknown;
}

interface Range3 {
  range?: unknown;
  longRange?: unknown;
  aoeType?: unknown;
  aoeSize?: unknown;
  hasAoeSpecialDescription: boolean;
  minimumRange?: unknown;
}

interface Activation3 {
  activationTime?: number;
  activationType: number;
}

interface Modifiers {
  race: Race3[];
  class: Class5[];
  background: Background3[];
  item: unknown[];
  feat: unknown[];
  condition: unknown[];
}

interface Race3 {
  fixedValue?: number;
  id: string;
  entityId: number;
  entityTypeId: number;
  type: string;
  subType: string;
  dice?: unknown;
  restriction: string;
  statId?: unknown;
  requiresAttunement: boolean;
  duration?: unknown;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: unknown[];
  value?: number;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: unknown[];
}

interface Class5 {
  fixedValue?: number;
  id: string;
  entityId?: number;
  entityTypeId?: number;
  type: string;
  subType: string;
  dice?: unknown;
  restriction?: string;
  statId?: unknown;
  requiresAttunement: boolean;
  duration?: unknown;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: unknown[];
  value?: number;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: unknown[];
}

interface Background3 {
  fixedValue?: unknown;
  id: string;
  entityId: number;
  entityTypeId: number;
  type: string;
  subType: string;
  dice?: unknown;
  restriction: string;
  statId?: unknown;
  requiresAttunement: boolean;
  duration?: unknown;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: unknown[];
  value?: unknown;
  availableToMulticlass: boolean;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  tagConstraints: unknown[];
}

interface ClassSpell {
  entityTypeId: number;
  characterClassId: number;
  spells: Spell[];
}

interface Spell {
  overrideSaveDc?: unknown;
  limitedUse?: unknown;
  id: number;
  entityTypeId: number;
  definition: Definition8;
  definitionId: number;
  prepared: boolean;
  countsAsKnownSpell: boolean;
  usesSpellSlot: boolean;
  castAtLevel?: unknown;
  alwaysPrepared: boolean;
  restriction?: unknown;
  spellCastingAbilityId?: unknown;
  displayAsAttack?: unknown;
  additionalDescription?: unknown;
  castOnlyAsRitual: boolean;
  ritualCastingType?: unknown;
  range: Range5;
  activation: Activation5;
  baseLevelAtWill: boolean;
  atWillLimitedUseLevel?: unknown;
  isSignatureSpell?: unknown;
  componentId: number;
  componentTypeId: number;
  spellListId?: unknown;
}

interface Definition8 {
  id: number;
  definitionKey: string;
  name: string;
  level: number;
  school: string;
  duration: Duration2;
  activation: Activation4;
  range: Range4;
  asPartOfWeaponAttack: boolean;
  description: string;
  snippet: string;
  concentration: boolean;
  ritual: boolean;
  rangeArea?: unknown;
  damageEffect?: unknown;
  components: number[];
  componentsDescription: string;
  saveDcAbilityId?: number;
  healing?: unknown;
  healingDice: unknown[];
  tempHpDice: unknown[];
  attackType?: number;
  canCastAtHigherLevel: boolean;
  isHomebrew: boolean;
  version?: unknown;
  sourceId?: unknown;
  sourcePageNumber: number;
  requiresSavingThrow: boolean;
  requiresAttackRoll: boolean;
  atHigherLevels: AtHigherLevels3;
  modifiers: Modifier2[];
  conditions: unknown[];
  tags: string[];
  castingTimeDescription: string;
  scaleType?: string;
  sources: Source9[];
  spellGroups: unknown[];
  isLegacy: boolean;
}

interface Duration2 {
  durationInterval: number;
  durationUnit?: string;
  durationType: string;
}

interface Activation4 {
  activationTime: number;
  activationType: number;
}

interface Range4 {
  origin: string;
  rangeValue?: number;
  aoeType?: unknown;
  aoeValue?: unknown;
}

interface AtHigherLevels3 {
  higherLevelDefinitions: HigherLevelDefinition2[];
  additionalAttacks: unknown[];
  additionalTargets: unknown[];
  areaOfEffect: unknown[];
  duration: unknown[];
  creatures: unknown[];
  special: unknown[];
  points: unknown[];
  range: unknown[];
}

interface HigherLevelDefinition2 {
  level?: unknown;
  typeId: number;
  dice?: unknown;
  value: number;
  details: string;
}

interface Modifier2 {
  fixedValue?: unknown;
  id: string;
  entityId?: unknown;
  entityTypeId?: unknown;
  type: string;
  subType: string;
  dice?: unknown;
  restriction: string;
  statId?: unknown;
  requiresAttunement: boolean;
  duration?: unknown;
  friendlyTypeName: string;
  friendlySubtypeName: string;
  isGranted: boolean;
  bonusTypes: unknown[];
  value?: unknown;
  availableToMulticlass?: unknown;
  modifierTypeId: number;
  modifierSubTypeId: number;
  componentId: number;
  componentTypeId: number;
  die: Die2;
  count: number;
  durationUnit?: unknown;
  usePrimaryStat: boolean;
  atHigherLevels: AtHigherLevels4;
}

interface Die2 {
  diceCount?: number;
  diceValue?: number;
  diceMultiplier?: unknown;
  fixedValue?: number;
  diceString?: string;
}

interface AtHigherLevels4 {
  higherLevelDefinitions: HigherLevelDefinition3[];
  additionalAttacks: unknown[];
  additionalTargets: unknown[];
  areaOfEffect: unknown[];
  duration: unknown[];
  creatures: unknown[];
  special: unknown[];
  points: unknown[];
  range: unknown[];
}

interface HigherLevelDefinition3 {
  level: number;
  typeId: number;
  dice?: Dice2;
  value?: number;
  details: string;
}

interface Dice2 {
  diceCount: number;
  diceValue: number;
  diceMultiplier?: unknown;
  fixedValue: number;
  diceString: string;
}

interface Source9 {
  sourceId: number;
  pageNumber?: number;
  sourceType: number;
}

interface Range5 {
  origin: string;
  rangeValue?: number;
  aoeType?: unknown;
  aoeValue?: unknown;
}

interface Activation5 {
  activationTime: number;
  activationType: number;
}

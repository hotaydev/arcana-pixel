// Extracted from official D&D Beyond API: https://character-service.dndbeyond.com/swagger/index.html?urls.primaryName=V5#model-Waterdeep.DataContracts.Latest.Character.CharacterContract

export interface IDndBeyondCharacter {
  id?: number;
  userId?: number;
  username?: string | null;
  isAssignedToPlayer?: boolean;
  readonlyUrl?: string | null;
  decorations?: CharacterDecoration;
  name?: string | null;
  socialName?: string | null;
  gender?: string | null;
  faith?: string | null;
  age?: number | null;
  hair?: string | null;
  eyes?: string | null;
  skin?: string | null;
  height?: string | null;
  weight?: number | null;
  inspiration?: boolean | null;
  baseHitPoints?: number;
  bonusHitPoints?: number | null;
  overrideHitPoints?: number | null;
  removedHitPoints?: number;
  temporaryHitPoints?: number | null;
  currentXp?: number;
  alignmentId?: number | null;
  lifestyleId?: number | null;
  stats?: Stat[] | null;
  bonusStats?: Stat[] | null;
  overrideStats?: Stat[] | null;
  background?: Background;
  race?: RaceDefinition;
  raceDefinitionId?: number | null;
  raceDefinitionTypeId?: number | null;
  notes?: CharacterNotes;
  traits?: CharacterTraits;
  preferences?: CharacterPreferences;
  configuration?: CharacterConfiguration;
  lifestyle?: CharacterLifestyle;
  inventory?: ItemBaseInventory[] | null;
  currencies?: CharacterCurrency;
  classes?: ClassClassDetails[] | null;
  feats?: FeatFeatDetails[] | null;
  features?: CharacterFeatureMapping[] | null;
  customDefenseAdjustments?: CharacterDefenseAdjustment[] | null;
  customSenses?: CustomSense[] | null;
  customSpeeds?: CustomSpeed[] | null;
  customProficiencies?: CustomProficiency[] | null;
  customActions?: CustomAction[] | null;
  characterValues?: CharacterValues[] | null;
  conditions?: CharacterCondition[] | null;
  deathSaves?: CharacterDeathSave;
  adjustmentXp?: number | null;
  spellSlots?: SpellSpellSlot[] | null;
  pactMagic?: SpellSpellSlot[] | null;
  activeSourceCategories?: number[] | null;
  spells?: SpellSpellComponents;
  options?: CharacterOptionComponents;
  choices?: CharacterChoiceComponents;
  actions?: CharacterActionComponents;
  modifiers?: CharacterModifierComponents;
  classSpells?: SpellClassSpellComponents[] | null;
  customItems?: CharacterCustomItem[] | null;
  campaign?: CharacterCampaignData;
  creatures?: MonsterCreature[] | null;
  optionalOrigins?: CharacterOptionalOrigin[] | null;
  optionalClassFeatures?: CharacterOptionalClassFeature[] | null;
  /** @format date-time */
  dateModified?: string;
  providedFrom?: string | null;
  canEdit?: boolean;
  status?: number;
  statusSlug?: string | null;
  campaignSetting?: CampaignSettingCharacterCampaignSetting;
}

interface CharacterDecoration {
  avatarUrl?: string | null;
  frameAvatarUrl?: string | null;
  backdropAvatarUrl?: string | null;
  smallBackdropAvatarUrl?: string | null;
  largeBackdropAvatarUrl?: string | null;
  thumbnailBackdropAvatarUrl?: string | null;
  defaultBackdrop?: Record<string, string>;
  avatarId?: number | null;
  portraitDecorationKey?: string | null;
  frameAvatarDecorationKey?: string | null;
  frameAvatarId?: number | null;
  backdropAvatarDecorationKey?: string | null;
  backdropAvatarId?: number | null;
  smallBackdropAvatarDecorationKey?: string | null;
  smallBackdropAvatarId?: number | null;
  largeBackdropAvatarDecorationKey?: string | null;
  largeBackdropAvatarId?: number | null;
  thumbnailBackdropAvatarDecorationKey?: string | null;
  thumbnailBackdropAvatarId?: number | null;
  themeColor?: CharacterThemeColor;
}

interface CharacterThemeColor {
  themeColorId?: number | null;
  themeColor?: string | null;
  backgroundColor?: string | null;
  name?: string | null;
  raceId?: number | null;
  subRaceId?: number | null;
  classId?: number | null;
  tags?: string[] | null;
  decorationKey?: string | null;
}

interface Stat {
  id?: number;
  name?: string | null;
  value?: number | null;
}

interface Background {
  hasCustomBackground?: boolean;
  definition?: BackgroundDefinition;
  definitionId?: number | null;
  customBackground?: BackgroundCustomBackground;
}

interface BackgroundDefinition {
  id?: number;
  entityTypeId?: number;
  definitionKey?: string | null;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  shortDescription?: string | null;
  skillProficienciesDescription?: string | null;
  toolProficienciesDescription?: string | null;
  languagesDescription?: string | null;
  equipmentDescription?: string | null;
  featureName?: string | null;
  featureDescription?: string | null;
  avatarUrl?: string | null;
  largeAvatarUrl?: string | null;
  suggestedCharacteristicsDescription?: string | null;
  /** @deprecated */
  suggestedProficiencies?: string[] | null;
  /** @deprecated */
  suggestedLanguages?: string[] | null;
  organization?: BackgroundOrganization;
  contractsDescription?: string | null;
  spellsPreDescription?: string | null;
  spellsPostDescription?: string | null;
  personalityTraits?: BackgroundCharacteristic[] | null;
  ideals?: BackgroundCharacteristic[] | null;
  bonds?: BackgroundCharacteristic[] | null;
  flaws?: BackgroundCharacteristic[] | null;
  isHomebrew?: boolean;
  sources?: SourceMapping[] | null;
  spellListIds?: number[] | null;
  featList?: FeatFeatList;
  grantedFeats?: FeatFeatList[] | null;
}

interface BackgroundCustomBackground {
  id?: number;
  entityTypeId?: number;
  name?: string | null;
  description?: string | null;
  featuresBackground?: BackgroundDefinition;
  characteristicsBackground?: BackgroundDefinition;
  featuresBackgroundDefinitionId?: number | null;
  characteristicsBackgroundDefinitionId?: number | null;
  backgroundType?: number | null;
}

interface BackgroundOrganization {
  id?: number;
  name?: string | null;
  description?: string | null;
}

interface BackgroundCharacteristic {
  id?: number;
  description?: string | null;
  diceRoll?: number;
}

interface SourceMapping {
  sourceId?: number;
  pageNumber?: number | null;
  sourceType?: WaterdeepDataContractsSourceType;
}

/** @format int32 */
export enum WaterdeepDataContractsSourceType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}
interface FeatFeatList {
  id?: number;
  name?: string | null;
  featIds?: number[] | null;
}

interface RaceDefinition {
  isSubRace?: boolean;
  baseRaceName?: string | null;
  entityRaceId?: number;
  entityRaceTypeId?: number;
  definitionKey?: string | null;
  fullName?: string | null;
  baseRaceId?: number | null;
  baseRaceTypeId?: number | null;
  description?: string | null;
  avatarUrl?: string | null;
  largeAvatarUrl?: string | null;
  portraitAvatarUrl?: string | null;
  moreDetailsUrl?: string | null;
  isHomebrew?: boolean;
  isLegacy?: boolean;
  groupIds?: number[] | null;
  type?: number;
  supportsSubrace?: boolean | null;
  subRaceShortName?: string | null;
  baseName?: string | null;
  racialTraits?: RaceRacialTrait[] | null;
  weightSpeeds?: WeightSpeed;
  featIds?: number[] | null;
  size?: string | null;
  sizeId?: number;
  sources?: SourceMapping[] | null;
}

interface RaceRacialTrait {
  definition?: RaceRacialTraitDefinition;
}

interface RaceRacialTraitDefinition {
  id?: number;
  definitionKey?: string | null;
  entityTypeId?: number;
  displayOrder?: number | null;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  hideInBuilder?: boolean;
  hideInSheet?: boolean;
  activation?: Activation;
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  creatureRules?: EntityCreature[] | null;
  spellListIds?: number[] | null;
  featureType?: number;
  sources?: SourceMapping[] | null;
  affectedFeatureDefinitionKeys?: string[] | null;
  isCalledOut?: boolean;
  entityType?: string | null;
  entityID?: string | null;
  entityRaceId?: number;
  entityRaceTypeId?: number;
  displayConfiguration?: Record<string, number>;
  requiredLevel?: number | null;
  categories?: EntityTagEntityTagMapping[] | null;
}

interface Activation {
  activationTime?: number | null;
  activationType?: number | null;
}

interface EntityTagEntityTagMapping {
  id?: number;
  entityTypeId?: number;
  entityId?: number;
  definitionKey?: string | null;
  entityTagId?: number;
  tagName?: string | null;
}

interface EntityCreature {
  creatureGroupId?: number;
  monsterTypeId?: number | null;
  maxChallengeRatingId?: number | null;
  levelDivisor?: number | null;
  monsterIds?: number[] | null;
  movementIds?: number[] | null;
  sizeIds?: number[] | null;
}

interface WeightSpeed {
  normal?: Movement;
  encumbered?: Movement;
  heavilyEncumbered?: Movement;
  pushDragLift?: Movement;
  override?: Movement;
}

interface Movement {
  walk?: number | null;
  fly?: number | null;
  burrow?: number | null;
  swim?: number | null;
  climb?: number | null;
}

interface CharacterNotes {
  allies?: string | null;
  personalPossessions?: string | null;
  otherHoldings?: string | null;
  organizations?: string | null;
  enemies?: string | null;
  backstory?: string | null;
  otherNotes?: string | null;
}

interface CharacterTraits {
  personalityTraits?: string | null;
  ideals?: string | null;
  bonds?: string | null;
  flaws?: string | null;
  appearance?: string | null;
}

interface CampaignSettingCharacterCampaignSetting {
  campaignSettingId?: number;
  enabledSourceIds?: number[] | null;
}

interface CharacterOptionalClassFeature {
  classFeatureId?: number;
  affectedClassFeatureId?: number | null;
  classFeatureDefinitionKey?: string | null;
  affectedClassFeatureDefinitionKey?: string | null;
}

interface CharacterOptionalOrigin {
  racialTraitId?: number;
  affectedRacialTraitId?: number | null;
  racialTraitDefinitionKey?: string | null;
  affectedRacialTraitDefinitionKey?: string | null;
}

interface MonsterCreature {
  id?: number;
  entityTypeId?: number;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
  removedHitPoints?: number;
  temporaryHitPoints?: number | null;
  groupId?: number;
  definition?: MonsterMonsterDefinition;
}

interface MonsterMonsterDefinition {
  id?: number;
  entityTypeId?: number;
  name?: string | null;
  alignmentId?: number | null;
  sizeId?: number;
  typeId?: number;
  armorClass?: number;
  armorClassDescription?: string | null;
  averageHitPoints?: number;
  hitPointDice?: Dice;
  movements?: MonsterMonsterMovement[] | null;
  passivePerception?: number | null;
  isHomebrew?: boolean;
  challengeRatingId?: number;
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  isLegendary?: boolean;
  isMythic?: boolean;
  hasLair?: boolean;
  avatarUrl?: string | null;
  largeAvatarUrl?: string | null;
  basicAvatarUrl?: string | null;
  version?: string | null;
  swarm?: MonsterMonsterSwarm;
  subTypes?: number[] | null;
  environments?: number[] | null;
  tags?: string[] | null;
  sources?: SourceMapping[] | null;
  stats?: MonsterMonsterStat[] | null;
  senses?: MonsterMonsterSense[] | null;
  damageAdjustments?: number[] | null;
  conditionImmunities?: number[] | null;
  savingThrows?: MonsterMonsterSavingThrow[] | null;
  skills?: MonsterMonsterSkill[] | null;
  languages?: MonsterMonsterLanguage[] | null;
  specialTraitsDescription?: string | null;
  actionsDescription?: string | null;
  reactionsDescription?: string | null;
  legendaryActionsDescription?: string | null;
  mythicActionsDescription?: string | null;
  bonusActionsDescription?: string | null;
  characteristicsDescription?: string | null;
  lairDescription?: string | null;
  languageDescription?: string | null;
  languageNote?: string | null;
  hideCr?: boolean;
  isLegacy?: boolean;
  statBlockType?: number;
  initiative?: MonsterMonsterInitiative;
  lairChallengeRatingId?: number | null;
  gear?: string | null;
  slug?: string | null;
}

interface MonsterMonsterInitiative {
  score?: number;
  bonus?: number;
}

interface MonsterMonsterSwarm {
  name?: string | null;
  sizeId?: number;
  typeId?: number;
}

interface MonsterMonsterStat {
  statId?: number;
  name?: string | null;
  value?: number | null;
}

interface MonsterMonsterSense {
  senseId?: number;
  notes?: string | null;
}

interface MonsterMonsterSavingThrow {
  statId?: number;
  bonusModifier?: number | null;
}

interface MonsterMonsterSkill {
  skillId?: number;
  value?: number;
  additionalBonus?: number | null;
}

interface MonsterMonsterLanguage {
  languageId?: number;
  notes?: string | null;
}

interface Dice {
  diceCount?: number | null;
  diceValue?: number | null;
  diceMultiplier?: number | null;
  fixedValue?: number | null;
  diceString?: string | null;
}

interface MonsterMonsterMovement {
  movementId?: number;
  speed?: number;
  notes?: string | null;
}

interface SpellSpellSlot {
  level?: number;
  used?: number;
  available?: number;
}

interface CharacterCampaignData {
  id?: number;
  name?: string | null;
  description?: string | null;
  link?: string | null;
  publicNotes?: string | null;
  dmUserId?: number;
  dmUsername?: string | null;
  characters?: CharacterCampaignCharacter[] | null;
}

interface CharacterCampaignCharacter {
  userId?: number;
  username?: string | null;
  characterId?: number;
  characterName?: string | null;
  characterUrl?: string | null;
  avatarUrl?: string | null;
  privacyType?: number;
  campaignId?: number | null;
  isAssigned?: boolean;
}

interface CharacterCustomItem {
  id?: number;
  name?: string | null;
  description?: string | null;
  /** @format double */
  weight?: number | null;
  cost?: number | null;
  quantity?: number | null;
  notes?: string | null;
}

interface SpellClassSpellComponents {
  entityTypeId?: number;
  characterClassId?: number;
  spells?: SpellBaseSpell[] | null;
}

interface SpellBaseSpell {
  overrideSaveDc?: number | null;
  limitedUse?: EntityLimitedUse;
  id?: number | null;
  entityTypeId?: number | null;
  definition?: SpellSpellDefinition;
  definitionId?: number;
  prepared?: boolean;
  countsAsKnownSpell?: boolean | null;
  usesSpellSlot?: boolean;
  castAtLevel?: number | null;
  alwaysPrepared?: boolean;
  restriction?: string | null;
  spellCastingAbilityId?: number | null;
  displayAsAttack?: boolean | null;
  additionalDescription?: string | null;
  castOnlyAsRitual?: boolean;
  ritualCastingType?: number | null;
  range?: Range;
  activation?: Activation;
  baseLevelAtWill?: boolean;
  atWillLimitedUseLevel?: number | null;
  isSignatureSpell?: boolean | null;
  componentId?: number;
  componentTypeId?: number;
  spellListId?: number | null;
}

interface Range {
  origin?: string | null;
  rangeValue?: number | null;
  aoeType?: string | null;
  aoeValue?: number | null;
}

interface SpellSpellDefinition {
  id?: number;
  definitionKey?: string | null;
  name?: string | null;
  level?: number;
  school?: string | null;
  duration?: SpellSpellDuration;
  activation?: Activation;
  range?: Range;
  asPartOfWeaponAttack?: boolean;
  description?: string | null;
  snippet?: string | null;
  concentration?: boolean;
  ritual?: boolean;
  rangeArea?: string | null;
  damageEffect?: string | null;
  components?: number[] | null;
  componentsDescription?: string | null;
  saveDcAbilityId?: number | null;
  healing?: string | null;
  healingDice?: Dice[] | null;
  tempHpDice?: Dice[] | null;
  attackType?: number | null;
  canCastAtHigherLevel?: boolean;
  isHomebrew?: boolean;
  version?: string | null;
  /**
   * @deprecated
   * @format int32
   */
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  requiresSavingThrow?: boolean;
  requiresAttackRoll?: boolean;
  atHigherLevels?: SpellHigherLevel;
  modifiers?: SpellSpellModifier[] | null;
  conditions?: SpellSpellCondition[] | null;
  tags?: string[] | null;
  castingTimeDescription?: string | null;
  scaleType?: string | null;
  sources?: SourceMapping[] | null;
  spellGroups?: number[] | null;
  isLegacy?: boolean;
}

interface SpellSpellCondition {
  type?: number | null;
  conditionId?: number;
  conditionDuration?: number;
  durationUnit?: string | null;
  exception?: string | null;
}

interface SpellSpellModifier {
  fixedValue?: number | null;
  id?: string | null;
  entityId?: number | null;
  entityTypeId?: number | null;
  type?: string | null;
  subType?: string | null;
  dice?: Dice;
  restriction?: string | null;
  statId?: number | null;
  requiresAttunement?: boolean;
  duration?: Duration;
  friendlyTypeName?: string | null;
  friendlySubtypeName?: string | null;
  isGranted?: boolean;
  bonusTypes?: number[] | null;
  value?: number | null;
  availableToMulticlass?: boolean | null;
  modifierTypeId?: number;
  modifierSubTypeId?: number;
  componentId?: number;
  componentTypeId?: number;
  die?: Dice;
  count?: number;
  durationUnit?: string | null;
  usePrimaryStat?: boolean;
  atHigherLevels?: SpellHigherLevel;
}

interface SpellHigherLevel {
  higherLevelDefinitions?: SpellHigherLevelDefinition[] | null;
  additionalAttacks?: SpellHigherLevelEntry[] | null;
  additionalTargets?: SpellHigherLevelEntry[] | null;
  areaOfEffect?: SpellHigherLevelEntry[] | null;
  duration?: SpellHigherLevelEntry[] | null;
  creatures?: SpellHigherLevelEntry[] | null;
  special?: SpellHigherLevelEntry[] | null;
  points?: SpellHigherLevelEntry[] | null;
  range?: SpellHigherLevelEntry[] | null;
}

interface SpellHigherLevelDefinition {
  level?: number | null;
  typeId?: number;
  dice?: Dice;
  value?: number | null;
  details?: string | null;
}

interface SpellHigherLevelEntry {
  level?: number | null;
  description?: string | null;
  extendedAoe?: number | null;
  totalCount?: number;
  die?: Dice;
  targets?: number;
  range?: number | null;
}

interface Duration {
  durationInterval?: number;
  durationUnit?: string | null;
}

interface SpellSpellDuration {
  durationInterval?: number;
  durationUnit?: string | null;
  durationType?: string | null;
}

interface EntityLimitedUse {
  name?: string | null;
  statModifierUsesId?: number | null;
  resetType?: number | null;
  numberUsed?: number;
  minNumberConsumed?: number | null;
  maxNumberConsumed?: number;
  maxUses?: number;
  operator?: number | null;
  useProficiencyBonus?: boolean;
  proficiencyBonusOperator?: number | null;
  resetDice?: Dice;
}

interface CharacterModifierComponents {
  race?: Modifier[] | null;
  class?: Modifier[] | null;
  background?: Modifier[] | null;
  item?: Modifier[] | null;
  feat?: Modifier[] | null;
  condition?: Modifier[] | null;
}

interface Modifier {
  fixedValue?: number | null;
  id?: string | null;
  entityId?: number | null;
  entityTypeId?: number | null;
  type?: string | null;
  subType?: string | null;
  dice?: Dice;
  restriction?: string | null;
  statId?: number | null;
  requiresAttunement?: boolean;
  duration?: Duration;
  friendlyTypeName?: string | null;
  friendlySubtypeName?: string | null;
  isGranted?: boolean;
  bonusTypes?: number[] | null;
  value?: number | null;
  availableToMulticlass?: boolean | null;
  modifierTypeId?: number;
  modifierSubTypeId?: number;
  componentId?: number;
  componentTypeId?: number;
  tagConstraints?: EntityTagEntityTagConstraint[] | null;
}

interface EntityTagEntityTagConstraint {
  id?: number;
  parentComponentTypeId?: number;
  parentComponentId?: number;
  entityModifierId?: number;
  entityTagId?: number;
  definitionKey?: string | null;
  tagName?: string | null;
}

interface CharacterActionComponents {
  race?: Action[] | null;
  class?: Action[] | null;
  background?: Action[] | null;
  item?: Action[] | null;
  feat?: Action[] | null;
}

interface Action {
  componentId?: number;
  componentTypeId?: number;
  id?: string | null;
  entityTypeId?: string | null;
  limitedUse?: EntityLimitedUse;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  abilityModifierStatId?: number | null;
  onMissDescription?: string | null;
  saveFailDescription?: string | null;
  saveSuccessDescription?: string | null;
  saveStatId?: number | null;
  fixedSaveDc?: number | null;
  attackTypeRange?: number | null;
  actionType?: number | null;
  attackSubtype?: number | null;
  dice?: Dice;
  value?: number | null;
  damageTypeId?: number | null;
  isMartialArts?: boolean;
  isProficient?: boolean;
  spellRangeType?: number | null;
  displayAsAttack?: boolean | null;
  range?: ActionRange;
  activation?: Activation;
  numberOfTargets?: number | null;
  fixedToHit?: number | null;
  ammunition?: Ammunition[] | null;
}

interface ActionRange {
  range?: number | null;
  longRange?: number | null;
  aoeType?: number | null;
  aoeSize?: number | null;
  hasAoeSpecialDescription?: boolean;
  minimumRange?: number | null;
}

interface Ammunition {
  definitionKey?: string | null;
  quantity?: number;
  custom?: string | null;
}

interface CharacterChoiceComponents {
  race?: CharacterBuilderChoice[] | null;
  class?: CharacterBuilderChoice[] | null;
  background?: CharacterBuilderChoice[] | null;
  item?: CharacterBuilderChoice[] | null;
  feat?: CharacterBuilderChoice[] | null;
  choiceDefinitions?: CharacterChoiceDefinition[] | null;
  definitionKeyNameMap?: Record<string, string>;
}

interface CharacterBuilderChoice {
  componentId?: number;
  componentTypeId?: number;
  id?: string | null;
  parentChoiceId?: string | null;
  type?: number;
  subType?: number | null;
  optionValue?: number | null;
  label?: string | null;
  isOptional?: boolean;
  isInfinite?: boolean;
  defaultSubtypes?: string[] | null;
  displayOrder?: number | null;
  options?: CharacterBuilderChoiceOption[] | null;
  optionIds?: number[] | null;
  tagConstraints?: EntityTagEntityTagConstraint[] | null;
}

interface CharacterBuilderChoiceOption {
  id?: number;
  label?: string | null;
  description?: string | null;
  sourceId?: number | null;
}

interface CharacterChoiceDefinition {
  id?: string | null;
  options?: CharacterBuilderChoiceOption[] | null;
}

interface SpellSpellComponents {
  race?: SpellBaseSpell[] | null;
  class?: SpellBaseSpell[] | null;
  background?: SpellBaseSpell[] | null;
  item?: SpellBaseSpell[] | null;
  feat?: SpellBaseSpell[] | null;
}

interface CharacterOptionComponents {
  race?: CharacterOption[] | null;
  class?: CharacterOption[] | null;
  background?: CharacterOption[] | null;
  item?: CharacterOption[] | null;
  feat?: CharacterOption[] | null;
}

interface CharacterOption {
  componentId?: number;
  componentTypeId?: number;
  definition?: EntityOptionDefinition;
}

interface EntityOptionDefinition {
  id?: number;
  entityTypeId?: number;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  activation?: Activation;
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  creatureRules?: EntityCreature[] | null;
  spellListIds?: number[] | null;
}

interface CharacterDeathSave {
  failCount?: number | null;
  successCount?: number | null;
  isStabilized?: boolean;
}

interface CharacterCondition {
  id?: number;
  level?: number | null;
}

interface CharacterValues {
  typeId?: number;
  value?: object | null;
  notes?: string | null;
  valueId?: string | null;
  valueTypeId?: string | null;
  contextId?: string | null;
  contextTypeId?: string | null;
}

interface CustomAction {
  id?: string | null;
  entityTypeId?: string | null;
  name?: string | null;
  toHitBonus?: number | null;
  description?: string | null;
  snippet?: string | null;
  isProficient?: boolean;
  isOffhand?: boolean | null;
  statId?: number | null;
  rangeId?: number | null;
  diceCount?: number | null;
  diceType?: number | null;
  fixedValue?: number | null;
  damageTypeId?: number | null;
  onMissDescription?: string | null;
  saveFailDescription?: string | null;
  saveSuccessDescription?: string | null;
  saveStatId?: number | null;
  fixedSaveDc?: number | null;
  actionType?: number | null;
  attackSubtype?: number | null;
  range?: number | null;
  longRange?: number | null;
  aoeType?: number | null;
  aoeSize?: number | null;
  activationTime?: number | null;
  activationType?: number | null;
  isSilvered?: boolean;
  damageBonus?: number | null;
  isMartialArts?: boolean;
  spellRangeType?: number | null;
  displayAsAttack?: boolean | null;
}

interface CustomProficiency {
  id?: number;
  name?: string | null;
  type?: number;
  statId?: number | null;
  proficiencyLevel?: number;
  notes?: string | null;
  description?: string | null;
  override?: number | null;
  magicBonus?: number | null;
  miscBonus?: number | null;
}

interface CustomSpeed {
  movementId?: number;
  distance?: number | null;
  source?: string | null;
}

interface CustomSense {
  senseId?: number;
  distance?: number | null;
  source?: string | null;
}

interface CharacterDefenseAdjustment {
  adjustmentId?: number;
  source?: string | null;
  type?: number;
}

interface CharacterFeatureMapping {
  /** @format uuid */
  id?: string;
}

interface FeatFeatDetails {
  componentTypeId?: number | null;
  componentId?: number | null;
  definition?: FeatFeatDefinition;
  definitionId?: number;
}

interface FeatFeatDefinition {
  id?: number;
  entityTypeId?: number;
  definitionKey?: string | null;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  activation?: Activation;
  /**
   * @deprecated
   * @format int32
   */
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  creatureRules?: EntityCreature[] | null;
  prerequisites?: Prerequisite[] | null;
  isHomebrew?: boolean;
  sources?: SourceMapping[] | null;
  spellListIds?: number[] | null;
  isRepeatable?: boolean;
  repeatableParentId?: number | null;
  categories?: EntityTagEntityTagMapping[] | null;
}

interface Prerequisite {
  description?: string | null;
  prerequisiteMappings?: PrerequisiteMapping[] | null;
  hidePrerequisite?: boolean;
}

interface PrerequisiteMapping {
  id?: number;
  entityId?: number | null;
  entityTypeId?: number | null;
  type?: string | null;
  subType?: string | null;
  value?: number | null;
  friendlyTypeName?: string | null;
  friendlySubTypeName?: string | null;
}

interface ClassClassDetails {
  id?: number;
  entityTypeId?: number;
  level?: number;
  isStartingClass?: boolean;
  hitDiceUsed?: number;
  definitionId?: number;
  subclassDefinitionId?: number | null;
  definition?: ClassClassDefinition;
  subclassDefinition?: ClassClassDefinition;
  classFeatures?: ClassClassFeature[] | null;
}

interface ClassClassDefinition {
  id?: number;
  definitionKey?: string | null;
  name?: string | null;
  description?: string | null;
  equipmentDescription?: string | null;
  parentClassId?: number | null;
  avatarUrl?: string | null;
  largeAvatarUrl?: string | null;
  portraitAvatarUrl?: string | null;
  moreDetailsUrl?: string | null;
  spellCastingAbilityId?: number | null;
  sources?: SourceMapping[] | null;
  classFeatures?: ModelInfo[] | null;
  hitDice?: number;
  wealthDice?: Dice;
  canCastSpells?: boolean;
  knowsAllSpells?: boolean | null;
  spellPrepareType?: number | null;
  spellCastingLearningStyle?: number | null;
  spellContainerName?: string | null;
  sourcePageNumber?: number | null;
  subclassDefinition?: ClassClassDefinition;
  isHomebrew?: boolean;
  primaryAbilities?: number[] | null;
  spellRules?: ClassSpellConfiguration;
  prerequisites?: Prerequisite[] | null;
}

interface ClassSpellConfiguration {
  multiClassSpellSlotDivisor?: number | null;
  isRitualSpellCaster?: boolean;
  levelCantripsKnownMaxes?: number[] | null;
  levelSpellKnownMaxes?: number[] | null;
  levelSpellSlots?: number[][] | null;
  multiClassSpellSlotRounding?: number | null;
  levelPreparedSpellMaxes?: number[] | null;
}

interface ModelInfo {
  id?: number;
  name?: string | null;
  prerequisite?: string | null;
  description?: string | null;
  requiredLevel?: number | null;
  displayOrder?: number | null;
}

interface ClassClassFeature {
  definition?: ClassClassFeatureDefinition;
  levelScale?: LevelScale;
}

interface ClassClassFeatureDefinition {
  id?: number;
  definitionKey?: string | null;
  entityTypeId?: number;
  displayOrder?: number | null;
  name?: string | null;
  description?: string | null;
  snippet?: string | null;
  activation?: Activation;
  multiClassDescription?: string | null;
  requiredLevel?: number;
  /** @deprecated */
  isSubClassFeature?: boolean;
  limitedUse?: LimitedUseLevel[] | null;
  hideInBuilder?: boolean;
  hideInSheet?: boolean;
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  creatureRules?: EntityCreature[] | null;
  levelScales?: LevelScale[] | null;
  infusionRules?: InfusionChoiceRule[] | null;
  spellListIds?: number[] | null;
  classId?: number;
  featureType?: number;
  sources?: SourceMapping[] | null;
  affectedFeatureDefinitionKeys?: string[] | null;
  entityType?: string | null;
  entityID?: string | null;
  grantedFeats?: FeatFeatList[] | null;
}

interface LevelScale {
  id?: number;
  level?: number;
  description?: string | null;
  dice?: Dice;
  fixedValue?: number | null;
}

interface LimitedUseLevel {
  level?: number | null;
  uses?: number;
}

interface InfusionChoiceRule {
  level?: number;
  choiceKey?: string | null;
}

interface CharacterCurrency {
  cp?: number;
  sp?: number;
  gp?: number;
  ep?: number;
  pp?: number;
}

interface CharacterPreferences {
  useHomebrewContent?: boolean;
  progressionType?: number;
  encumbranceType?: number;
  ignoreCoinWeight?: boolean;
  hitPointType?: number;
  showUnarmedStrike?: boolean;
  showScaledSpells?: boolean;
  primarySense?: number;
  primaryMovement?: number;
  privacyType?: number;
  sharingType?: number;
  abilityScoreDisplayType?: number;
  enforceFeatRules?: boolean;
  enforceMulticlassRules?: boolean;
  enableOptionalClassFeatures?: boolean;
  enableOptionalOrigins?: boolean;
  enableDarkMode?: boolean;
  enableContainerCurrency?: boolean;
}

interface CharacterConfiguration {
  startingEquipmentType?: number | null;
  abilityScoreType?: number | null;
  showHelpText?: boolean | null;
}

interface CharacterLifestyle {
  id?: number | null;
  name?: string | null;
  description?: string | null;
  cost?: string | null;
}

interface ItemBaseInventory {
  id?: number;
  entityTypeId?: number;
  definition?: ItemBaseItemDefinition;
  definitionId?: number;
  definitionTypeId?: number;
  displayAsAttack?: boolean | null;
  quantity?: number;
  isAttuned?: boolean | null;
  equipped?: boolean | null;
  equippedEntityTypeId?: number | null;
  equippedEntityId?: number | null;
  chargesUsed?: number;
  limitedUse?: ItemItemLimitedUseData;
  containerEntityId?: number;
  containerEntityTypeId?: number;
  containerDefinitionKey?: string | null;
  currency?: CharacterCurrency;
}

interface ItemItemLimitedUseData {
  maxUses?: number;
  numberUsed?: number;
  resetType?: string | null;
  resetTypeDescription?: string | null;
}

interface ItemBaseItemDefinition {
  id?: number;
  baseTypeId?: number;
  entityTypeId?: number;
  definitionKey?: string | null;
  canEquip?: boolean;
  magic?: boolean;
  name?: string | null;
  snippet?: string | null;
  /** @format double */
  weight?: number;
  /** @format double */
  weightMultiplier?: number;
  capacity?: string | null;
  /** @format double */
  capacityWeight?: number;
  type?: string | null;
  description?: string | null;
  canAttune?: boolean;
  attunementDescription?: string | null;
  rarity?: string | null;
  isHomebrew?: boolean;
  version?: string | null;
  /**
   * @deprecated
   * @format int32
   */
  sourceId?: number | null;
  sourcePageNumber?: number | null;
  stackable?: boolean;
  bundleSize?: number;
  avatarUrl?: string | null;
  largeAvatarUrl?: string | null;
  filterType?: string | null;
  /** @format double */
  cost?: number | null;
  isPack?: boolean;
  tags?: string[] | null;
  grantedModifiers?: Modifier[] | null;
  subType?: string | null;
  isConsumable?: boolean;
  weaponBehaviors?: ItemBaseWeapon[] | null;
  baseItemId?: number | null;
  baseArmorName?: string | null;
  strengthRequirement?: number | null;
  armorClass?: number | null;
  stealthCheck?: number | null;
  damage?: Dice;
  damageType?: string | null;
  fixedDamage?: number | null;
  properties?: ItemWeaponProperty[] | null;
  attackType?: number | null;
  categoryId?: number | null;
  range?: number | null;
  longRange?: number | null;
  isMonkWeapon?: boolean;
  levelInfusionGranted?: number | null;
  sources?: SourceMapping[] | null;
  armorTypeId?: number | null;
  gearTypeId?: number | null;
  groupedId?: number | null;
  canBeAddedToInventory?: boolean;
  isContainer?: boolean;
  isCustomItem?: boolean;
  isLegacy?: boolean;
}

interface ItemWeaponProperty {
  id?: number;
  name?: string | null;
  description?: string | null;
  notes?: string | null;
}

interface ItemBaseWeapon {
  baseItemId?: number | null;
  baseTypeId?: number;
  type?: string | null;
  attackType?: number | null;
  categoryId?: number;
  properties?: ItemWeaponProperty[] | null;
  damage?: Dice;
  damageType?: string | null;
  range?: number | null;
  longRange?: number | null;
  isMonkWeapon?: boolean;
}

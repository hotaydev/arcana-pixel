// Generated using https://transform.tools/json-to-typescript and a character JSON export from D&D Beyond

export interface IDndBeyondCharacter {
	id: number;
	userId: number;
	username: string;
	isAssignedToPlayer: boolean;
	readonlyUrl: string;
	decorations: Decorations;
	name: string;
	socialName: any;
	gender: any;
	faith: string;
	age: any;
	hair: any;
	eyes: any;
	skin: any;
	height: any;
	weight: any;
	inspiration: boolean;
	baseHitPoints: number;
	bonusHitPoints: number;
	overrideHitPoints: any;
	removedHitPoints: number;
	temporaryHitPoints: number;
	currentXp: number;
	alignmentId: number;
	lifestyleId: number;
	stats: Stat[];
	bonusStats: BonusStat[];
	overrideStats: OverrideStat[];
	background: Background;
	race: Race;
	raceDefinitionId: any;
	raceDefinitionTypeId: any;
	notes: Notes;
	traits: Traits;
	preferences: Preferences;
	configuration: Configuration;
	lifestyle: any;
	inventory: Inventory[];
	currencies: Currencies;
	classes: Class[];
	feats: any[];
	features: any;
	customDefenseAdjustments: any[];
	customSenses: any[];
	customSpeeds: any[];
	customProficiencies: any[];
	customActions: any[];
	characterValues: any[];
	conditions: any[];
	deathSaves: DeathSaves;
	adjustmentXp: any;
	spellSlots: SpellSlot[];
	pactMagic: PactMagic[];
	activeSourceCategories: number[];
	spells: Spells;
	options: Options;
	choices: Choices;
	actions: Actions;
	modifiers: Modifiers;
	classSpells: ClassSpell[];
	customItems: any[];
	campaign: any;
	creatures: any[];
	optionalOrigins: any[];
	optionalClassFeatures: any[];
	dateModified: string;
	providedFrom: string;
	canEdit: boolean;
	status: number;
	statusSlug: any;
	campaignSetting: any;
}

export interface Decorations {
	avatarUrl: string;
	frameAvatarUrl: any;
	backdropAvatarUrl: any;
	smallBackdropAvatarUrl: any;
	largeBackdropAvatarUrl: any;
	thumbnailBackdropAvatarUrl: any;
	defaultBackdrop: DefaultBackdrop;
	avatarId: number;
	portraitDecorationKey: string;
	frameAvatarDecorationKey: any;
	frameAvatarId: any;
	backdropAvatarDecorationKey: any;
	backdropAvatarId: any;
	smallBackdropAvatarDecorationKey: string;
	smallBackdropAvatarId: any;
	largeBackdropAvatarDecorationKey: string;
	largeBackdropAvatarId: any;
	thumbnailBackdropAvatarDecorationKey: string;
	thumbnailBackdropAvatarId: any;
	themeColor: any;
}

export interface DefaultBackdrop {
	backdropAvatarUrl: string;
	smallBackdropAvatarUrl: string;
	largeBackdropAvatarUrl: string;
	thumbnailBackdropAvatarUrl: string;
}

export interface Stat {
	id: number;
	name: any;
	value: number;
}

export interface BonusStat {
	id: number;
	name: any;
	value: any;
}

export interface OverrideStat {
	id: number;
	name: any;
	value: any;
}

export interface Background {
	hasCustomBackground: boolean;
	definition: Definition;
	definitionId: any;
	customBackground: CustomBackground;
}

export interface Definition {
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
	avatarUrl: any;
	largeAvatarUrl: any;
	suggestedCharacteristicsDescription: string;
	suggestedProficiencies: any;
	suggestedLanguages: any;
	organization: any;
	contractsDescription: string;
	spellsPreDescription: string;
	spellsPostDescription: string;
	personalityTraits: PersonalityTrait[];
	ideals: Ideal[];
	bonds: Bond[];
	flaws: Flaw[];
	isHomebrew: boolean;
	sources: Source[];
	spellListIds: any[];
	featList: any;
	grantedFeats: any[];
}

export interface PersonalityTrait {
	id: number;
	description: string;
	diceRoll: number;
}

export interface Ideal {
	id: number;
	description: string;
	diceRoll: number;
}

export interface Bond {
	id: number;
	description: string;
	diceRoll: number;
}

export interface Flaw {
	id: number;
	description: string;
	diceRoll: number;
}

export interface Source {
	sourceId: number;
	pageNumber: any;
	sourceType: number;
}

export interface CustomBackground {
	id: number;
	entityTypeId: number;
	name: any;
	description: any;
	featuresBackground: any;
	characteristicsBackground: any;
	featuresBackgroundDefinitionId: any;
	characteristicsBackgroundDefinitionId: any;
	backgroundType: any;
}

export interface Race {
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
	supportsSubrace: any;
	subRaceShortName: any;
	baseName: string;
	racialTraits: RacialTrait[];
	weightSpeeds: WeightSpeeds;
	featIds: any[];
	size: any;
	sizeId: number;
	sources: Source3[];
}

export interface RacialTrait {
	definition: Definition2;
}

export interface Definition2 {
	id: number;
	definitionKey: string;
	entityTypeId: number;
	displayOrder: number;
	name: string;
	description: string;
	snippet?: string;
	hideInBuilder: boolean;
	hideInSheet: boolean;
	activation: any;
	sourceId: number;
	sourcePageNumber: number;
	creatureRules: any[];
	spellListIds: any[];
	featureType: number;
	sources: Source2[];
	affectedFeatureDefinitionKeys: any[];
	isCalledOut: boolean;
	entityType: string;
	entityID: string;
	entityRaceId: number;
	entityRaceTypeId: number;
	displayConfiguration: DisplayConfiguration;
	requiredLevel: any;
	categories: Category[];
}

export interface Source2 {
	sourceId: number;
	pageNumber: number;
	sourceType: number;
}

export interface DisplayConfiguration {
	RACIALTRAIT: number;
	ABILITYSCORE: number;
	LANGUAGE: number;
	CLASSFEATURE: number;
}

export interface Category {
	id: number;
	entityTypeId: number;
	entityId: number;
	definitionKey: string;
	entityTagId: number;
	tagName: string;
}

export interface WeightSpeeds {
	normal: Normal;
	encumbered: any;
	heavilyEncumbered: any;
	pushDragLift: any;
	override: any;
}

export interface Normal {
	walk: number;
	fly: number;
	burrow: number;
	swim: number;
	climb: number;
}

export interface Source3 {
	sourceId: number;
	pageNumber?: number;
	sourceType: number;
}

export interface Notes {
	allies: any;
	personalPossessions: string;
	otherHoldings: any;
	organizations: any;
	enemies: any;
	backstory: any;
	otherNotes: string;
}

export interface Traits {
	personalityTraits: any;
	ideals: any;
	bonds: any;
	flaws: any;
	appearance: any;
}

export interface Preferences {
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

export interface Configuration {
	startingEquipmentType: number;
	abilityScoreType: number;
	showHelpText: boolean;
}

export interface Inventory {
	id: number;
	entityTypeId: number;
	definition: Definition3;
	definitionId: number;
	definitionTypeId: number;
	displayAsAttack: any;
	quantity: number;
	isAttuned: boolean;
	equipped: boolean;
	equippedEntityTypeId?: number;
	equippedEntityId?: number;
	chargesUsed: number;
	limitedUse: any;
	containerEntityId: number;
	containerEntityTypeId: number;
	containerDefinitionKey: string;
	currency: any;
}

export interface Definition3 {
	id: number;
	baseTypeId: number;
	entityTypeId: number;
	definitionKey: string;
	canEquip: boolean;
	magic: boolean;
	name: string;
	snippet: any;
	weight: number;
	weightMultiplier: number;
	capacity?: string;
	capacityWeight: number;
	type: string;
	description: string;
	canAttune: boolean;
	attunementDescription: any;
	rarity: string;
	isHomebrew: boolean;
	version: any;
	sourceId: any;
	sourcePageNumber: any;
	stackable: boolean;
	bundleSize: number;
	avatarUrl: any;
	largeAvatarUrl: any;
	filterType: string;
	cost: number;
	isPack: boolean;
	tags: string[];
	grantedModifiers: any[];
	subType?: string;
	isConsumable: boolean;
	weaponBehaviors: any[];
	baseItemId?: number;
	baseArmorName: any;
	strengthRequirement: any;
	armorClass: any;
	stealthCheck: any;
	damage?: Damage;
	damageType?: string;
	fixedDamage: any;
	properties?: Property[];
	attackType?: number;
	categoryId?: number;
	range?: number;
	longRange?: number;
	isMonkWeapon: boolean;
	levelInfusionGranted: any;
	sources: Source4[];
	armorTypeId: any;
	gearTypeId?: number;
	groupedId: any;
	canBeAddedToInventory: boolean;
	isContainer: boolean;
	isCustomItem: boolean;
	isLegacy: boolean;
}

export interface Damage {
	diceCount: number;
	diceValue: number;
	diceMultiplier: any;
	fixedValue: any;
	diceString: string;
}

export interface Property {
	id: number;
	name: string;
	description: string;
	notes: any;
}

export interface Source4 {
	sourceId: number;
	pageNumber: any;
	sourceType: number;
}

export interface Currencies {
	cp: number;
	sp: number;
	gp: number;
	ep: number;
	pp: number;
}

export interface Class {
	id: number;
	entityTypeId: number;
	level: number;
	isStartingClass: boolean;
	hitDiceUsed: number;
	definitionId: number;
	subclassDefinitionId: any;
	definition: Definition4;
	subclassDefinition: SubclassDefinition;
	classFeatures: ClassFeature3[];
}

export interface Definition4 {
	id: number;
	definitionKey: string;
	name: string;
	description: string;
	equipmentDescription: string;
	parentClassId: any;
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
	spellPrepareType: any;
	spellCastingLearningStyle: any;
	spellContainerName: any;
	sourcePageNumber: number;
	subclassDefinition: any;
	isHomebrew: boolean;
	primaryAbilities: number[];
	spellRules: SpellRules;
	prerequisites: Prerequisite[];
}

export interface Source5 {
	sourceId: number;
	pageNumber: number;
	sourceType: number;
}

export interface ClassFeature {
	id: number;
	name: string;
	prerequisite: any;
	description: string;
	requiredLevel: number;
	displayOrder: number;
}

export interface WealthDice {
	diceCount: number;
	diceValue: number;
	diceMultiplier: number;
	fixedValue: any;
	diceString: string;
}

export interface SpellRules {
	multiClassSpellSlotDivisor: number;
	isRitualSpellCaster: boolean;
	levelCantripsKnownMaxes: number[];
	levelSpellKnownMaxes: number[];
	levelSpellSlots: number[][];
	multiClassSpellSlotRounding: number;
	levelPreparedSpellMaxes: any[];
}

export interface Prerequisite {
	description: string;
	prerequisiteMappings: PrerequisiteMapping[];
	hidePrerequisite: boolean;
}

export interface PrerequisiteMapping {
	id: number;
	entityId: number;
	entityTypeId: number;
	type: string;
	subType: string;
	value: number;
	friendlyTypeName: string;
	friendlySubTypeName: string;
}

export interface SubclassDefinition {
	id: number;
	definitionKey: string;
	name: string;
	description: string;
	equipmentDescription: any;
	parentClassId: number;
	avatarUrl: any;
	largeAvatarUrl: any;
	portraitAvatarUrl: any;
	moreDetailsUrl: string;
	spellCastingAbilityId: number;
	sources: Source6[];
	classFeatures: ClassFeature2[];
	hitDice: number;
	wealthDice: any;
	canCastSpells: boolean;
	knowsAllSpells: boolean;
	spellPrepareType: any;
	spellCastingLearningStyle: any;
	spellContainerName: any;
	sourcePageNumber: number;
	subclassDefinition: any;
	isHomebrew: boolean;
	primaryAbilities: any;
	spellRules: any;
	prerequisites: any;
}

export interface Source6 {
	sourceId: number;
	pageNumber: number;
	sourceType: number;
}

export interface ClassFeature2 {
	id: number;
	name: string;
	prerequisite: any;
	description: string;
	requiredLevel: number;
	displayOrder: number;
}

export interface ClassFeature3 {
	definition: Definition5;
	levelScale: any;
}

export interface Definition5 {
	id: number;
	definitionKey: string;
	entityTypeId: number;
	displayOrder: number;
	name: string;
	description: string;
	snippet: string;
	activation: any;
	multiClassDescription: string;
	requiredLevel: number;
	isSubClassFeature: boolean;
	limitedUse: LimitedUse[];
	hideInBuilder: boolean;
	hideInSheet: boolean;
	sourceId: number;
	sourcePageNumber?: number;
	creatureRules: any[];
	levelScales: any[];
	infusionRules: any[];
	spellListIds: any[];
	classId: number;
	featureType: number;
	sources: Source7[];
	affectedFeatureDefinitionKeys: any[];
	entityType: string;
	entityID: string;
	grantedFeats: any[];
}

export interface LimitedUse {
	level: any;
	uses: number;
}

export interface Source7 {
	sourceId: number;
	pageNumber?: number;
	sourceType: number;
}

export interface DeathSaves {
	failCount: any;
	successCount: any;
	isStabilized: boolean;
}

export interface SpellSlot {
	level: number;
	used: number;
	available: number;
}

export interface PactMagic {
	level: number;
	used: number;
	available: number;
}

export interface Spells {
	race: Race2[];
	class: any[];
	background: any;
	item: any[];
	feat: any[];
}

export interface Race2 {
	overrideSaveDc: any;
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
	displayAsAttack: any;
	additionalDescription: any;
	castOnlyAsRitual: boolean;
	ritualCastingType: any;
	range: Range2;
	activation: Activation2;
	baseLevelAtWill: boolean;
	atWillLimitedUseLevel: any;
	isSignatureSpell: any;
	componentId: number;
	componentTypeId: number;
	spellListId: any;
}

export interface LimitedUse2 {
	name: any;
	statModifierUsesId: any;
	resetType: number;
	numberUsed: number;
	minNumberConsumed: any;
	maxNumberConsumed: number;
	maxUses: number;
	operator: number;
	useProficiencyBonus: boolean;
	proficiencyBonusOperator: number;
	resetDice: any;
}

export interface Definition6 {
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
	rangeArea: any;
	damageEffect: any;
	components: number[];
	componentsDescription: string;
	saveDcAbilityId?: number;
	healing: any;
	healingDice: any[];
	tempHpDice: any[];
	attackType: any;
	canCastAtHigherLevel: boolean;
	isHomebrew: boolean;
	version: any;
	sourceId: any;
	sourcePageNumber: number;
	requiresSavingThrow: boolean;
	requiresAttackRoll: boolean;
	atHigherLevels: AtHigherLevels;
	modifiers: Modifier[];
	conditions: any[];
	tags: string[];
	castingTimeDescription: string;
	scaleType?: string;
	sources: Source8[];
	spellGroups: any[];
	isLegacy: boolean;
}

export interface Duration {
	durationInterval: number;
	durationUnit?: string;
	durationType: string;
}

export interface Activation {
	activationTime: number;
	activationType: number;
}

export interface Range {
	origin: string;
	rangeValue: number;
	aoeType?: string;
	aoeValue?: number;
}

export interface AtHigherLevels {
	higherLevelDefinitions: any[];
	additionalAttacks: any[];
	additionalTargets: any[];
	areaOfEffect: any[];
	duration: any[];
	creatures: any[];
	special: any[];
	points: any[];
	range: any[];
}

export interface Modifier {
	fixedValue: any;
	id: string;
	entityId: any;
	entityTypeId: any;
	type: string;
	subType: string;
	dice: any;
	restriction: string;
	statId: any;
	requiresAttunement: boolean;
	duration: any;
	friendlyTypeName: string;
	friendlySubtypeName: string;
	isGranted: boolean;
	bonusTypes: any[];
	value: any;
	availableToMulticlass: any;
	modifierTypeId: number;
	modifierSubTypeId: number;
	componentId: number;
	componentTypeId: number;
	die: Die;
	count: number;
	durationUnit: any;
	usePrimaryStat: boolean;
	atHigherLevels: AtHigherLevels2;
}

export interface Die {
	diceCount: number;
	diceValue: number;
	diceMultiplier: any;
	fixedValue: any;
	diceString: string;
}

export interface AtHigherLevels2 {
	higherLevelDefinitions: HigherLevelDefinition[];
	additionalAttacks: any[];
	additionalTargets: any[];
	areaOfEffect: any[];
	duration: any[];
	creatures: any[];
	special: any[];
	points: any[];
	range: any[];
}

export interface HigherLevelDefinition {
	level: number;
	typeId: number;
	dice: Dice;
	value: any;
	details: string;
}

export interface Dice {
	diceCount: number;
	diceValue: number;
	diceMultiplier: any;
	fixedValue: number;
	diceString: string;
}

export interface Source8 {
	sourceId: number;
	pageNumber?: number;
	sourceType: number;
}

export interface Range2 {
	origin: string;
	rangeValue: number;
	aoeType?: string;
	aoeValue?: number;
}

export interface Activation2 {
	activationTime: number;
	activationType: number;
}

export interface Options {
	race: any[];
	class: Class2[];
	background: any;
	item: any;
	feat: any[];
}

export interface Class2 {
	componentId: number;
	componentTypeId: number;
	definition: Definition7;
}

export interface Definition7 {
	id: number;
	entityTypeId: number;
	name: string;
	description: string;
	snippet: string;
	activation: any;
	sourceId: number;
	sourcePageNumber: any;
	creatureRules: any[];
	spellListIds: any[];
}

export interface Choices {
	race: any[];
	class: Class3[];
	background: Background2[];
	item: any;
	feat: any[];
	choiceDefinitions: ChoiceDefinition[];
	definitionKeyNameMap: DefinitionKeyNameMap;
}

export interface Class3 {
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
	defaultSubtypes: any[];
	displayOrder?: number;
	options: any[];
	optionIds: number[];
	tagConstraints: any[];
}

export interface Background2 {
	componentId: number;
	componentTypeId: number;
	id: string;
	parentChoiceId: any;
	type: number;
	subType: number;
	optionValue: number;
	label: string;
	isOptional: boolean;
	isInfinite: boolean;
	defaultSubtypes: string[];
	displayOrder: any;
	options: any[];
	optionIds: number[];
	tagConstraints: any[];
}

export interface ChoiceDefinition {
	id: string;
	options: Option[];
}

export interface Option {
	id: number;
	label: string;
	description?: string;
	sourceId: any;
}

export interface DefinitionKeyNameMap {}

export interface Actions {
	race: any[];
	class: Class4[];
	background: any;
	item: any;
	feat: any[];
}

export interface Class4 {
	componentId: number;
	componentTypeId: number;
	id: string;
	entityTypeId: string;
	limitedUse?: LimitedUse3;
	name: string;
	description: string;
	snippet: string;
	abilityModifierStatId: any;
	onMissDescription: string;
	saveFailDescription: string;
	saveSuccessDescription: string;
	saveStatId: any;
	fixedSaveDc: any;
	attackTypeRange: any;
	actionType: number;
	attackSubtype: any;
	dice: any;
	value: any;
	damageTypeId: any;
	isMartialArts: boolean;
	isProficient: boolean;
	spellRangeType: any;
	displayAsAttack: any;
	range: Range3;
	activation: Activation3;
	numberOfTargets: any;
	fixedToHit: any;
	ammunition: any;
}

export interface LimitedUse3 {
	name: any;
	statModifierUsesId: any;
	resetType: number;
	numberUsed: number;
	minNumberConsumed: number;
	maxNumberConsumed: number;
	maxUses: number;
	operator: number;
	useProficiencyBonus: boolean;
	proficiencyBonusOperator: number;
	resetDice: any;
}

export interface Range3 {
	range: any;
	longRange: any;
	aoeType: any;
	aoeSize: any;
	hasAoeSpecialDescription: boolean;
	minimumRange: any;
}

export interface Activation3 {
	activationTime?: number;
	activationType: number;
}

export interface Modifiers {
	race: Race3[];
	class: Class5[];
	background: Background3[];
	item: any[];
	feat: any[];
	condition: any[];
}

export interface Race3 {
	fixedValue?: number;
	id: string;
	entityId: number;
	entityTypeId: number;
	type: string;
	subType: string;
	dice: any;
	restriction: string;
	statId: any;
	requiresAttunement: boolean;
	duration: any;
	friendlyTypeName: string;
	friendlySubtypeName: string;
	isGranted: boolean;
	bonusTypes: any[];
	value?: number;
	availableToMulticlass: boolean;
	modifierTypeId: number;
	modifierSubTypeId: number;
	componentId: number;
	componentTypeId: number;
	tagConstraints: any[];
}

export interface Class5 {
	fixedValue?: number;
	id: string;
	entityId?: number;
	entityTypeId?: number;
	type: string;
	subType: string;
	dice: any;
	restriction?: string;
	statId: any;
	requiresAttunement: boolean;
	duration: any;
	friendlyTypeName: string;
	friendlySubtypeName: string;
	isGranted: boolean;
	bonusTypes: any[];
	value?: number;
	availableToMulticlass: boolean;
	modifierTypeId: number;
	modifierSubTypeId: number;
	componentId: number;
	componentTypeId: number;
	tagConstraints: any[];
}

export interface Background3 {
	fixedValue: any;
	id: string;
	entityId: number;
	entityTypeId: number;
	type: string;
	subType: string;
	dice: any;
	restriction: string;
	statId: any;
	requiresAttunement: boolean;
	duration: any;
	friendlyTypeName: string;
	friendlySubtypeName: string;
	isGranted: boolean;
	bonusTypes: any[];
	value: any;
	availableToMulticlass: boolean;
	modifierTypeId: number;
	modifierSubTypeId: number;
	componentId: number;
	componentTypeId: number;
	tagConstraints: any[];
}

export interface ClassSpell {
	entityTypeId: number;
	characterClassId: number;
	spells: Spell[];
}

export interface Spell {
	overrideSaveDc: any;
	limitedUse: any;
	id: number;
	entityTypeId: number;
	definition: Definition8;
	definitionId: number;
	prepared: boolean;
	countsAsKnownSpell: boolean;
	usesSpellSlot: boolean;
	castAtLevel: any;
	alwaysPrepared: boolean;
	restriction: any;
	spellCastingAbilityId: any;
	displayAsAttack: any;
	additionalDescription: any;
	castOnlyAsRitual: boolean;
	ritualCastingType: any;
	range: Range5;
	activation: Activation5;
	baseLevelAtWill: boolean;
	atWillLimitedUseLevel: any;
	isSignatureSpell: any;
	componentId: number;
	componentTypeId: number;
	spellListId: any;
}

export interface Definition8 {
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
	rangeArea: any;
	damageEffect: any;
	components: number[];
	componentsDescription: string;
	saveDcAbilityId?: number;
	healing: any;
	healingDice: any[];
	tempHpDice: any[];
	attackType?: number;
	canCastAtHigherLevel: boolean;
	isHomebrew: boolean;
	version: any;
	sourceId: any;
	sourcePageNumber: number;
	requiresSavingThrow: boolean;
	requiresAttackRoll: boolean;
	atHigherLevels: AtHigherLevels3;
	modifiers: Modifier2[];
	conditions: any[];
	tags: string[];
	castingTimeDescription: string;
	scaleType?: string;
	sources: Source9[];
	spellGroups: any[];
	isLegacy: boolean;
}

export interface Duration2 {
	durationInterval: number;
	durationUnit?: string;
	durationType: string;
}

export interface Activation4 {
	activationTime: number;
	activationType: number;
}

export interface Range4 {
	origin: string;
	rangeValue?: number;
	aoeType: any;
	aoeValue: any;
}

export interface AtHigherLevels3 {
	higherLevelDefinitions: HigherLevelDefinition2[];
	additionalAttacks: any[];
	additionalTargets: any[];
	areaOfEffect: any[];
	duration: any[];
	creatures: any[];
	special: any[];
	points: any[];
	range: any[];
}

export interface HigherLevelDefinition2 {
	level: any;
	typeId: number;
	dice: any;
	value: number;
	details: string;
}

export interface Modifier2 {
	fixedValue: any;
	id: string;
	entityId: any;
	entityTypeId: any;
	type: string;
	subType: string;
	dice: any;
	restriction: string;
	statId: any;
	requiresAttunement: boolean;
	duration: any;
	friendlyTypeName: string;
	friendlySubtypeName: string;
	isGranted: boolean;
	bonusTypes: any[];
	value: any;
	availableToMulticlass: any;
	modifierTypeId: number;
	modifierSubTypeId: number;
	componentId: number;
	componentTypeId: number;
	die: Die2;
	count: number;
	durationUnit: any;
	usePrimaryStat: boolean;
	atHigherLevels: AtHigherLevels4;
}

export interface Die2 {
	diceCount?: number;
	diceValue?: number;
	diceMultiplier: any;
	fixedValue?: number;
	diceString?: string;
}

export interface AtHigherLevels4 {
	higherLevelDefinitions: HigherLevelDefinition3[];
	additionalAttacks: any[];
	additionalTargets: any[];
	areaOfEffect: any[];
	duration: any[];
	creatures: any[];
	special: any[];
	points: any[];
	range: any[];
}

export interface HigherLevelDefinition3 {
	level: number;
	typeId: number;
	dice?: Dice2;
	value?: number;
	details: string;
}

export interface Dice2 {
	diceCount: number;
	diceValue: number;
	diceMultiplier: any;
	fixedValue: number;
	diceString: string;
}

export interface Source9 {
	sourceId: number;
	pageNumber?: number;
	sourceType: number;
}

export interface Range5 {
	origin: string;
	rangeValue?: number;
	aoeType: any;
	aoeValue: any;
}

export interface Activation5 {
	activationTime: number;
	activationType: number;
}

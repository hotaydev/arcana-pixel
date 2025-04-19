import {
  Class,
  IPlayerDnD,
  Skill,
  SkillsType,
  SpellCastingAbility,
  Stat,
  Stats,
  StatsType,
} from "@arcana-pixel/schemas/player_dnd";
import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { IDndBeyondCharacter } from "../models/dnd-beyond.model";
import { randomUUID } from "node:crypto";

// TODO: move this to a shared library, so we cna use it already as an "expansion"

@Injectable()
export class DndBeyondImporterService {
  private readonly dndBeyondApiUrl: string = "https://character-service.dndbeyond.com/character/v5/character";

  constructor(private readonly httpService: HttpService) {}

  public async getDndBeyondCharacter(id: string): Promise<IPlayerDnD> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          data: IDndBeyondCharacter;
        }>(`${this.dndBeyondApiUrl}/${id}`)
        .pipe(
          catchError((_error: AxiosError) => {
            throw new NotFoundException("Could't load character from DnD Beyond. Is the character public?");
          })
        )
    );

    const dndBeyondData: IDndBeyondCharacter = data.data;

    const playerClasses: Class[] = (dndBeyondData.classes ?? []).map((c) => ({
      class: c.definition?.name ?? "",
      level: c.level ?? 1,
    }));
    const playerLevel = playerClasses.reduce((a, b) => a + b.level, 0);

    if (!dndBeyondData.overrideStats) {
      dndBeyondData.overrideStats = [];
    }

    if (!dndBeyondData.stats) {
      dndBeyondData.stats = [];
    }

    if (!dndBeyondData.bonusStats) {
      dndBeyondData.bonusStats = [];
    }

    const baseStats: Stats = {
      str: {
        stat: "str",
        value:
          dndBeyondData.overrideStats[0].value ??
          (dndBeyondData.stats[0].value ?? 0) + (dndBeyondData.bonusStats[0]?.value ?? 0),
        isProficient: false,
      },
      dex: {
        stat: "dex",
        value:
          dndBeyondData.overrideStats[1].value ??
          (dndBeyondData.stats[1].value ?? 0) + (dndBeyondData.bonusStats[1]?.value ?? 0),
        isProficient: false,
      },
      con: {
        stat: "con",
        value:
          dndBeyondData.overrideStats[2].value ??
          (dndBeyondData.stats[2].value ?? 0) + (dndBeyondData.bonusStats[2]?.value ?? 0),
        isProficient: false,
      },
      int: {
        stat: "int",
        value:
          dndBeyondData.overrideStats[3].value ??
          (dndBeyondData.stats[3].value ?? 0) + (dndBeyondData.bonusStats[3]?.value ?? 0),
        isProficient: false,
      },
      wis: {
        stat: "wis",
        value:
          dndBeyondData.overrideStats[4].value ??
          (dndBeyondData.stats[4].value ?? 0) + (dndBeyondData.bonusStats[4]?.value ?? 0),
        isProficient: false,
      },
      cha: {
        stat: "cha",
        value:
          dndBeyondData.overrideStats[5].value ??
          (dndBeyondData.stats[5].value ?? 0) + (dndBeyondData.bonusStats[5]?.value ?? 0),
        isProficient: false,
      },
    };

    return {
      id: dndBeyondData.id?.toString() ?? randomUUID(),
      name: dndBeyondData.name ?? "",
      race: dndBeyondData.race?.fullName ?? dndBeyondData.race?.baseName ?? "",
      avatar: dndBeyondData.decorations?.avatarUrl ?? undefined,
      classes: playerClasses,
      armorClass: 12, // TODO: get real total defense
      xp: {
        current: dndBeyondData.currentXp ?? 0,
        max: this.getNextLevelExperience(dndBeyondData.currentXp ?? 0),
      },
      hp: {
        current:
          (dndBeyondData.baseHitPoints ?? 0) +
          (dndBeyondData.bonusHitPoints ?? 0) +
          (dndBeyondData.temporaryHitPoints ?? 0), // Need to check other Hit Point Bonuses
        max:
          (dndBeyondData.baseHitPoints ?? 0) +
          (dndBeyondData.bonusHitPoints ?? 0) -
          (dndBeyondData.removedHitPoints ?? 0),
      },
      initiative: baseStats.dex.value,
      speed: this.feetsToMeters(dndBeyondData.race?.weightSpeeds?.normal?.walk || 30),
      proficiencyBonus: this.getProficiencyBonus(playerLevel),
      currencies: {
        cp: dndBeyondData.currencies?.cp ?? 0,
        sp: dndBeyondData.currencies?.sp ?? 0,
        gp: dndBeyondData.currencies?.gp ?? 0,
        ep: dndBeyondData.currencies?.ep ?? 0,
        pp: dndBeyondData.currencies?.pp ?? 0,
      },
      spellcastingAbility: this.getSpellCastingAbility(dndBeyondData.classes),

      // TODO: some of these need the proficiency_bonus bonus to be added
      skills: this.getSkillsFromStats(baseStats),
      stats: baseStats,

      // TODO: extract these items
      items: [],
      spells: [],
      spellSlots: [],
    };
  }

  private getProficiencyBonus(playerLevel: number) {
    if (playerLevel < 5) return 2;
    if (playerLevel < 9) return 3;
    if (playerLevel < 13) return 4;
    if (playerLevel < 17) return 5;
    return 6;
  }

  private getNextLevelExperience(currentXP: number) {
    const xpTable = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000,
      265000, 305000, 355000,
    ];
    return xpTable.find((xp) => xp > currentXP) || 0;
  }

  private getSpellCastingAbility(classes: IDndBeyondCharacter["classes"]): SpellCastingAbility[] {
    return (classes ?? [])
      .map((c) => ({
        stat: this.getSpellCastingAbilityByID(c.definition?.spellCastingAbilityId ?? 0),
        class: c.definition?.name ?? "",
      }))
      .filter((c) => c.stat);
  }

  private getSpellCastingAbilityByID(id: number): StatsType | undefined {
    switch (id) {
      case 1:
        return "str";
      case 2:
        return "dex";
      case 3:
        return "con";
      case 4:
        return "int";
      case 5:
        return "wis";
      case 6:
        return "cha";
      default:
        return undefined;
    }
  }

  // This isn't used here, but will be used to show the modifier in the UI
  // private getStatModifier(stat: Stat) {
  //   return Math.floor((stat.value - 10) / 2);
  // }

  private feetsToMeters(feets: number) {
    return Math.round(feets * 0.3048);
  }

  private getSkillsFromStats(stats: Stats): Skill[] {
    const skills: Skill[] = [];

    for (const skill of this.skillsList) {
      const stat = this.getStatFromSkill(skill, stats);
      skills.push({
        skill: skill,
        stat: stat,
        isProficient: false, // TODO: handle if the user is proficient or not
      });
    }

    return skills;
  }

  private getStatFromSkill(skill: SkillsType, baseStats: Stats): Stat {
    switch (skill) {
      case "acrobatics":
      case "sleight_of_hand":
      case "stealth":
        return baseStats.dex;

      case "animal_handling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        return baseStats.wis;

      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        return baseStats.int;

      case "athletics":
        return baseStats.str;

      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        return baseStats.cha;
    }
  }

  private skillsList: SkillsType[] = [
    "acrobatics",
    "animal_handling",
    "arcana",
    "athletics",
    "deception",
    "history",
    "insight",
    "intimidation",
    "investigation",
    "medicine",
    "nature",
    "perception",
    "performance",
    "persuasion",
    "religion",
    "sleight_of_hand",
    "stealth",
    "survival",
  ];
}

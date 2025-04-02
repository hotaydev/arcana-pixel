import { DndPlayerSource, IPlayerDnD, Skill, SkillsType, Stats, StatsType } from "@arcana-pixel/schemas/player_dnd";
import { HttpService } from "@nestjs/axios";
import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { IDndBeyondCharacter } from "./models/dnd-beyond.model";

@Injectable()
export class CharactersService {
  private readonly dndBeyondApiUrl: string = "https://character-service.dndbeyond.com/character/v5/character";

  constructor(private readonly httpService: HttpService) {}

  public async importDndCharacter(source: DndPlayerSource, id: string): Promise<IPlayerDnD> {
    switch (source) {
      case "dnd_beyond":
        return await this.getDndBeyondCharacter(id);
      default:
        throw new NotImplementedException("Currently only DnD Beyond character import is supported");
    }
  }

  private async getDndBeyondCharacter(id: string): Promise<IPlayerDnD> {
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

    const playerLevel = dndBeyondData.classes.map((c) => c?.level || 0).reduce((a, b) => a + b, 0); // Showing total level, not level splitted by class
    const arrayOfClasses = dndBeyondData.classes.map((c) => c?.definition?.name || null).filter((c) => c) as string[];
    const proficiencyBonus = this.getProficiencyBonus(playerLevel);

    const baseStats: Stats = {
      str: dndBeyondData.stats[0].value,
      dex: dndBeyondData.stats[1].value,
      con: dndBeyondData.stats[2].value,
      int: dndBeyondData.stats[3].value,
      wis: dndBeyondData.stats[4].value,
      cha: dndBeyondData.stats[5].value,
    };

    return {
      id: dndBeyondData.id,
      name: dndBeyondData.name,
      race: dndBeyondData.race.fullName || dndBeyondData.race.baseName,
      avatar: dndBeyondData.decorations.avatarUrl,
      classes: arrayOfClasses,
      level: playerLevel,
      ac: 12, // TODO: get defense
      xp: {
        current: dndBeyondData.currentXp,
        max: this.getNextLevelExperience(dndBeyondData.currentXp),
      },
      hp: {
        current: dndBeyondData.baseHitPoints + (dndBeyondData.temporaryHitPoints || 0), // Need to check other Hit Point Bonuses
        max: dndBeyondData.baseHitPoints - (dndBeyondData.removedHitPoints || 0),
      },
      initiative: baseStats.dex,
      speed: this.feetsToMeters(dndBeyondData.race?.weightSpeeds?.normal?.walk || 30),
      proficiency_bonus: proficiencyBonus,
      stats: baseStats,

      // TODO: some of these need the proficiency_bonus bonus to be added
      saving_throws: baseStats,
      skills: this.getSkillsFromStats(baseStats, proficiencyBonus),
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

  private feetsToMeters(feets: number) {
    return Math.round(feets * 0.3048);
  }

  private getSkillsFromStats(stats: Stats, _proficiencyBonus: number): Skill[] {
    const skills: Skill[] = [];

    for (const skill of this.skillsList) {
      skills.push({
        skill: skill,
        stat: this.getStatFromSkill(skill),
        modifier: stats[this.getStatFromSkill(skill)], // TODO: add proficiency bonus
        isProficient: false, // TODO: handle if the user is proficient or not
      });
    }

    return skills;
  }

  private getStatFromSkill(skill: SkillsType): StatsType {
    switch (skill) {
      case "acrobatics":
      case "sleight_of_hand":
      case "stealth":
        return "dex";

      case "animal_handling":
      case "insight":
      case "medicine":
      case "perception":
      case "survival":
        return "wis";

      case "arcana":
      case "history":
      case "investigation":
      case "nature":
      case "religion":
        return "int";

      case "athletics":
        return "str";

      case "deception":
      case "intimidation":
      case "performance":
      case "persuasion":
        return "cha";
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

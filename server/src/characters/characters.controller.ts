import { Controller, Get, Query } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { DndPlayerSource, IPlayerDnD } from "@arcana-pixel/shared/schemas/player_dnd";

@Controller("characters/import")
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Get("dnd")
  async importDndCharacter(@Query("source") source: DndPlayerSource, @Query("id") id: string): Promise<IPlayerDnD> {
    return await this.characterService.importDndCharacter(source, id);
  }
}

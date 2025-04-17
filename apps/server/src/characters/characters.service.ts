import { DndPlayerSource, IPlayerDnD } from "@arcana-pixel/schemas/player_dnd";
import { Injectable, NotImplementedException } from "@nestjs/common";
import { DndBeyondImporterService } from "./importers/dnd-beyond.service";
@Injectable()
export class CharactersService {
  constructor(private readonly dndBeyondImporter: DndBeyondImporterService) {}

  public async importDndCharacter(source: DndPlayerSource, id: string): Promise<IPlayerDnD> {
    switch (source) {
      case "dnd_beyond":
        return await this.dndBeyondImporter.getDndBeyondCharacter(id);
      default:
        throw new NotImplementedException("Currently only DnD Beyond character import is supported");
    }
  }
}

import { Module } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { CharactersController } from "./characters.controller";
import { HttpModule } from "@nestjs/axios";
import { DndBeyondImporterService } from "./importers/dnd-beyond.service";

@Module({
  imports: [HttpModule],
  providers: [CharactersService, DndBeyondImporterService],
  controllers: [CharactersController],
})
export class CharactersModule {}

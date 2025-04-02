import { Module } from "@nestjs/common";
import { CharactersService } from "./characters.service";
import { CharactersController } from "./characters.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}

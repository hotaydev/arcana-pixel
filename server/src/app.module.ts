import { Module } from "@nestjs/common";
import { MapsModule } from "./maps/maps.module";
import { CharactersModule } from "./characters/characters.module";

@Module({ imports: [MapsModule, CharactersModule], controllers: [], providers: [] })
export class AppModule {}

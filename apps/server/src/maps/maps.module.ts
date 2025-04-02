import { Module } from "@nestjs/common";
import { MapsController } from "./maps.controller";
import { MapsService } from "./maps.service";
import { HttpModule } from "@nestjs/axios";

@Module({ imports: [HttpModule], providers: [MapsService], controllers: [MapsController] })
export class MapsModule {}

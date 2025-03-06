import { Module } from "@nestjs/common";
import { MapsController } from "./maps.controller";
import { MapsService } from "./maps.service";

@Module({
  providers: [MapsService],
  controllers: [MapsController],
})
export class MapsModule {}

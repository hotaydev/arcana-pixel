import { Controller, Get, Query } from "@nestjs/common";
import { MapsService } from "./maps.service";
import type { MapsIndex } from "@arcana-pixel/shared/schemas/maps_index";
import { MapDefinitions } from "@arcana-pixel/shared/schemas/map_definitions";

@Controller("maps")
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  async getAllOfficialMaps(): Promise<MapsIndex> {
    return await this.mapsService.getAllOfficialMaps();
  }

  @Get("single")
  async getSingleMap(@Query("path") path: string): Promise<MapDefinitions> {
    return await this.mapsService.getSingleMap(path);
  }
}

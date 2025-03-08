import { HttpService } from "@nestjs/axios";
import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import type { MapsIndex } from "@arcana-pixel/shared/schemas/maps_index";
import type { MapDefinitions } from "@arcana-pixel/shared/schemas/map_definitions";

const urlRegex: RegExp = /^https?:\/\//;

@Injectable()
export class MapsService {
  private officialMapsRepository: string =
    "https://raw.githubusercontent.com/hotaydev/arcana-pixel-official-maps/refs/heads/main";
  constructor(private readonly httpService: HttpService) {}

  public async getAllOfficialMaps(): Promise<MapsIndex> {
    const { data } = await firstValueFrom(
      this.httpService.get<MapsIndex>(`${this.officialMapsRepository}/index.json`).pipe(
        catchError((_error: AxiosError) => {
          throw new BadGatewayException("Could't load official maps now, try again later.");
        })
      )
    );
    return data;
  }

  public async getSingleMap(path: string): Promise<MapDefinitions> {
    const singleMapFolder: string = urlRegex.test(path)
      ? path
      : `https://raw.githubusercontent.com/hotaydev/arcana-pixel-official-maps/refs/heads/main/${path}`;

    const { data } = await firstValueFrom(
      this.httpService.get<MapDefinitions>(`${singleMapFolder}/definitions.json`).pipe(
        catchError((_error: AxiosError) => {
          throw new NotFoundException("Map definition not found");
        })
      )
    );
    return data;
  }
}

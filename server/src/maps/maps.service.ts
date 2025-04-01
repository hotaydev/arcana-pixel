import { HttpService } from "@nestjs/axios";
import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import type { IMapsIndex } from "@arcana-pixel/shared/schemas/maps_index";
import type { IMapDefinitions } from "@arcana-pixel/shared/schemas/map_definitions";

const urlRegex: RegExp = /^https?:\/\//;

@Injectable()
export class MapsService {
  private readonly ghRepository: string = "hotaydev/arcana-pixel-official-maps";
  private baseUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = `https://raw.githubusercontent.com/${this.ghRepository}/refs/heads/main`;
  }

  public async getAllOfficialMaps(): Promise<IMapsIndex> {
    const { data } = await firstValueFrom(
      this.httpService.get<IMapsIndex>(`${this.baseUrl}/index.json`).pipe(
        catchError((_error: AxiosError) => {
          throw new BadGatewayException("Could't load official maps now, try again later.");
        })
      )
    );
    return data;
  }

  public async getSingleMap(path: string): Promise<IMapDefinitions> {
    const singleMapFolder: string = urlRegex.test(path) ? path : `${this.baseUrl}/${path}`;

    const { data } = await firstValueFrom(
      this.httpService.get<IMapDefinitions>(`${singleMapFolder}/definitions.json`).pipe(
        catchError((_error: AxiosError) => {
          throw new NotFoundException("Map definition not found.");
        })
      )
    );
    return data;
  }
}

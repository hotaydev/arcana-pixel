import { Controller, Get } from "@nestjs/common";

@Controller("maps")
export class MapsController {
  @Get("official")
  getAllOfficialMaps(): string {
    return "This action returns all official maps";
  }
}

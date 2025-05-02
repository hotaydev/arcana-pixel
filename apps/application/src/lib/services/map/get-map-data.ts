import { toast } from "svelte-5-french-toast";
import type { IMapDefinitions } from "@arcana-pixel/schemas/map_definitions";
import { SERVER_URL } from "../api";

export default async function getMapData(map?: string): Promise<IMapDefinitions | null> {
	return await fetch(`${SERVER_URL}/maps/single?path=${map ?? "/maps/dnd-map-1"}`)
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => {
			toast.error("Não conseguimos carregar o mapa. Confira os logs para mais detalhes.");
			console.log(err);
			return null;
		});
}

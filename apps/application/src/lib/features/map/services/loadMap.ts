import L from "leaflet";
import { setMap } from "$lib/features/map/stores/map.store";
import type { IMapDefinitions } from "@arcana-pixel/schemas/map_definitions";

export default (mapData: IMapDefinitions) => {
	const doesBoundsExist = mapData.config.bounds?.southWest && mapData.config.bounds?.northEast;
	var map = L.map("arcana-map", {
		crs: L.CRS.Simple,
		attributionControl: false,
		// zoomSnap: 0.0001,
		// zoomDelta: 0.25,
		// wheelDebounceTime: 25,
		zoomControl: false,
		maxBoundsViscosity: 1.0,
		maxBounds: doesBoundsExist
			? new L.LatLngBounds(mapData.config.bounds!.southWest, mapData.config.bounds!.northEast)
			: undefined,
	}).setView(mapData.config.center, mapData.config.minZoom);

	L.tileLayer(mapData.config.tilesUrl, {
		noWrap: true,
		minZoom: mapData.config.minZoom,
		maxZoom: mapData.config.maxZoom,
		maxNativeZoom: mapData.config.maxNativeZoom,
		minNativeZoom: mapData.config.minNativeZoom,
	}).addTo(map);

	setMap(map);
};

import L from "leaflet";
import { setMap } from "$lib/features/map/stores/map.store";
import type { IMapDefinitions } from "@arcana-pixel/schemas/map_definitions";

export default (mapData: IMapDefinitions) => {
	const doesBoundsExist = mapData.config.bounds?.southWest && mapData.config.bounds?.northEast;
	const isTilesUrlMap = mapData.config.url.includes("{z}/{x}/{y}");
	const bounds = doesBoundsExist
		? new L.LatLngBounds(mapData.config.bounds!.southWest, mapData.config.bounds!.northEast)
		: undefined;

	var map = L.map("arcana-map", {
		crs: L.CRS.Simple,
		attributionControl: false,
		// zoomSnap: 0.0001,
		// zoomDelta: 0.25,
		// wheelDebounceTime: 25,
		zoomControl: false,
		maxBoundsViscosity: 1.0,
		maxBounds: bounds,
	});

	if (isTilesUrlMap) {
		L.tileLayer(mapData.config.url, {
			noWrap: true,
			minZoom: mapData.config.minZoom,
			maxZoom: mapData.config.maxZoom,
			maxNativeZoom: mapData.config.maxNativeZoom,
			minNativeZoom: mapData.config.minNativeZoom,
		}).addTo(map);
		map.setView(mapData.config.center, mapData.config.minZoom);
	} else {
		// It's a plain simple unique image
		L.imageOverlay(
			mapData.config.url,
			bounds ?? [
				[0, 0],
				[1000, 1000],
			]
		).addTo(map);
		map.fitBounds(
			bounds ?? [
				[0, 0],
				[1000, 1000],
			]
		);
	}

	setMap(map);
};

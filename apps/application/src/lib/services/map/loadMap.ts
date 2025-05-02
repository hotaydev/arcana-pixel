import L, { LatLngBounds, type LatLngExpression } from "leaflet";
import { setMap } from "$lib/stores/map.store";
import type { IMapDefinitions } from "@arcana-pixel/schemas/map_definitions";

export default (mapData: IMapDefinitions) => {
	const { zoom, center } = getZoomAndCenter(mapData);
	const bounds = getBounds(mapData);
	const isTilesUrlMap = mapData.config.url.includes("{z}/{x}/{y}");

	var map = L.map("arcana-map", {
		crs: L.CRS.Simple,
		attributionControl: false,
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
		map.setView(center, zoom);

		map.on("moveend", (e) => setZoomAndCenter(map));
	} else {
		const defaultImageBounds: LatLngBounds = new L.LatLngBounds([
			[0, 0],
			[1000, 1000],
		]);

		// It's a plain simple unique image
		L.imageOverlay(mapData.config.url, bounds ?? defaultImageBounds).addTo(map);
		map.fitBounds(bounds ?? defaultImageBounds);
	}

	setMap(map);
};

function setZoomAndCenter(map: L.Map) {
	localStorage.setItem("mapZoom", map.getZoom().toString());
	localStorage.setItem("mapCenter", JSON.stringify(map.getCenter()));
}

function getZoomAndCenter(mapData: IMapDefinitions): { zoom: number; center: LatLngExpression } {
	const localStorageMapZoom = localStorage.getItem("mapZoom");
	const localStorageMapCenter = localStorage.getItem("mapCenter");

	let zoom = localStorageMapZoom ? parseInt(localStorageMapZoom!) : mapData.config.minZoom;
	let center = JSON.parse(localStorageMapCenter ?? JSON.stringify(mapData.config.center));

	return { zoom, center };
}

function getBounds(mapData: IMapDefinitions): L.LatLngBounds | undefined {
	const bounds = mapData.config.bounds;
	const boundsExist = bounds?.southWest && bounds?.northEast;

	return boundsExist ? new L.LatLngBounds(bounds!.southWest, bounds!.northEast) : undefined;
}

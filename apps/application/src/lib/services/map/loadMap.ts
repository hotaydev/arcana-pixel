import L from "leaflet";
import { setMap } from "$lib/stores/map.store";
import type { IMapDefinitions } from "@arcana-pixel/schemas/map_definitions";

export default (mapData: IMapDefinitions) => {
	let viewZoom = localStorage.getItem("mapZoom")
		? parseInt(localStorage.getItem("mapZoom")!)
		: mapData.config.minZoom;
	let viewCenter = JSON.parse(
		localStorage.getItem("mapCenter") ?? JSON.stringify(mapData.config.center)
	);

	const doesBoundsExist = mapData.config.bounds?.southWest && mapData.config.bounds?.northEast;
	const isTilesUrlMap = mapData.config.url.includes("{z}/{x}/{y}");
	const bounds = doesBoundsExist
		? new L.LatLngBounds(mapData.config.bounds!.southWest, mapData.config.bounds!.northEast)
		: undefined;

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
		map.setView(viewCenter, viewZoom);

		map.on("moveend", function (e) {
			localStorage.setItem("mapZoom", map.getZoom().toString());
			localStorage.setItem("mapCenter", JSON.stringify(map.getCenter()));
		});
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

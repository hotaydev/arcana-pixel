import L from "leaflet";
import {
	biggestMapFolderZoom,
	biggestZoom,
	lowestZoom,
	mainMapNorthEast,
	mainMapSouthWest,
	mapCenter,
	shortestMapFolderZoom,
} from "./map-details";
import { setMap } from "$lib/features/map/stores/map.store";

export default () => {
	var map = L.map("arcana-map", {
		crs: L.CRS.Simple,
		attributionControl: false,
		// zoomSnap: 0.0001,
		// zoomDelta: 0.25,
		// wheelDebounceTime: 25,
		zoomControl: false,
		maxBoundsViscosity: 1.0,
		maxBounds: new L.LatLngBounds(mainMapSouthWest, mainMapNorthEast),
	}).setView(mapCenter, lowestZoom);

	L.tileLayer(`https://rpg-map.vercel.app/map/{z}/{x}/{y}.png`, {
		noWrap: true,
		minZoom: lowestZoom,
		maxZoom: biggestZoom,
		maxNativeZoom: biggestMapFolderZoom,
		minNativeZoom: shortestMapFolderZoom,
	}).addTo(map);

	setMap(map);
};

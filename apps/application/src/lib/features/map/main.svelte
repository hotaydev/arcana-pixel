<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
	import "leaflet-defaulticon-compatibility";

	import { toggleWiki } from "$lib/features/wiki-bar/stores/wiki.store";
	import { map } from "$lib/features/map/stores/map.store";

	import { onMount } from "svelte";
	import loadMap from "./services/loadMap";
	import { mapCenter } from "./services/map-details";
	import L from "leaflet";

	onMount(() => {
		loadMap();

		// Location finder marker
		var coordinateFinderMarker = L.marker(mapCenter, {
			draggable: true,
		}).addTo($map);
		coordinateFinderMarker.bindPopup("Lat Lng Marker");
		coordinateFinderMarker.on("dragend", () => {
			const { lat, lng } = coordinateFinderMarker.getLatLng();
			let markerPos = [lat.toFixed(1), lng.toFixed(1)];
			coordinateFinderMarker.getPopup()?.setContent(markerPos.join(", ")).openOn($map);
		});

		coordinateFinderMarker.on("click", () => {
			toggleWiki(); // Testing wiki visibility
		});
	});
</script>

<div id="arcana-map" class="card"></div>

<style>
	#arcana-map {
		width: 100%;
		height: 100%;
	}
</style>

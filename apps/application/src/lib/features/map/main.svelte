<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
	import "leaflet-defaulticon-compatibility";

	// import { toggleWiki } from "$lib/features/wiki-bar/stores/wiki.store";
	// import { map } from "$lib/features/map/stores/map.store";
	// import L from "leaflet";

	import { onMount } from "svelte";
	import loadMap from "./services/loadMap";
	import getMapData from "./services/get-map-data";

	onMount(async () => {
		const mapData = await getMapData();
		if (!mapData) return;

		loadMap(mapData);

		// TODO: add map editing capabilities using GeoMan (https://geoman.io/)
	});
</script>

<div id="arcana-map" class="card"></div>

<style>
	#arcana-map {
		width: 100%;
		height: 100%;
	}
</style>

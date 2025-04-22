<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
	import "leaflet-defaulticon-compatibility";

	// import { toggleWiki } from "$lib/features/wiki-bar/stores/wiki.store";
	import { map } from "$lib/stores/map.store";
	// import L from "leaflet";

	import { onMount } from "svelte";
	import getMapData from "$lib/services/map/get-map-data";
	import loadMap from "$lib/services/map/loadMap";
	import { get } from "svelte/store";

	onMount(() => {
		let resizeObserver: ResizeObserver;

		const initMap = async () => {
			const mapData = await getMapData();
			if (!mapData) return;

			loadMap(mapData);

			// Add resize observer to handle container resize
			resizeObserver = new ResizeObserver(() => {
				setTimeout(() => {
					get(map).invalidateSize();
				}, 0);
			});

			const mapContainer = document.getElementById("arcana-map");
			if (mapContainer) {
				resizeObserver.observe(mapContainer);
			}
		};

		initMap();

		// Cleanup function
		return () => {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};

		// TODO: add map editing capabilities using GeoMan (https://geoman.io/)
	});
</script>

<div id="arcana-map" class="card"></div>

<style>
	#arcana-map {
		width: 100%;
		height: 100%;
		background-color: var(--background-color-level-1);
		z-index: 1;
	}

	/* Override card border radius */
	.card {
		border-radius: calc(var(--border-radius) - 4px) !important;
	}
</style>

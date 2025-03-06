import { writable, type Writable } from "svelte/store";
import L from "leaflet";

export const map: Writable<L.Map> = writable();

export const setMap = (newMap: L.Map) => {
	map.update(() => newMap);
};

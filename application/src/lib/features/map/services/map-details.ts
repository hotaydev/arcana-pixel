import type { LatLngLiteral } from "leaflet";

export const kilometerToMilesConstant = 0.6213712; // 1 km = 0.6213712 miles
export const sizeChangeFactor = 1.5; // Use to make distances longer (increasing this value) or shorter (decresing this value). Usefull for different map sizes.

// Travel speeds from D&D (values in miles per hour)
export const travelSpeed = {
	slow: 2,
	normal: 3,
	fast: 4,
};

export const biggestMapFolderZoom = 5; // Maximum folder level (eg. /map/6/)
export const shortestMapFolderZoom = 3; // Minimum folder level (eg. /map/1/)
export const biggestZoom = 6; // Maximum zoom level, if higher than biggestMapFolderZoom it will zoom in the image ignoring quality
export const lowestZoom = 3; // Lowest possible zoom

export const mapCenter: LatLngLiteral = { lat: -130, lng: 132 };

export const travelVelocityRulesLink = "https://roll20.net/compendium/dnd5e/Movement#content";

export const mainMapSouthWest: LatLngLiteral = { lat: -224, lng: 256 };
export const mainMapNorthEast: LatLngLiteral = { lat: -32, lng: 0 };

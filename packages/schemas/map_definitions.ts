/**
 * Schema definition for maps that will be loaded on Arcana Pixel
 */
export interface IMapDefinitions {
  /**
   * Schema definition for the map definitions to be loaded on Arcana Pixel
   */
  $schema?: "https://raw.githubusercontent.com/hotaydev/arcana-pixel/main/packages/schemas/compiled/map_definitions.json";

  /**
   * Map configuration, such as zoom, center, bounds, etc.
   */
  config: Config;

  /**
   * URL of the map's preview image
   */
  preview: string;

  /**
   * List of titles to be displayed on the map (usually for continents and larger areas)
   */
  titles: Title[];

  /**
   * List of location markers (pins) to be displayed on the map
   */
  locations: Location[];
}

interface Config {
  /**
   * Url of the tiles layer following Leaflet's Tile Layer URL Format.
   * See https://leafletjs.com/reference.html#tilelayer-url-template
   */
  tilesUrl: string;

  /**
   * Minimum posible zoom on the map
   */
  minZoom: number;

  /**
   * Minimum zoom level of the folder of the sliced map.
   * Take a look at Leaflet's documentation to understand how it works: https://leafletjs.com/reference.html#gridlayer-minnativezoom
   */
  minNativeZoom?: number;

  /**
   * Maximum posible zoom on the map
   */
  maxZoom: number;

  /**
   * Maximum zoom level of the folder of the sliced map.
   * Take a look at Leaflet's documentation to understand how it works: https://leafletjs.com/reference.html#gridlayer-maxnativezoom
   */
  maxNativeZoom?: number;

  /**
   * Used o manipulate the distances in the map to make them longer (increasing this value) or shorter (decresing this value).
   * Usefull for changing travel time in games such as D&D
   */
  sizeChangeFactor?: number;

  /**
   * Limits of the map, used to avoid loading and seeing tiles out of bounds
   * For smaller maps this can turn to be difficult to navigate in the map, so it's optional.
   */
  bounds?: Bounds;

  /**
   * Coordinate pair of the center of the map (start position)
   */
  center: CoordinatePair;
}

interface Bounds {
  /**
   * Southwest maximum point coordinate
   */
  southWest: CoordinatePair;

  /**
   * Northeast maximum point coordinate
   */
  northEast: CoordinatePair;
}

interface CoordinatePair {
  /**
   * Latitude of the coordinate
   */
  lat: number;

  /**
   * Longitude of the coordinate
   */
  lng: number;
}

interface Title extends CoordinatePair {
  /**
   * Title of the location
   */
  title: string;

  /**
   * Size of the title
   * Usually something between 150 (large) and 30 (small)
   */
  size: number;
}

interface Location extends CoordinatePair {
  /**
   * Category of the location, used to group similar markers into a single "layer".
   * This is usefull for toggling the visibility of the markers by it's categoy/type/layer.
   */
  category: string;

  /**
   * Color of the location marker
   */
  markerColor?: "red" | "darkred" | "lightred" | "orange" | "beige" | "green" | "darkgreen" | "lightgreen" | "blue" | "darkblue" | "lightblue" | "purple" | "darkpurple" | "pink" | "cadetblue" | "white" | "gray" | "lightgray" | "black";

  /**
   * Icon to show in the marker. Is the name of the marker from FontAwesome, search for your icon at https://fontawesome.com/search?ic=free
   * Only free icons are supported (we are looking t change to a Open Source free alternative in the near future)
   */
  icon?: string;

  /**
   * Toggle the visibility of the location.
   * his can be changed later while using the map (only the master can change it)
   */
  isVisible?: boolean;

  /**
   * Text to show in the marker's tooltip
   */
  text: string;

  /**
   * Description shown in the sidebar after clicking the marker
   */
  description: string;

  /**
   * Description shown in the sidebar after clicking the marker that is visible ONLY for the master of the game
   */
  master_description?: string;
}

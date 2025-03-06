/**
 * Schema definition for the index o maps that will be used to load official and community maps on Arcana Pixel
 */
export interface MapsIndex {
  /**
   * Schema definition for the maps index used to parse official and community maps
   */
  $schema: "https://raw.githubusercontent.com/hotaydev/arcana-pixel/main/shared/schemas/compiled/maps_index.json";

  /**
   * Array of available maps
   */
  maps: {

    /**
     * Path of the map in the full format, including official prefix like https://raw.githubusercontent.com/hotaydev/arcana-pixel-official-maps/refs/heads/main/<map-folder>
     */
    path: string,

    /**
     * Name of the map, shown in the maps gallery
     */
    name: string,

    /**
     * Version of the map (optional)
     */
    version?: string,

    /**
     * List of supported games (more to come official in the future)
     */
    games: ("dnd" | "ordemparanormal" | "cthulhu" | "tormenta")[]
  }[]
}
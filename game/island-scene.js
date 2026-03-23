import { Tilemap } from '../engine/index.js';

export const islandScene = new Tilemap({
  id: 'island-scene',
  layers: [
    {
      id: 'ground',
      tileset: 'island-ground',
    },
  ],
  collision: [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
  ],
});

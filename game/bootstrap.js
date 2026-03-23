import { EngineRuntime } from '../engine/index.js';
import { PlayerCharacter } from './character.js';
import { islandScene } from './island-scene.js';

const player = new PlayerCharacter({
  spriteId: 'hero-idle',
  startX: 1,
  startY: 1,
});

export const islandGame = {
  init(context) {
    context.assets.register('hero-idle', { type: 'sprite' });
    context.camera.follow(player);
  },

  update(context) {
    const moveX = context.input.getAxis('moveX');
    const moveY = context.input.getAxis('moveY');
    const nextX = player.position.x + moveX * player.speed * context.deltaTime;
    const nextY = player.position.y + moveY * player.speed * context.deltaTime;

    if (context.collision.canMoveTo(Math.round(nextX), Math.round(nextY))) {
      player.position.x = nextX;
      player.position.y = nextY;
    }

  },

  render(context) {
    for (const layer of context.tilemap.layers) {
      context.renderer.drawTileLayer(layer);
    }

    context.renderer.drawSprite(player.spriteId, player.position);
  },
};

export function createIslandRuntime() {
  return new EngineRuntime(islandGame, { tilemap: islandScene });
}

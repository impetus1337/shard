import { AssetManager } from './assets.js';
import { Camera2D } from './camera.js';
import { CollisionWorld } from './collision.js';
import { InputState } from './input.js';
import { Renderer2D } from './renderer2d.js';
import { Tilemap } from './tilemap.js';

export class EngineRuntime {
  /**
   * @param {import('./types.js').GameCallbacks} game
   * @param {{ tilemap?: Tilemap }} [options]
   */
  constructor(game, options = {}) {
    this.game = game;
    this.input = new InputState();
    this.assets = new AssetManager();
    this.renderer = new Renderer2D();
    this.tilemap = options.tilemap ?? new Tilemap();
    this.camera = new Camera2D();
    this.collision = new CollisionWorld(this.tilemap);
    this.elapsedTime = 0;
  }

  createFrameContext(deltaTime) {
    this.elapsedTime += deltaTime;

    return {
      deltaTime,
      elapsedTime: this.elapsedTime,
      input: this.input,
      assets: this.assets,
      renderer: this.renderer,
      tilemap: this.tilemap,
      camera: this.camera,
      collision: this.collision,
    };
  }

  init() {
    this.game.init(this.createFrameContext(0));
  }

  update(deltaTime) {
    const context = this.createFrameContext(deltaTime);
    this.game.update(context);
    this.camera.update();
  }

  render() {
    const context = this.createFrameContext(0);
    this.renderer.beginFrame(this.camera);
    this.game.render(context);
    return this.renderer.endFrame();
  }

  tick(deltaTime) {
    this.update(deltaTime);
    return this.render();
  }
}

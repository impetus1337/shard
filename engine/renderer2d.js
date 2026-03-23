export class Renderer2D {
  constructor() {
    this.drawCalls = [];
  }

  beginFrame(camera) {
    this.drawCalls = [];
    this.activeCamera = camera;
  }

  drawSprite(spriteId, position) {
    this.drawCalls.push({ type: 'sprite', spriteId, position });
  }

  drawTileLayer(layer) {
    this.drawCalls.push({ type: 'tile-layer', layer });
  }

  endFrame() {
    return this.drawCalls;
  }
}

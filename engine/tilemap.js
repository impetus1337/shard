export class Tilemap {
  constructor({ id, layers = [], collision = [] } = {}) {
    this.id = id;
    this.layers = layers;
    this.collision = collision;
  }

  getCollisionAt(x, y) {
    return this.collision.some((cell) => cell.x === x && cell.y === y);
  }
}

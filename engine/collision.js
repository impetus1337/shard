export class CollisionWorld {
  constructor(tilemap) {
    this.tilemap = tilemap;
  }

  canMoveTo(x, y) {
    return !this.tilemap.getCollisionAt(x, y);
  }
}

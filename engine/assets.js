export class AssetManager {
  constructor() {
    this.assets = new Map();
  }

  register(id, resource) {
    this.assets.set(id, resource);
  }

  get(id) {
    return this.assets.get(id);
  }
}

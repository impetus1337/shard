export class Camera2D {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.target = null;
  }

  follow(target) {
    this.target = target;
  }

  update() {
    if (!this.target) {
      return;
    }

    this.position = {
      x: this.target.position.x,
      y: this.target.position.y,
    };
  }
}

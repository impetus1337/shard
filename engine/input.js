export class InputState {
  constructor() {
    this.axes = new Map();
  }

  setAxis(name, value) {
    this.axes.set(name, value);
  }

  getAxis(name) {
    return this.axes.get(name) ?? 0;
  }
}

export class PlayerCharacter {
  constructor({ spriteId, startX, startY }) {
    this.spriteId = spriteId;
    this.position = { x: startX, y: startY };
    this.speed = 4;
  }
}

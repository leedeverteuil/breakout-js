import type { Scene } from "./scene";
import type { CollisionBox } from "./types";

const WIDTH = 12;
const HEIGHT = 12;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = WIDTH / 2;
const SPAWN_OFFSET = HEIGHT + 4;

class Ball {
  scene: Scene;
  gameContext: any;
  currentBounds: CollisionBox;
  dirX: number = 1;
  dirY: number = 1;
  speed: number = 100;

  constructor(scene: Scene) {
    this.scene = scene;
    this.gameContext = scene.gameContext;

    // set initial bounds based on
    // platform's current location
    const platBounds: CollisionBox = scene.platform.currentBounds;
    this.currentBounds = {
      x: platBounds.x - WIDTH / 2 + platBounds.width / 2,
      y: platBounds.y - SPAWN_OFFSET,
      width: WIDTH,
      height: HEIGHT,
    };
  }

  render(deltaTime: number) {
    this.updateBounds(deltaTime);
    this.updateCollisions(deltaTime);

    const bounds = this.currentBounds;
    const { x, y, width, height } = bounds;
    const gameContext = this.gameContext;
    const cvs = gameContext.canvas;
    const ctx = gameContext.drawContext;

    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);
  }

  updateBounds(deltaTime: number) {
    this.currentBounds.x += this.dirX * deltaTime * this.speed;
    this.currentBounds.y -= this.dirY * deltaTime * this.speed;
  }

  updateCollisions(deltaTime: number) {
    const cvs = this.gameContext.canvas;
    const bounds = this.currentBounds;
    const { x, y, width, height } = bounds;

    // wall collisions
    // left & right walls
    if ((x + WIDTH) >= cvs.width || x <= 0) {
      this.dirX = -this.dirX;
    }
    // top wall
    if (y <= 0) {
      this.dirY = -this.dirY;
    }

    // platform collisions

  }
}

export { Ball };

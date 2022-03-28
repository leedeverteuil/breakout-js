import type { Scene } from "./scene";
import type { CollisionBox } from "./types";

const WIDTH = 12;
const HEIGHT = 12;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = WIDTH / 2;
const SPAWN_OFFSET = HEIGHT + 4;

function boxesIntersected(b1: CollisionBox, b2: CollisionBox) {
  // source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#axis-aligned_bounding_box
  return (
    b1.x < b2.x + b2.width && b1.y < b2.y + b2.height && b1.height + b1.y > b2.y
  );
}

class Ball {
  scene: Scene;
  gameContext: any;
  currentBounds: CollisionBox;
  lastCollision: any;
  dirX: number = 1;
  dirY: number = 1;
  speed: number = 200;

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

  flipDirectionX() {
    this.dirX = -this.dirX;
  }

  flipDirectionY() {
    this.dirY = -this.dirY;
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

    // bottom and right
    const bottom = y + height;
    const right = x + width;

    // wall collisions
    // left & right walls
    if (x + WIDTH >= cvs.width || x <= 0) {
      this.flipDirectionX();
    }
    // top wall
    if (y <= 0) {
      this.flipDirectionY();
    }

    // platform collision & deflection math
    const plat = this.scene.platform;
    const platBounds = plat.currentBounds;
    if (platBounds) {
      // make sure that it clears the platform before
      // another collision can be detected
      const intersected = boxesIntersected(bounds, platBounds);
      const lastCollided = this.lastCollision == plat;

      if (lastCollided && !intersected) {
        this.lastCollision = undefined;
      }
      else if (!lastCollided && intersected) {
        this.lastCollision = plat;
        this.flipDirectionY();

        // depending on where ball hits the platform
        // the angle of deflection should be different
        const hitAlpha = Math.max((x - platBounds.x) / platBounds.width);
        // console.log(hitAlpha);
      }
    }

    // lose game if ball reaches bottom
  }
}

export { Ball };

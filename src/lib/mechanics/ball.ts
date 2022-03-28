import type { Scene } from "./scene";
import type { CollisionBox } from "./types";

const WIDTH = 12;
const HEIGHT = 12;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = WIDTH / 2;
const SPAWN_OFFSET = HEIGHT + 4;
const DEFLECT_X_RANGE = 2;

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
  lastCollision: string;
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
      if (this.lastCollision != "xwall") {
        this.lastCollision = "xwall";
        this.flipDirectionX();
      }
    } else if (this.lastCollision == "xwall") {
      this.lastCollision = undefined;
    }

    // top wall
    if (y <= 0) {
      if (this.lastCollision != "ywall") {
        this.lastCollision = "ywall";
        this.flipDirectionY();
      }
    } else if (this.lastCollision == "ywall") {
      this.lastCollision = undefined;
    }

    // platform collision & deflection math
    const plat = this.scene.platform;
    const platBounds = plat.currentBounds;
    if (platBounds) {
      // make sure that it clears the platform before
      // another collision can be detected
      const intersected = boxesIntersected(bounds, platBounds);
      const lastCollided = this.lastCollision == "platform";

      if (lastCollided && !intersected) {
        this.lastCollision = undefined;
      } else if (!lastCollided && intersected) {
        this.lastCollision = "platform";
        this.flipDirectionY();

        // depending on where ball hits the platform
        // the angle of deflection should be different
        let hitAlpha = Math.min(
          Math.max((x - platBounds.x) / platBounds.width, 0),
          1
        );
        if (hitAlpha == 0.5) {
          this.dirX = 0;
        } else if (hitAlpha > 0.5) {
          hitAlpha = (hitAlpha - 0.5) / 0.5;
          this.dirX = hitAlpha * DEFLECT_X_RANGE;
        } else if (hitAlpha < 0.5) {
          hitAlpha = (0.5 - hitAlpha) / 0.5;
          this.dirX = hitAlpha * -DEFLECT_X_RANGE;
        }
      }
    }

    // lose game if ball reaches bottom
    if (y >= (cvs.height)) {
      console.log("game over!");
    }
  }
}

export { Ball };

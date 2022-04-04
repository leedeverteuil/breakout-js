import { get } from "svelte/store";
import type { GameContext } from "./context";
import { PhysicsBox } from "./physics";

class Puck {
  // constants
  SIZE = 12;
  DEFLECT_RANGE = 2;

  // properties
  box: PhysicsBox;
  context: GameContext;
  lastHit: string;
  speedX = 0.05;
  speedY = -1;
  speedMultiplier = 4;

  constructor(x: number, y: number, context: GameContext) {
    this.box = new PhysicsBox(x, y, this.SIZE, this.SIZE, context.canvas);
    this.context = context;
    this.speedMultiplier *= context.match.difficulty.speedMultiplier;
  }

  flipX() {
    this.speedX = -this.speedX;
  }

  flipY() {
    this.speedY = -this.speedY;
  }

  destroy() {}

  update(deltaTime: number) {
    this.updatePosition(deltaTime);
    this.render();

    // wall boundaries
    if (!this.updateWallCollisions()) {
      // bricks
      if (!this.updateBrickCollisions()) {
        // paddle
        if (!this.updatePaddleCollisions()) {
          this.lastHit = "";
        }
      }
    }
  }

  render() {
    const box = this.box;
    const context = this.context.canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(box.x, box.y, box.w, box.h);
  }

  updatePosition(deltaTime: number) {
    this.box.x += this.speedX * this.speedMultiplier;
    this.box.y += this.speedY * this.speedMultiplier;
  }

  puckLost() {
    // lose a life here
    const context = this.context;
    const match = context.match;
    context.lives.update((l: number) => l -= 1);

    // lose game if all lives lost
    if (get(context.lives) == 0) {
      match.endGame(false, false);
    } else {
      match.removePuck();
    }
  }

  updateWallCollisions(): boolean {
    if (this.box.outOfBoundsBottom()) {
      this.puckLost();
      return true;
    }
    // hit left or right wall
    else if (this.lastHit != "XWall" && this.box.outOfBoundsX()) {
      this.lastHit = "XWall";
      this.flipX();
      return true;
    }
    // hit top wall
    else if (this.lastHit != "TopWall" && this.box.outOfBoundsTop()) {
      this.lastHit = "TopWall";
      this.flipY();
      return true;
    }

    return false;
  }

  updatePaddleCollisions(): boolean {
    const paddle = this.context.match.paddle;
    const thisBox = this.box;
    const paddleBox = paddle.box;

    if (this.lastHit != "Paddle" && paddleBox.isIntersecting(thisBox)) {
      this.lastHit = "Paddle";

      // should always send back up
      this.speedY = -1;

      // depending on where ball hits the platform
      // the angle of deflection should be different
      let a = Math.min(Math.max((thisBox.x - paddleBox.x) / paddleBox.w, 0), 1);

      if (a == 0.5) {
        this.speedX = 0;
      }
      // hit right side of paddle, deflect right
      else if (a > 0.5) {
        a = (a - 0.5) / 0.5;
        this.speedX = a * this.DEFLECT_RANGE;
      }
      // hit left side of paddle, deflect left
      else if (a < 0.5) {
        a = (0.5 - a) / 0.5;
        this.speedX = a * -this.DEFLECT_RANGE;
      }

      return true;
    }

    return false;
  }

  updateBrickCollisions(): boolean {
    const bricks = this.context.match.bricks;
    let collided = false;
    bricks.all.forEach((brick) => {
      if (!collided && !brick.broken) {
        const brickBox = brick.box;
        const thisBox = this.box;

        if (this.lastHit != brickBox.id && brickBox.isIntersecting(thisBox)) {
          collided = true;
          this.lastHit = brickBox.id;

          //// determine where it hit from
          const pen = brickBox.getPenetration(thisBox);
          const sx = this.speedX;
          const sy = this.speedY;

          // get neighbor info
          const nLeft = brick.hasLeftNeighbor(),
            nRight = brick.hasRightNeighbor(),
            nTop = brick.hasTopNeighbor(),
            nBottom = brick.hasBottomNeighbor();

          // check if possible to hit
          // certain sides
          if (sy > 0 || nBottom) pen.bottom = Infinity;
          if (sy < 0 || nTop) pen.top = Infinity;
          if (sx > 0 || nRight) pen.right = Infinity;
          if (sx < 0 || nLeft) pen.left = Infinity;

          // handle deflection
          if (
            (pen.left < pen.top && pen.left < pen.bottom) ||
            (pen.right < pen.top && pen.right < pen.bottom)
          ) {
            this.flipX();
          } else {
            this.flipY();
          }

          // damage brick's health
          // if not unbreakable
          brick.hit();

          return true;
        }
      }
    });

    return collided;
  }
}

export { Puck };

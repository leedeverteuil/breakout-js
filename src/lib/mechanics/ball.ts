import type { Block } from "./blocks";
import type { Scene } from "./scene";
import type { CollisionBox } from "./types";

const WIDTH = 12;
const HEIGHT = 12;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = WIDTH / 2;
const SPAWN_OFFSET = HEIGHT + 4;
const DEFLECT_X_RANGE = 2;

// rect1.x < rect2.x + rect2.w &&
//   rect1.x + rect1.w > rect2.x &&
//   rect1.y < rect2.y + rect2.h &&
//   rect1.h + rect1.y > rect2.y;

function boxesIntersected(
  b1: CollisionBox,
  b2: CollisionBox,
  debug: boolean = false
) {
  // source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#axis-aligned_bounding_box
  // const bool = (
  //   b1.x > b2.x &&
  //   b1.x < b2.x + b2.width &&
  //   b1.y > b2.y &&
  //   b1.y < b2.y + b2.height
  // );

  // if (debug) {
  //   console.log("\ndebugging intersection:");
  //   console.log(b1.x > b2.x,
  //     b1.x < b2.x + b2.width,
  //     b1.y > b2.y,
  //     b1.y < b2.y + b2.height);
  // }

  // return bool;
  return (
    b1.x < b2.x + b2.width &&
    b1.x + b1.width > b2.x &&
    b1.y < b2.y + b2.height &&
    b1.height + b1.y > b2.y
  );
}

function getMoreBoxInfo(box: CollisionBox) {
  return {
    left: box.x,
    right: box.x + box.width,
    top: box.y,
    bottom: box.y + box.height,
  };
}

// source for these collision functions:
// https://gamedev.stackexchange.com/questions/13774/how-do-i-detect-the-direction-of-2d-rectangular-object-collisions
function leftCollision(
  blockBounds: CollisionBox,
  currentBallBounds: CollisionBox,
  prevBallBounds: CollisionBox
) {
  const blockInfo = getMoreBoxInfo(blockBounds);
  const ballInfo = getMoreBoxInfo(currentBallBounds);
  const oldBallInfo = getMoreBoxInfo(prevBallBounds);

  return oldBallInfo.right < blockInfo.left && ballInfo.right >= blockInfo.left;
}

function rightCollision(
  blockBounds: CollisionBox,
  currentBallBounds: CollisionBox,
  prevBallBounds: CollisionBox
) {
  const blockInfo = getMoreBoxInfo(blockBounds);
  const ballInfo = getMoreBoxInfo(currentBallBounds);
  const oldBallInfo = getMoreBoxInfo(prevBallBounds);

  return oldBallInfo.left >= blockInfo.right && ballInfo.left < blockInfo.right;
}

//  return (
//    oldBoxBottom < otherObj.Top && // was not colliding
//    boxBottom >= otherObj.Top
//  );

function topCollision(
  blockBounds: CollisionBox,
  currentBallBounds: CollisionBox,
  prevBallBounds: CollisionBox
) {
  const blockInfo = getMoreBoxInfo(blockBounds);
  const ballInfo = getMoreBoxInfo(currentBallBounds);
  const oldBallInfo = getMoreBoxInfo(prevBallBounds);

  console.log(oldBallInfo.bottom, blockInfo.top);

  return oldBallInfo.bottom < blockInfo.top && ballInfo.bottom >= blockInfo.top;
}

function bottomCollision(
  blockBounds: CollisionBox,
  currentBallBounds: CollisionBox,
  prevBallBounds: CollisionBox
) {
  const blockInfo = getMoreBoxInfo(blockBounds);
  const ballInfo = getMoreBoxInfo(currentBallBounds);
  const oldBallInfo = getMoreBoxInfo(prevBallBounds);

  return oldBallInfo.top >= blockInfo.bottom && ballInfo.top < blockInfo.bottom;
}

class Ball {
  scene: Scene;
  gameContext: any;
  lastBounds: CollisionBox;
  currentBounds: CollisionBox;
  lastCollision: any;
  dirX: number = 0.01;
  dirY: number = -1;
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
    this.lastBounds = this.currentBounds;
  }

  flipDirectionX() {
    this.dirX = -this.dirX;
  }

  flipDirectionY() {
    this.dirY = -this.dirY;
  }

  render(deltaTime: number) {
    const bounds = this.currentBounds;
    const { x, y, width, height } = bounds;
    const gameContext = this.gameContext;
    const ctx = gameContext.drawContext;

    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);

    this.updateBounds(deltaTime);
    this.updateCollisions(deltaTime);
  }

  updateBounds(deltaTime: number) {
    this.currentBounds.x += this.dirX * deltaTime * this.speed;
    this.currentBounds.y += this.dirY * deltaTime * this.speed;
  }

  updateCollisions(deltaTime: number) {
    const cvs = this.gameContext.canvas;
    const bounds = this.currentBounds;
    const { x, y, width, height } = bounds;

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

    // block collision
    const blocks = this.scene.blocks;
    blocks.allBlocks.every((block, index) => {
      // block is still alive
      if (block.unbreakable || block.health > 0) {
        const intersected = boxesIntersected(bounds, block.bounds, index == 0);
        const lastCollided = this.lastCollision === block.id;

        if (lastCollided && !intersected) {
          this.lastCollision = undefined;
        } else if (!lastCollided && intersected) {
          this.lastCollision = block.id;

          const blockInfo = getMoreBoxInfo(block.bounds);
          const ballInfo = getMoreBoxInfo(this.currentBounds);

          let penTop = Infinity;
          let penBottom = Infinity;
          let penLeft = Infinity;
          let penRight = Infinity;

          // bottom side collision
          if (
            this.dirY < 0 &&
            ballInfo.top <= blockInfo.bottom &&
            ballInfo.bottom >= blockInfo.top
          ) {
            penBottom = blockInfo.bottom - ballInfo.top;
            console.log("bottom:", penBottom);
          }

          // top side collsion
          if (
            this.dirY > 0 &&
            ballInfo.bottom >= blockInfo.top &&
            ballInfo.top <= blockInfo.bottom
          ) {
            penTop = ballInfo.bottom - blockInfo.top;
            console.log("top:", penTop);
          }

          // right side collision
          if (
            this.dirX < 0 &&
            ballInfo.left <= blockInfo.right &&
            ballInfo.right >= blockInfo.left
          ) {
            let neighbor: Block;

            // make sure array not out of bounds
            if (index + 1 < blocks.allBlocks.length) {
              const testBlock: Block = blocks.allBlocks[index + 1];

              // must be on same row
              if (
                testBlock &&
                (testBlock.unbreakable || testBlock.health > 0) &&
                testBlock.bounds.y == block.bounds.y
              ) {
                neighbor = testBlock;
              }
            }

            if (!neighbor) {
              penRight = blockInfo.right - ballInfo.left;
              console.log("right:", penRight);
            }
          }

          // left side collision
          if (
            this.dirX > 0 &&
            ballInfo.right >= blockInfo.left &&
            ballInfo.left <= blockInfo.right
          ) {
            let neighbor: Block;

            // make sure array not out of bounds
            if (index != 0) {
              const testBlock: Block = blocks.allBlocks[index - 1];

              // must be on same row
              if (
                testBlock &&
                (testBlock.unbreakable || testBlock.health > 0) &&
                testBlock.bounds.y == block.bounds.y
              ) {
                neighbor = testBlock;
              }
            }

            if (!neighbor) {
              penLeft = ballInfo.right - blockInfo.left;
              console.log("left:", penLeft);
            }
          }

          if (
            (penLeft < penTop && penLeft < penBottom) ||
            (penRight < penTop && penRight < penBottom)
          ) {
            this.flipDirectionX();
          } else {
            this.flipDirectionY();
          }

          // stop iterating
          return false;
        }
      }

      // keep going
      return true;
    });

    // store last bounds
    this.lastBounds = { ...this.currentBounds };

    // lose game if ball reaches bottom
    if (y >= cvs.height) {
      console.log("game over!");
    }
  }
}

export { Ball };

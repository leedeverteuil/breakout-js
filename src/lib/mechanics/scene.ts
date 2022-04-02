import { Ball } from "./ball";
import { Platform } from "./platform";
import { makeBlocks } from "./levels";
import type { Blocks } from "./blocks";

const ONE_SIXTIETH = 1 / 60;

class Scene {
  lives: number;
  platform: Platform;
  ball: Ball;
  blocks: Blocks;
  gameContext: any;
  lastTimestamp: number;
  destroyed: boolean = false;

  constructor(gameContext: any, lives: number) {
    this.lives = lives;
    this.gameContext = gameContext;
    this.platform = new Platform(gameContext.drawContext);
    this.blocks = makeBlocks(gameContext, 0);

    // clear game context props
    gameContext.lives.set(3);
    gameContext.points.set(0);

    // start rendering
    this.requestNextFrame();
  }

  spawnBall() {
    if (!this.ball) {
      this.ball = new Ball(this);
    }
  }

  requestNextFrame() {
    requestAnimationFrame((timestamp: number) => {
      // how much time has passed since last frame
      // we scale physics calculations with this
      // so they remain the same even if frames
      // per second drops
      const lastTs = this.lastTimestamp;
      const deltaTime = lastTs ? timestamp - lastTs : ONE_SIXTIETH;

      const drawContext = this.gameContext.drawContext;
      const canvas = this.gameContext.canvas;

      // clear canvas for redraw
      drawContext.clearRect(0, 0, canvas.width, canvas.height);

      // render game objects
      this.platform.render();
      this.blocks.render();
      if (this.ball) this.ball.render(deltaTime);

      if (!this.destroyed) {
        this.requestNextFrame();
      }
    });
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
    }
  }
}

export { Scene };

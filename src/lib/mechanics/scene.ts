import { Blocks } from "./blocks";
import { Platform } from "./platform";

class Scene {
  lives: number;
  platform: Platform;
  blocks: Blocks;
  gameContext: any;
  destroyed: boolean = false;

  constructor(gameContext: any, lives: number) {
    this.lives = lives;
    this.gameContext = gameContext;
    this.platform = new Platform(gameContext.drawContext);
    this.blocks = new Blocks();

    // start rendering
    this.requestNextFrame();
  }

  spawnBall() {
    console.log("spawn ball");
  }

  requestNextFrame() {
    requestAnimationFrame(() => {
      const drawContext = this.gameContext.drawContext;
      const canvas = this.gameContext.canvas;

      // clear canvas for redraw
      drawContext.clearRect(0, 0, canvas.width, canvas.height);

      // render game objects
      this.platform.render();

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

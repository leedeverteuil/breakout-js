import { Bricks } from "./bricks";
import type { GameContext } from "./context";
import type { Layout } from "./layouts";
import { Paddle } from "./paddle";
import { Puck } from "./puck";

enum MatchState {
  Paused,
  Running,
  Ended,
}

class Match {
  // constants
  PUCK_Y_OFFSET = 10;

  // props
  puck: Puck;
  paddle: Paddle;
  layout: Layout;
  bricks: Bricks;
  context: GameContext;
  state = MatchState.Paused;
  lastTick: number;
  isRendering = false;

  constructor(context: GameContext, layout: Layout) {
    this.context = context;
    this.layout = layout;
    context.match = this;
    this.paddle = new Paddle(context);
    this.bricks = new Bricks(context);
    this.runGame();
  }

  destroy() {
    this.endGame();
  }

  spawnPuck() {
    const paddle = this.paddle;
    this.puck?.destroy();
    this.puck = new Puck(
      paddle.center(),
      paddle.top() - this.PUCK_Y_OFFSET,
      this.context
    );
  }

  endGame(won: boolean = false) {
    if (this.state != MatchState.Ended) {
      this.state = MatchState.Ended;

      // prevent memory leaks
      this.puck?.destroy();
      this.paddle.destroy();
      this.bricks.destroy();

      // update context
      this.context.gameOver.set(true);
      this.context.gameWon.set(won);
    }
  }

  pauseGame() {
    if (this.state == MatchState.Running) {
      this.state = MatchState.Paused;
    }
  }

  runGame() {
    if (this.state == MatchState.Paused) {
      this.state = MatchState.Running;
      if (!this.isRendering) {
        this.continueRendering();
      }
    }
  }

  continueRendering() {
    requestAnimationFrame((tick) => {
      // how much time has passed since last frame
      // we scale physics calculations with this
      // so they remain the same even if frames
      // per second drops
      const delta = this.lastTick ? tick - this.lastTick : 1 / 60;

      // clear canvas
      const canvas = this.context.canvas;
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      // update objects
      this.paddle.update();
      this.puck?.update(delta);
      this.bricks.update();

      if (this.state == MatchState.Running) {
        this.isRendering = true;
        this.continueRendering();
      } else {
        this.isRendering = false;
      }
    });
  }
}

export { Match };

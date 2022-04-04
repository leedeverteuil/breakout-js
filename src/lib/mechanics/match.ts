import { Bricks } from "./bricks";
import type { GameContext } from "./context";
import type { Difficulty } from "./difficulty";
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
  difficulty: Difficulty;
  context: GameContext;
  state = MatchState.Paused;
  lastTick: number;
  isRendering = false;
  removeListeners: Function;

  constructor(context: GameContext, layout: Layout, difficulty: Difficulty) {
    this.context = context;
    this.layout = layout;
    this.difficulty = difficulty;
    context.match = this;
    this.paddle = new Paddle(context);
    this.bricks = new Bricks(context);
    this.context.lives.set(this.difficulty.lives);
    this.addListeners();
    this.runGame();
  }

  destroy() {
    this.endGame(true);
    this.removeListeners();
  }

  removePuck() {
    this.puck?.destroy();
    this.puck = undefined;
  }

  spawnPuck() {
    const paddle = this.paddle;
    this.removePuck();
    this.puck = new Puck(
      paddle.center(),
      paddle.top() - this.PUCK_Y_OFFSET,
      this.context
    );
  }

  addListeners() {
    const obj = this;
    const canvas = this.context.canvas;
    const pause = (e: KeyboardEvent) => {
      if (e.code == "KeyP") {
        if (this.state == MatchState.Running) {
          obj.pauseGame();
        } else if (this.state == MatchState.Paused) {
          obj.runGame();
        }
      }
    };

    const clickSpawn = (e: MouseEvent) => {
      if (!this.puck) {
        obj.spawnPuck();
      }
    };

    document.addEventListener("keydown", pause);
    canvas.addEventListener("mousedown", clickSpawn);

    this.removeListeners = () => {
      document.removeEventListener("keydown", pause);
      canvas.removeEventListener("mousedown", clickSpawn);
    };
  }

  endGame(destroyed: boolean = false, won: boolean = false) {
    if (this.state != MatchState.Ended) {
      this.state = MatchState.Ended;

      // prevent memory leaks
      this.puck?.destroy();
      this.paddle.destroy();
      this.bricks.destroy();

      if (!destroyed) {
        // update context
        this.context.gameOver.set(true);
        this.context.gameWon.set(won);
      }
    }
  }

  drawPauseBars() {
    const canvas = this.context.canvas;
    const context = canvas.getContext("2d");
    const w = canvas.width,
      h = canvas.height;
    const bw = 20,
      bh = 80; // bar width & height
    const pw = 20; // x padding from center
    context.clearRect(0, 0, w, h);
    context.fillStyle = "#fff";

    // left bar
    context.fillRect(w / 2 - pw - bw, h / 2 - bh / 2, bw, bh);

    // right bar
    context.fillRect(w / 2 + pw, h / 2 - bh / 2, bw, bh);
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

        if (this.state == MatchState.Paused) {
          this.drawPauseBars();
        }
      }
    });
  }
}

export { Match };

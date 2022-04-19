import type { GameContext } from "./context";
import { PhysicsBox } from "./physics";

class Powerup {
  // constants
  WIDTH = 25;
  HEIGHT = 25;
  DESCENT_SPEED = 2;

  // props
  capturedTime: number;
  lost = false;
  box: PhysicsBox;
  context: GameContext;
  text: string;
  value: string;
  duration: number;

  constructor(
    context: GameContext,
    text: string,
    value: string,
    x: number,
    y: number,
    duration: number
  ) {
    this.context = context;
    this.text = text;
    this.value = value;
    this.duration = duration;
    this.box = new PhysicsBox(x, y, this.WIDTH, this.HEIGHT);
  }

  destroy() {}

  update(deltaTime: number) {
    this.updatePosition(deltaTime);
    this.updateCollision();
    this.render();
  }

  isActive() {
    return (
      !this.lost &&
      this.capturedTime &&
      Date.now() - this.capturedTime <= this.duration * 1000
    );
  }

  render() {
    const context = this.context.canvas.getContext("2d");
    const { x, y, w, h } = this.box;

    // stroke around box
    context.strokeStyle = "#fff";
    context.strokeRect(x, y, w, h);

    // write text
    context.fillStyle = "#fff";
    context.fillText(this.text, x, y);
  }

  updatePosition(deltaTime: number) {
    const box = this.box;
    box.y -= this.DESCENT_SPEED * deltaTime;

    // out of bounds, disappear
    const canvas = this.context.canvas;
    if (box.y < canvas.height) {
      this.lost = true;
    }
  }

  updateCollision() {
    if (!(this.lost || this.capturedTime)) {
      const context = this.context;
      const thisBox = this.box;
      const paddle = context.match.paddle;

      if (paddle.box.isIntersecting(thisBox)) {
        this.capturedTime = Date.now();
      }
    }
  }
}

class Powerups {
  context: GameContext;
  all = new Array<Powerup>();

  constructor(context: GameContext) {}

  destroy() {
    this.all.forEach((p) => p.destroy());
  }

  update(deltaTime: number) {
    this.all.forEach((p) => {
      if (!p.lost && !p.capturedTime) {
        p.update(deltaTime);
      }
    });
  }

  getActivePowerups(): Array<string> {
    const values = new Array<string>();
    this.all.forEach((p) => {
      if (p.isActive() && !values.includes(p.value)) {
        values.push(p.value);
      }
    });

    return values;
  }
}

export { Powerup };

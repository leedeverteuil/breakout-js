import type { GameContext } from "./context";
import { PhysicsBox } from "./physics";

class Paddle {
  // constants
  REGULAR_WIDTH = 65;
  JUMBO_WIDTH = 120;
  HEIGHT = 12;
  Y_OFFSET = 20;

  // props
  context: GameContext;
  box: PhysicsBox;
  removeListener: Function;

  constructor(context: GameContext) {
    this.context = context;
    this.box = new PhysicsBox(
      0,
      this.Y_OFFSET,
      this.REGULAR_WIDTH,
      this.HEIGHT
    );

    // listen to mouse updates
    this.addListener();
  }

  destroy() {
    this.removeListener();
  }

  center() {
    return this.box.x + this.box.w / 2;
  }

  top() {
    return this.box.y;
  }

  addListener() {
    const paddle = this;
    const handler = (e: MouseEvent) => paddle.onMouseMove(e);
    document.addEventListener("mousemove", handler);

    this.removeListener = () => {
      document.removeEventListener("mousemove", handler);
    }
  }

  onMouseMove(e: MouseEvent) {
    // relative mouse position inside canvas
    const canvas = this.context.canvas;
    const canvasRect: DOMRect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.x;

    // make sure platform does not go outside canvas
    // even if mouse is at the edge
    const box = this.box;
    const halfWidth = box.w / 2;
    const minX = halfWidth;
    const maxX = canvas.width - halfWidth;
    box.x = Math.min(Math.max(mouseX, minX), maxX) - halfWidth;
  }

  updateWidth() {
    this.box.w = this.context.powerups.jumboPlatform
      ? this.JUMBO_WIDTH
      : this.REGULAR_WIDTH;
  }

  updateHeight() {
    this.box.y = this.context.canvas.height - this.Y_OFFSET - this.box.h / 2;
  }

  update() {
    this.updateWidth();
    this.updateHeight();

    // rendering
    const box = this.box;
    const context = this.context.canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(box.x, box.y, box.w, box.h);
  }
}

export { Paddle };

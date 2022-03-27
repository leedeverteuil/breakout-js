import type { CollisionBox } from "./types";

const REGULAR_WIDTH = 50;
const JUMBO_WIDTH = 100;
const PLATFORM_HEIGHT = 12;
const PLATFORM_Y_PADDING = 20;

class Platform {
  renderContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  posX: number = 200;
  currentBounds: CollisionBox;
  destroyed: boolean = false;

  // powerup states
  powerJumboBool: boolean = false;
  powerJumboId: Symbol;

  // event cleanup functions
  removeMouseListener: Function;

  constructor(renderContext: CanvasRenderingContext2D) {
    this.renderContext = renderContext;
    this.canvas = renderContext.canvas;

    this.removeMouseListener = this.addMouseListener();
  }

  addMouseListener() {
    if (!this.removeMouseListener) {
      const listener = (e: MouseEvent) => {
        // converts position of mouse to usable
        // position of platform
        const rect: DOMRect = this.canvas.getBoundingClientRect();
        this.posX = e.clientX - rect.x;
      };

      this.canvas.addEventListener("mousemove", listener);

      // make function for easy cleanup later
      return () => {
        this.canvas.removeEventListener("mousemove", listener);
      };
    }
  }

  powerJumbo(time: number) {
    // this is to make sure we only cancel
    // the most recent powerup
    const threadId = Symbol();
    this.powerJumboId = threadId;
    this.powerJumboBool = true;
    setTimeout(() => {
      if (!this.destroyed && this.powerJumboId == threadId) {
        this.powerJumboBool = false;
      }
    }, time);
  }

  render() {
    // draw platform on context based
    // on powerup states && position of mouse
    const ctx = this.renderContext;
    const cvs = this.canvas;
    const width = this.powerJumboBool ? JUMBO_WIDTH : REGULAR_WIDTH;
    const height = PLATFORM_HEIGHT;
    const halfWidth = width / 2;

    // make sure platform does not go outside canvas
    // even if mouse is at the edge
    const minX = halfWidth;
    const maxX = this.canvas.width - halfWidth;
    const x = Math.min(Math.max(this.posX, minX), maxX) - halfWidth;

    // give a little room above the bottom of canvas
    const y = cvs.height - PLATFORM_Y_PADDING - height / 2;

    ctx.fillStyle = "#000";
    ctx.fillRect(x, y, width, PLATFORM_HEIGHT);

    // save bounds for physics calculations
    this.currentBounds = { x: x, y: y, width: width, height: height };
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.removeMouseListener();
    }
  }
}

export { Platform };

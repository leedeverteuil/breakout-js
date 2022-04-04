type PenetrationInfo = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

class PhysicsBox {
  id: string;
  x: number = 0;
  y: number = 0;
  w: number = 0;
  h: number = 0;
  canvas: HTMLCanvasElement;

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    canvas?: HTMLCanvasElement
  ) {
    this.id = crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.canvas = canvas;
  }

  top(): number {
    return this.y;
  }

  bottom(): number {
    return this.y + this.h;
  }

  left(): number {
    return this.x;
  }

  right(): number {
    return this.x + this.w;
  }

  outOfBoundsX(): boolean {
    return this.canvas && (this.x + this.w >= this.canvas.width || this.x <= 0);
  }

  outOfBoundsTop(): boolean {
    return this.y <= 0;
  }

  outOfBoundsBottom(): boolean {
    return this.canvas && this.bottom() >= this.canvas.height;
  }

  isIntersecting(otherBox: PhysicsBox) {
    return (
      this.x < otherBox.x + otherBox.w &&
      this.x + this.w > otherBox.x &&
      this.y < otherBox.y + otherBox.h &&
      this.h + this.y > otherBox.y
    );
  }

  getPenetration(otherBox: PhysicsBox): PenetrationInfo {
    // penetration vars
    let pt = Infinity,
      pb = Infinity,
      pl = Infinity,
      pr = Infinity;

    // "this" constants
    const tt = this.top(),
      tb = this.bottom(),
      tl = this.left(),
      tr = this.right();

    // other constants
    const ot = otherBox.top(),
      ob = otherBox.bottom(),
      ol = otherBox.left(),
      or = otherBox.right();

    // bottom
    if (tt <= ob && ob >= tt) pb = tb - ot;

    // top
    if (ob >= tt && tt <= ob) pt = ob - tt;

    // right
    if (ol <= tr && or >= tl) pr = tr - ol;

    // left
    if (or >= tl && ol <= tr) pl = or - tl;

    return {
      top: pt,
      bottom: pb,
      left: pl,
      right: pr,
    };
  }
}

export { PhysicsBox };

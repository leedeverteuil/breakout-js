import type { GameContext } from "./context";
import type { Layout } from "./layouts";
import { PhysicsBox } from "./physics";

type ColorSet = Array<string>;

type Neighbors = {
  left?: Brick;
  right?: Brick;
  top?: Brick;
  bottom?: Brick;
};

const COLORSETS: Array<ColorSet> = [
  ["#4f4f4f"],
  ["#fcc932"],
  ["#37b221", "#50fc32"],
  ["#1c5782", "#287dba", "#329ae5"],
];

class Brick {
  // constants
  WIDTH = 500 / 8;
  HEIGHT = 400 / 12;
  POINTS_FOR_HIT = 50;
  POINTS_FOR_BREAK = 150;

  // props
  health: number;
  unbreakable: boolean;
  box: PhysicsBox;
  context: GameContext;
  neighbors: Neighbors;
  colorSet: ColorSet;
  row: number;
  col: number;
  broken = false;

  constructor(
    context: GameContext,
    health: number,
    unbreakable: boolean,
    row: number,
    col: number
  ) {
    this.context = context;
    this.health = health;
    this.unbreakable = unbreakable;
    this.row = row;
    this.col = col;
    this.makeBox();
    this.colorSet = unbreakable ? COLORSETS[0] : COLORSETS[health];
  }

  destroy() {}

  hit() {
    if (!this.unbreakable && !this.broken) {
      this.health -= 1;
      this.broken = this.health <= 0;

      // give player some points
      const pts = this.broken ? this.POINTS_FOR_BREAK : this.POINTS_FOR_HIT;
      this.context.points.update(old => old + pts);

      // last brick broken check, win game
      if (this.broken && this.context.match.bricks.allBricksBroken()) {
        this.context.match.endGame(true);
      }
    }
  }

  hasTopNeighbor() {
    return this.neighbors.top && !this.neighbors.top.broken;
  }

  hasBottomNeighbor() {
    return this.neighbors.bottom && !this.neighbors.bottom.broken;
  }

  hasLeftNeighbor() {
    return this.neighbors.left && !this.neighbors.left.broken;
  }

  hasRightNeighbor() {
    return this.neighbors.right && !this.neighbors.right.broken;
  }

  makeBox() {
    const y = this.row * this.HEIGHT;
    const x = this.col * this.WIDTH;
    this.box = new PhysicsBox(x, y, this.WIDTH, this.HEIGHT);
  }

  render() {
    if (!this.broken) {
      const box = this.box;
      const context = this.context.canvas.getContext("2d");
      context.fillStyle = this.colorSet[this.health - 1];
      context.fillRect(box.x, box.y, box.w, box.h);
    }
  }

  findNeighbors(bricks: Bricks) {
    // find all direct neighbors of
    // the brick, this will be needed
    // for the ball to calculate
    // deflection accurately
    const neighbors: Neighbors = {};
    bricks.all.forEach((b) => {
      if (b != this) {
        const rowDiff = this.row - b.row;
        const colDiff = this.col - b.col;

        if (colDiff == 0) {
          if (rowDiff == -1) neighbors.bottom = b;
          else if (rowDiff == 1) neighbors.top = b;
        } else if (rowDiff == 0) {
          if (colDiff == -1) neighbors.right = b;
          else if (colDiff == 1) neighbors.left = b;
        }
      }
    });
    this.neighbors = neighbors;
  }
}

class Bricks {
  context: GameContext;
  layout: Layout;
  all: Array<Brick>;

  constructor(context: GameContext) {
    this.context = context;
    this.layout = context.match.layout;
    this.all = new Array<Brick>();
    this.makeBricks();
  }

  destroy() {
    this.all.forEach((b) => b.destroy());
  }

  update() {
    this.all.forEach((b) => b.render());
  }

  allBricksBroken() {
    return this.all.every(b => b.unbreakable || b.broken);
  }

  makeBricks() {
    const context = this.context;
    this.layout.rows.forEach((str, row) => {
      for (let col = 0; col < str.length; col++) {
        const char = str.charAt(col);
        let b: Brick;

        // unbreakable
        if (char == "#") {
          b = new Brick(context, 1, true, row, col);
        }
        // number denotes lives
        else {
          const parsed = parseInt(char);
          if (parsed) {
            b = new Brick(context, parsed, false, row, col);
          }
        }

        if (b) {
          this.all.push(b);
        }
      }
    });

    // build connections to neighbors
    this.all.forEach((b) => b.findNeighbors(this));
  }
}

export { Bricks };

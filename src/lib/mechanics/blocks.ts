import type { CollisionBox } from "./types";

const HEALTH_COLORS = {
  unbreakable: ["#aaa"],
  1: ["#fcc932"],
  2: ["#37b221", "#50fc32"],
  3: ["#1c5782", "#287dba", "#329ae5"],
  4: ["#471116", "#66171f", "#a02632", "#db2e3f"],
};

class Block {
  bounds: CollisionBox;
  health: number;
  unbreakable: boolean;
  destroyed: boolean = false;
  colorSet: Array<string>;
  id: string;

  constructor(bounds: CollisionBox, health: number, unbreakable: boolean) {
    this.bounds = bounds;
    this.health = health;
    this.unbreakable = unbreakable;
    this.id = crypto.randomUUID();

    // get colors for showing damage
    this.colorSet = unbreakable
      ? HEALTH_COLORS.unbreakable
      : HEALTH_COLORS[health];
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.health > 0) {
      const bounds = this.bounds;
      const { x, y, width, height } = bounds;

      // select block color
      if (this.unbreakable) {
        ctx.fillStyle = this.colorSet[0];
      } else {
        ctx.fillStyle = this.colorSet[this.health - 1];
      }

      ctx.fillRect(x, y, width, height);
    }
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
    }
  }
}

class Blocks {
  allBlocks: Array<Block>;
  breakableBlocks: Array<Block>;
  destroyed: boolean = false;
  gameContext: any;

  constructor(gameContext: any, allBlocks: Array<Block>) {
    this.gameContext = gameContext;
    this.allBlocks = allBlocks;

    // store breakables
    this.breakableBlocks = new Array<Block>();
    this.allBlocks.forEach((block) => {
      if (!block.unbreakable) {
        this.breakableBlocks.push(block);
      }
    });
  }

  render() {
    this.allBlocks.forEach((block) => {
      block.render(this.gameContext.drawContext);
    });
  }

  allBlocksBroken(): boolean {
    this.breakableBlocks.forEach((block) => {
      if (block.health > 0) {
        return false;
      }
    });

    return true;
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
    }
  }
}

export { Block, Blocks };

import { Block, Blocks } from "./blocks";
import type { CollisionBox } from "./types";

type BlockData = {
  bounds: CollisionBox;
  health: number;
  unbreakable: boolean;
};

type LevelData = {
  blocks: Array<BlockData>;
};

const levels: Array<LevelData> = [
  {
    blocks: [
      {
        bounds: { x: 50, y: 70, width: 50, height: 20 },
        health: 4,
        unbreakable: false,
      },
      {
        bounds: { x: 100, y: 70, width: 50, height: 20 },
        health: 4,
        unbreakable: true,
      },
      {
        bounds: { x: 150, y: 70, width: 50, height: 20 },
        health: 4,
        unbreakable: true,
      },
      {
        bounds: { x: 200, y: 70, width: 50, height: 20 },
        health: 4,
        unbreakable: false,
      },
      {
        bounds: { x: 250, y: 70, width: 50, height: 20 },
        health: 3,
        unbreakable: false,
      },
      {
        bounds: { x: 300, y: 70, width: 50, height: 20 },
        health: 3,
        unbreakable: false,
      },
      {
        bounds: { x: 350, y: 70, width: 50, height: 20 },
        health: 2,
        unbreakable: false,
      },
      {
        bounds: { x: 400, y: 70, width: 50, height: 20 },
        health: 2,
        unbreakable: false,
      },
    ],
  },
];

function makeBlocks(gameContext: any, index: number): Blocks {
  const data: LevelData = levels[index];
  if (data) {
    const blocksArg = new Array<Block>();

    data.blocks.forEach((blockData) => {
      blocksArg.push(
        new Block(blockData.bounds, blockData.health, blockData.unbreakable)
      );
    });

    return new Blocks(gameContext, blocksArg);
  }

  return undefined;
}

export { makeBlocks };

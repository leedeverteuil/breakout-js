import type { Writable } from "svelte/store";
import type { Match } from "./match";

type GameContext = {
  lives: Writable<number>,
  points: Writable<number>,
  gameOver: Writable<boolean>,
  gameWon: Writable<boolean>,
  canvas?: HTMLCanvasElement,
  match?: Match,
  powerups: {
    jumboPlatform?: boolean,
  }
}

export type { GameContext };
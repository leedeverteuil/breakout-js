<script lang="ts">
  import GameCanvas from "./GameCanvas.svelte";
  import GameConsole from "./GameConsole.svelte";
  import GameBar from "./GameBar.svelte";
  import { Github } from "svelte-bootstrap-icons/lib/Github";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { GameContext } from "./mechanics/context";
  import GameMessage from "./GameMessage.svelte";
  import { Match } from "./mechanics/match";
  import { layouts, type Layout } from "./mechanics/layouts";
  import { difficulty, type Difficulty } from "./mechanics/difficulty";

  let canvas: GameCanvas;
  const gameContext: GameContext = {
    lives: writable(1),
    points: writable(0),
    gameOver: writable(false),
    gameWon: writable(false),
    powerups: {},
  };

  function resetContext() {
    gameContext.lives.set(1);
    gameContext.points.set(0);
    gameContext.gameOver.set(false);
    gameContext.gameWon.set(false);
    gameContext.powerups = {};
  }

  function startGame(e: CustomEvent) {
    if (canvas) {
      resetContext();
      gameContext.match?.destroy();

      const detail = e.detail;
      const layout: Layout = layouts[detail.level];
      const diff: Difficulty = difficulty[detail.difficulty];
      gameContext.match = new Match(gameContext, layout, diff);
    }
  }

  setContext("game", gameContext);
</script>

<section class="shadow-lg bg-slate-800 rounded-lg p-5">
  <GameBar />
  <GameMessage />
  <GameCanvas bind:this={canvas} />
  <GameConsole on:newgame={startGame} />

  <!-- Credits -->
  <a
    class="flex flex-row justify-center items-center gap-2 mt-4 text-sm text-center
           text-slate-600 hover:text-blue-500 hover:underline"
    href="http://github.com/leedeverteuil">
    Made by Lee de Verteuil
    <Github />
  </a>
</section>

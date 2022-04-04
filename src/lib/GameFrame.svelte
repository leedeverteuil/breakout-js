<script lang="ts">
  import GameCanvas from "./GameCanvas.svelte";
  import GameConsole from "./GameConsole.svelte";
  import GameBar from "./GameBar.svelte";
  import { Github } from "svelte-bootstrap-icons/lib/Github";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { GameContext } from "./mechanics/context";

  let canvas: GameCanvas;
  const gameContext: GameContext = {
    lives: writable(3),
    points: writable(0),
    gameOver: writable(false),
    gameWon: writable(false),
    powerups: {}
  };

  function startGame() {
    if (canvas) {
      canvas.startGame();
    }
  }

  function spawnBall() {
    const match = gameContext.match;
    if (match) {
      match.spawnPuck();
    }
  }

  setContext("game", gameContext);
</script>

<section class="shadow-lg bg-slate-800 rounded-lg p-5">
  <GameBar />
  <GameCanvas bind:this={canvas} />
  <GameConsole on:newgame={startGame} on:spawnball={spawnBall} />

  <!-- Credits -->
  <a
    class="flex flex-row justify-center items-center gap-2 mt-4 text-sm text-center
           text-slate-600 hover:text-blue-500 hover:underline"
    href="http://github.com/leedeverteuil">
    Made by Lee de Verteuil
    <Github />
  </a>
</section>

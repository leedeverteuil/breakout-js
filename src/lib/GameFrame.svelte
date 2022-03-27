<script lang="ts">
  import GameCanvas from "./GameCanvas.svelte";
  import GameConsole from "./GameConsole.svelte";
  import { Github } from "svelte-bootstrap-icons/lib/Github";
  import { setContext } from "svelte";
  import type { Scene } from "./mechanics/scene";

  let canvas: GameCanvas;
  let gameContext: any = {};

  function startGame() {
    if (canvas) {
      canvas.startGame();
    }
  }

  function spawnBall() {
    let scene: Scene = gameContext.scene;
    if (scene) {
      scene.spawnBall();
    }
  }

  setContext("game", gameContext);
</script>

<section class="shadow-lg bg-slate-800 rounded-lg p-5">
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

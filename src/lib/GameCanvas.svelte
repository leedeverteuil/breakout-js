<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { Scene } from "./mechanics/scene";

  let gameContext: any = getContext("game");
  let canvas: HTMLCanvasElement;
  let drawContext: CanvasRenderingContext2D;

  onMount(() => {
    drawContext = canvas.getContext("2d");
    gameContext.canvas = canvas;
    gameContext.drawContext = drawContext;
  });

  function reset() {
    // clear canvas
    drawContext.clearRect(0, 0, canvas.width, canvas.height);

    // destroy old scene
    if (gameContext.scene) {
      gameContext.scene.destroy();
    }
  }

  export function startGame() {
    reset();

    // make new scene
    let scene = new Scene(gameContext, 3);
    gameContext.scene = scene;
  }
</script>

<div class="flex flex-row justify-center">
  <canvas
    class="border border-gray-900 bg-black rounded-lg"
    bind:this={canvas}
    width="525"
    height="400" />
</div>
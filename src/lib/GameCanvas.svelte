<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { GameContext } from "./mechanics/context";
  import { layouts } from "./mechanics/layouts";
  import { Match } from "./mechanics/match";

  const gameContext: GameContext = getContext("game");
  let canvas: HTMLCanvasElement;

  onMount(() => {
    gameContext.canvas = canvas;
  });

  function reset() {
    const renderContext = canvas.getContext("2d");
    renderContext.clearRect(0, 0, canvas.width, canvas.height);
    gameContext.match?.destroy();
  }

  export function startGame() {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    gameContext.match?.destroy();
    gameContext.match = new Match(gameContext, layouts[0]);
  }
</script>

<div class="flex flex-col justify-center">
  <canvas
    class="border border-gray-900 bg-black rounded-lg"
    bind:this={canvas}
    width="500"
    height="400" />
</div>

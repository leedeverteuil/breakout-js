<script lang="ts">
  import { getContext } from "svelte";
  import type { GameContext } from "./mechanics/context";

  let context: GameContext = getContext("game");
</script>

<div class="flex flex-col justify-center">
  <canvas
    class="border border-gray-800 bg-black rounded-lg"
    bind:this={context.canvas}
    width="500"
    height="400" />
</div>

<script lang="ts">
  import { fly } from "svelte/transition";
  import { getContext } from "svelte";
  import type { GameContext } from "./mechanics/context";
  import StarFill from "svelte-bootstrap-icons/lib/StarFill";

  const gameContext: GameContext = getContext("game");
  const gameOver = gameContext.gameOver,
    gameWon = gameContext.gameWon,
    points = gameContext.points;
</script>

{#if $gameOver}
  <div
    class="text-gray-100 text-3xl font-bold text-center p-3 my-2 rounded-lg"
    in:fly={{ x: 200, duration: 500 }}>
    {#if $gameWon}
      <p>Level completed!</p>
      <p class="flex flex-row items-center justify-center gap-2 text-2xl mt-1">
        <StarFill />
        {$points}
      </p>
    {:else}
      <p>Game over!</p>
    {/if}
  </div>
{/if}

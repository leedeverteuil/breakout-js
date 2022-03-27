<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Controller } from "svelte-bootstrap-icons/lib/Controller";
  import { CaretRightFill } from "svelte-bootstrap-icons/lib/CaretRightFill";

  let dispatch = createEventDispatcher();

  function makeNewGame() {
    dispatch("newgame");
  }

  function spawnBall() {
    dispatch("spawnball");
  }
</script>

<div class="flex flew-row gap-4 justify-center mt-5">
  <!-- New game button -->
  <button
    class="flex flex-row gap-1.5 items-center border border-yellow-400 shadow-sm shadow-slate-900
         text-yellow-900  bg-yellow-500 px-5 py-2 rounded-lg
         transition-all hover:shadow-lg hover:scale-105"
    on:click={makeNewGame}>
    New Game
    <Controller />
  </button>

  <!-- Launch ball button -->
  <button
    class="flex flex-row gap-1.5 items-center border border-yellow-400 shadow-sm shadow-slate-900
         text-yellow-900  bg-yellow-500 px-5 py-2 rounded-lg
         transition-all hover:shadow-lg hover:scale-105"
    on:click={spawnBall}>
    Launch Ball
    <CaretRightFill />
  </button>
</div>

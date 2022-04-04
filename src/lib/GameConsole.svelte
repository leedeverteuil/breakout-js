<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { layouts } from "./mechanics/layouts";
  import Controller from "svelte-bootstrap-icons/lib/Controller";

  let dispatch = createEventDispatcher();
  let level: number;
  let difficulty: string;

  // make new game when lvl or
  // difficulty changes
  $: {
    dispatch("newgame", { level: level, difficulty: difficulty });
  }

  function newGame() {
    dispatch("newgame", { level: level, difficulty: difficulty })
  }
</script>

<div class="flex flew-row gap-4 justify-center mt-5">
  <!-- Restart button -->
  <button
    class="flex flex-row gap-1.5 items-center border border-yellow-400 shadow-sm shadow-slate-900
         text-yellow-900  bg-yellow-500 px-5 py-2 rounded-lg
         transition-all hover:shadow-lg hover:scale-105"
    on:click={newGame}>
    Restart
    <Controller />
  </button>

  <!-- Level selector -->
  <select
    class="p-2 rounded-lg bg-slate-700 text-slate-50 shadow-lg"
    bind:value={level}>
    {#each layouts as layout, i}
      <option value={i}>Level {i + 1}</option>
    {/each}
  </select>

  <!-- Difficulty selector -->
  <select
    class="p-2 rounded-lg bg-slate-700 text-slate-50 shadow-lg"
    bind:value={difficulty}>
    <option value="novice">Novice</option>
    <option value="adept">Adept</option>
    <option value="expert">Expert</option>
    <option value="legendary">Legendary</option>
  </select>
</div>

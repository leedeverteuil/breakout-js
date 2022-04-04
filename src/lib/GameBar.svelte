<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import type { Writable } from "svelte/store";
  import HeartFill from "svelte-bootstrap-icons/lib/HeartFill";
  import StarFill from "svelte-bootstrap-icons/lib/StarFill";
  import Mouse2Fill from "svelte-bootstrap-icons/lib/Mouse2Fill";

  const gameContext: any = getContext("game");
  const lives: Writable<number> = gameContext.lives;
  const points: Writable<number> = gameContext.points;
</script>

<div class="mb-2 flex flex-row justify-between items-center gap-2">
  <div class="flex flex-row gap-2">
    <p
      class="flex flex-row gap-2 items-center rounded-lg p-3 bg-red-600 text-gray-100"
      in:fly={{ y: -20 }}>
      <HeartFill />
      {#key $lives}
        <span in:fly={{ y: -20 }}>
          {$lives}
        </span>
      {/key}
    </p>

    <p
      class="flex flex-row gap-2 items-center rounded-lg p-3 bg-black text-gray-100">
      <StarFill />
      {#key $points}
        <span in:fly={{ y: -20 }}>
          {$points}
        </span>
      {/key}
    </p>
  </div>

  <div class="flex flex-row gap-6 items-center">
    <p class="key-label">
      <span class="key-icon"><Mouse2Fill /></span>
      Click to launch ball
    </p>
    <p class="key-label">
      <span class="key-icon">P</span>
      Pause
    </p>
  </div>
</div>

<style lang="postcss">
  .key-label {
    @apply flex flex-row gap-2 items-center rounded-lg text-gray-100;
  }

  .key-icon {
    @apply flex text-lg text-gray-400 font-mono;
  }
</style>

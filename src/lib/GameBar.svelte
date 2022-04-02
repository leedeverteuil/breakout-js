<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import type { Writable } from "svelte/store";
  import HeartFill from "svelte-bootstrap-icons/lib/HeartFill";
  import StarFill from "svelte-bootstrap-icons/lib/StarFill";

  const gameContext: any = getContext("game");
  const lives: Writable<number> = gameContext.lives;
  const points: Writable<number> = gameContext.points;
</script>

<div class="mb-2 flex flex-row justify-center items-center gap-2">
  <p
    class="flex flex-row gap-2 items-center rounded-lg p-3 bg-black text-gray-100"
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

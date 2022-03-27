<script lang="ts">
  import { Controller } from "svelte-bootstrap-icons/lib/Controller";
</script>

<div class="flex flew-row justify-center mt-5">
  <button
    class="flex flex-row gap-1.5 items-center border border-yellow-400 shadow-sm shadow-slate-900
         text-yellow-900  bg-yellow-500 px-5 py-2 rounded-lg
         transition-all hover:shadow-lg hover:scale-105"
    on:click>
    Play
    <Controller />
  </button>
</div>

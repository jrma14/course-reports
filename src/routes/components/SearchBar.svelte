<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let searchQuery = '';

    function runSearch() {
		dispatch('search', searchQuery);
    }

</script>

<div class="form-control m-3 w-full">
    <div class="input-group w-full">
      <input type="text" placeholder="Search…" class="input input-bordered w-full bg-white" bind:value={searchQuery} on:keyup={runSearch} />
      <button class="btn btn-square bg-white" on:click={runSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
</div>
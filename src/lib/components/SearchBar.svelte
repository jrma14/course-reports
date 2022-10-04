<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let searchQuery = '';

	function runSearch() {
		dispatch('search', searchQuery);
	}
</script>

<div class="form-control w-full drop-shadow-md">
	<div class="input-group">
		<input
			type="text"
			placeholder="Search…"
			class="bg-white w-full input input-bordered"
			bind:value={searchQuery}
			on:keyup={runSearch}
		/>
		<button class="bg-white btn btn-square" on:click={runSearch}>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
	</div>
</div>

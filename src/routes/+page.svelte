<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Filter from '$lib/components/filter.svelte';
</script>

<div class="w-full h-[calc(100vh-64px)] flex overflow-hidden">
	<Filter />
	<SearchBar on:search={(e) => console.log(e.detail)} />
</div>

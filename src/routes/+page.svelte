<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Filter from '$lib/components/filter.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	/** @type { import('./$types').PageData }*/
	export let data;
	const rows = Object.values(data);
</script>

<div class="w-full h-[calc(100vh-64px)] flex overflow-hidden">
	<Filter />
	<SearchBar on:search={(e) => console.log(e.detail)} />
	<VirtualList items={rows} let:item>
		<h1>{item.course_title}</h1>
	</VirtualList>
</div>

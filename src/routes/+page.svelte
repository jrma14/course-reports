<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Filter from '$lib/components/filter.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { term, subject, searchQuery, runSearch } from '$lib/stores/filter.js';
	import { data } from '$lib/stores/filterResult.js';
	import ClassCard from '../lib/components/ClassCard.svelte';

	/** @type { import('./$types').PageData }*/
	// export let data;
	// const rows = Object.values(data);

	// $: console.log('$data:', $data);

	// $: {
	// 	for (let i of $data) {
	// 		console.log(i.course_title);
	// 	}
	// }
</script>

<div class="w-full h-[calc(100vh-64px)] flex overflow-hidden">
	<Filter />
	<div class="flex flex-col gap-5 w-full p-5">
		<SearchBar
			on:search={(e) => {
				console.log(e.detail);
				searchQuery.set(e.detail);
				runSearch();
			}}
		/>
		<h1 class="font-bold">Dumb names thanks to Oscar!</h1>
		<div class="w-full h-[calc(100vh-64px)] bg-white p-5 rounded-2xl drop-shadow-md">
			<VirtualList items={$data} let:item>
				<ClassCard title={item.course_title} number={item.course_number} />
			</VirtualList>
		</div>
	</div>
</div>

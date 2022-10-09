<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Filter from '$lib/components/filter.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { term, subject, searchQuery, runSearch } from '$lib/stores/filter.js';
	import { data } from '$lib/stores/filterResult.js';
	import ClassCard from '../lib/components/ClassCard.svelte';
	import { onMount } from 'svelte';

	/** @type { import('./$types').PageData }*/
	runSearch();
</script>

<div class="w-full h-[calc(100vh-64px)] flex overflow-hidden">
	<Filter />
	<div class="flex flex-col gap-5 w-full p-5">
		<SearchBar
			on:search={(e) => {
				searchQuery.set(e.detail);
				runSearch();
			}}
		/>
		<div class="w-full h-[calc(100vh-64px-100px)] bg-white rounded-2xl drop-shadow-md">
			<div class="h-14 rounded-2xl flex font-bold text-xl pl-5 pt-1 pr-5">
				<div class="flex flex-grow">
					<h1 class="mr-10">Course Number</h1>
					<h1 class="">Course Title</h1>
				</div>
				<div class="flex w-[25%] justify-between h-full items-center">
					<h1>Average Rating</h1>
					<h1>Average Grade</h1>
					<h1>Hours/Week</h1>
				</div>
			</div>
			<VirtualList items={$data} let:item>
				<div class="h-24">
					<ClassCard title={item.course_title} number={item.course_number} />
				</div>
			</VirtualList>
		</div>
	</div>
</div>

<script>
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Filter from '$lib/components/filter.svelte';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { filters } from '$lib/stores/filter.js';
	import ClassCard from '../lib/components/ClassCard.svelte';
	import { PUBLIC_URL } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';

	let listStart;
	let listEnd;

	let courseData = [];
	let metadata = {
		offsets: {
			next: 20,
			current: 0,
			previous: 0
		}
	};

	const fetchData = async (filter, offset = 0) => {
		let res = await fetch(
			`${PUBLIC_URL}/api/query/?term=${filter.terms}&searchQuery=${
				filter.searchQuery
			}&subjects=${filter.subjects.join(',')}&offset=${offset}`
		);
		return await res.json();
	};

	$: if (metadata.offsets.next - listEnd <= 10) {
		console.log('fetching more');
		fetchData($filters, metadata.offsets.next).then((json) => {
			courseData = courseData.concat(json['courses']);
			metadata = json['__metadata'];
		});
	}

	const unsubscribe = filters.subscribe(async (filter) => {
		const json = await fetchData(filter);
		courseData = json['courses'];
		metadata = json['__metadata'];
	});

	onDestroy(unsubscribe);

	/** @type { import('./$types').PageData }*/
</script>

<div class="w-full h-[calc(100vh-64px)] flex overflow-hidden">
	<Filter />
	<div class="flex flex-col gap-5 w-full p-5">
		<SearchBar
			on:search={(e) => {
				$filters.searchQuery = e.detail;
				// searchQuery.set(e.detail);
				// runSearch();
			}}
		/>
		<p>{listStart}-{listEnd}</p>
		<div class="w-full h-[calc(100vh-64px-100px)] bg-white rounded-2xl drop-shadow-md">
			<div class="h-14 rounded-2xl flex font-bold text-xl pl-5 pt-3 pb-3 pr-5">
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
			{#if courseData.length}
				<VirtualList items={courseData} bind:start={listStart} bind:end={listEnd} let:item>
					<div class="h-24">
						<ClassCard title={item.course_title} number={item.course_number} />
					</div>
				</VirtualList>
			{/if}
		</div>
	</div>
</div>

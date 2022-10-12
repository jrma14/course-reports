<script>
	import Pill from './Pill.svelte';
	import { term, subject, searchQuery, runSearch } from '$lib/stores/filter.js';
	import { get } from 'svelte/store';

	export let subjectText;
	export let isOpen = false;
	export let pills;
	export let subjects;
	let selectedPills = [];
	// populate selectedPills with false values
	for (let i = 0; i < pills.length; i++) {
		selectedPills.push(false);
	}

	//function for updating termPills
	function updatePills(index, value) {
		selectedPills[index] = value;
		//create a string with the values of the selected pills separated by commas
		let subFilter = get(subject);
		for (let i = 0; i < selectedPills.length; i++) {
			let ind = subFilter.indexOf(subjects[i]);
			if (ind != -1) {
				subFilter.splice(ind, 1);
			}
			if (selectedPills[i]) {
				subFilter.push(subjects[i]);
			}
		}
		subject.set(subFilter);
		console.log(get(subject));
		// run the search
		runSearch();
	}

	$: dropdownClass = isOpen ? 'collapse-open' : 'collapse-close';
</script>

<div
	class="collapse collapse-arrow border border-base-100 bg-white rounded-[30px] m-5 {dropdownClass}"
>
	<div
		class="flex collapse-title text-xl font-medium items-center"
		on:click={() => {
			isOpen = !isOpen;
		}}
	>
		<input
			class="checkbox checkbox-sm mr-2 checkbox-primary"
			type="checkbox"
			on:click={(e) => {
				e.stopPropagation();
				for (let i = 0; i < pills.length; i++) {
					updatePills(i, e.target.checked);
				}
			}}
		/>
		{subjectText}
	</div>
	<div class="collapse-content">
		<div class="grid grid-cols-2 gap-4">
			{#each pills as pill, ix}
				<Pill
					text={pill}
					size=""
					checked={selectedPills[ix]}
					on:selected={(e) => updatePills(ix, e.detail)}
				/>
			{/each}
		</div>
	</div>
</div>

<script>
	import Pill from './Pill.svelte';
	import { term, subject, searchQuery, runSearch } from "$lib/stores/filter.js";


	export let subjectText;
	export let isOpen = false;
	export let pills;
	let selectedPills = [];
	// populate selectedPills with false values
	for (let i = 0; i < pills.length; i++) {
		selectedPills.push(false);
	}

	//function for updating termPills
	function updatePills(index, value) {
		selectedPills[index] = value;
		//create a string with the values of the selected pills separated by commas
		let pillString = "";
		for (let i = 0; i < selectedPills.length; i++) {
			if (selectedPills[i]) {
				pillString += pills[i] + ",";
			}
		}
		//remove the last comma if there is one
		if (pillString[pillString.length - 1] === ",") {
			pillString = pillString.slice(0, -1);
		}
		// console.log(pillString);
		// update the store
		subject.set(pillString);

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
			}
			}
		/>
		{subjectText}
	</div>
	<div class="collapse-content">
		<div class="grid grid-cols-2 gap-4">
			{#each pills as pill, ix}
				<Pill text={pill} size="" checked={selectedPills[ix]} on:selected={e => updatePills(ix, e.detail)} />
			{/each}
		</div>
	</div>
</div>

<script>
	import Pill from './Pill.svelte';

	export let subject;
	export let isOpen = false;
	export let pills;
	let selectedPills = [];
	// populate selectedPills with false values
	for (let i = 0; i < pills.length; i++) {
		selectedPills.push(false);
	}

	//function for updating termPills
	function updateTermPills(index, value) {
		selectedPills[index] = value;
		console.log(selectedPills);
		// termPills = [...termPills];
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
		{subject}
	</div>
	<div class="collapse-content">
		<div class="grid grid-cols-2 gap-4">
			{#each pills as pill, ix}
				<Pill text={pill} size="" checked={selectedPills[ix]} on:selected={e => updateTermPills(ix, e.detail)} />
			{/each}
		</div>
	</div>
</div>

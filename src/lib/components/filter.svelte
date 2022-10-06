<script>
	import Help from './helpoutline.svelte';
	import DropDown from './SubjectDropdown.svelte';
	import Pill from './Pill.svelte';
	import { term, subject, searchQuery, runSearch } from '$lib/stores/filter.js';

	let termPills = [false, false, false, false];

	//function for updating termPills
	function updateTermPills(index, value) {
		termPills[index] = value;
		// console.log(termPills);
		//turn termPills into a string with the values of the selected pills separated by commas
		let termString = '';
		// index gets mapped to letter
		let indexToLetter = {
			0: 'A',
			1: 'B',
			2: 'C',
			3: 'D'
		};
		for (let i = 0; i < termPills.length; i++) {
			if (termPills[i]) {
				termString += indexToLetter[i] + ',';
			}
		}
		//remove the last comma if there is one
		if (termString[termString.length - 1] === ',') {
			termString = termString.slice(0, -1);
		}
		term.set(termString);
		runSearch();
		// termPills = [...termPills];
	}

	let helpVisible = false;
	let showAllListings = true;
	let selectedClass = 'bg-primary text-white bg-base-100';
</script>

<div
	class="min-w-1/3 w-1/3 h-full bg-white select-none drop-shadow-md overflow-y-scroll overflow-x-clip"
>
	<div class="text-3xl font-semibold ml-5 mt-3">Term</div>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
	<div class="flex w-full justify-center">
		<Pill text="A Term" size="sm" on:selected={(e) => updateTermPills(0, e.detail)} />
		<Pill text="B Term" size="sm" on:selected={(e) => updateTermPills(1, e.detail)} />
		<Pill text="C Term" size="sm" on:selected={(e) => updateTermPills(2, e.detail)} />
		<Pill text="D Term" size="sm" on:selected={(e) => updateTermPills(3, e.detail)} />
	</div>
	<div class="text-3xl font-semibold ml-5 mt-5">Subject</div>
	<DropDown subjectText="Science" pills={['Physics']} subjects={['PH']} />
	<DropDown
		subjectText="Engineering"
		pills={[
			'Aerospace',
			'Architectural',
			'Biomedical',
			'Civil',
			'Chemical',
			'Electrical',
			'Computer',
			'Engineering Science',
			'Fire Protection',
			'Mechanical',
			'Manufacturing',
			'Materials Science',
			'Nuclear Science',
			'Industrial',
			'Robotics',
			'Systems'
		]}
		subjects={[
			'AE',
			'AREN',
			'BME',
			'CE',
			'CH',
			'ECE',
			'ECE',
			'FP',
			'ME',
			'MFE',
			'MTE',
			'NSE',
			'OIE',
			'RBE',
			'SYS'
		]}
	/>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
	<div class="text-3xl font-semibold ml-5 mt-5 flex w-full">
		Listings
		<div class="ml-auto mr-10 self-end h-6" on:click={() => (helpVisible = !helpVisible)}>
			<Help />
		</div>
	</div>
	<p class="text-xs font-normal ml-5 mt-1 {helpVisible ? 'visible' : 'hidden'}">
		Current listings are just the courses that are available this year, so any cat II courses that
		do not occur this year will not be shown
	</p>
	<div class="flex mt-5">
		<div
			class="{showAllListings
				? ''
				: selectedClass} w-32 flex justify-center items-center rounded-full mr-auto ml-auto"
		>
			Current Listings
		</div>
		<input
			type="checkbox"
			class="toggle"
			on:click={() => {
				showAllListings = !showAllListings;
			}}
			checked
		/>
		<div
			class="{showAllListings
				? selectedClass
				: ''} w-32 flex justify-center items-center rounded-full mr-auto ml-auto"
		>
			All Listings
		</div>
	</div>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
</div>

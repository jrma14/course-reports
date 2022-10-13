<script>
	import Help from './helpoutline.svelte';
	import DropDown from './SubjectDropdown.svelte';
	import Pill from './Pill.svelte';
	import { filters } from '$lib/stores/filter.js';

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

		$filters.terms = termString;
		// term.set(termString);
		console.log('setting classes');
		// runSearch();
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
	<DropDown
		subjectText="Science"
		pills={[
			'Biology',
			'Bioinformatics & Computational Biology',
			'Chemistry',
			'Computer Science',
			'Data Science',
			'Geology',
			'Interactive Media & Game Development',
			'Mathematical Sciences',
			'Mathematics for Educators',
			'Masters for Physics Educators',
			'Neuroscience',
			'Physics'
		]}
		subjects={['BB', 'BCB', 'CH', 'CS', 'DS', 'GE', 'IMGD', 'MA', 'MME', 'MPE', 'NEU', 'PH']}
	/>
	<DropDown
		subjectText="Engineering"
		pills={[
			'Aerospace Engineering',
			'Architectural Engineering',
			'Biomedical Engineering',
			'Civil Engineering',
			'Chemical Engineering',
			'Electrical & Computer Engineering',
			'Engineering Science',
			'Fire Protection',
			'Mechanical Engineering',
			'Manufacturing Engineering',
			'Materials Science & Engineering',
			'Nuclear Science & Engineering',
			'Operations & Industrial Engineering',
			'Robotics Engineering',
			'Systems Engineering'
		]}
		subjects={[
			'AE',
			'AREN',
			'BME',
			'CE',
			'CHE',
			'ECE',
			'ECE',
			'ES',
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
	<DropDown
		subjectText="Languages"
		pills={[
			'Arabic',
			'Chinese',
			'English as a Second Language',
			'German',
			'English for International Students',
			'Spanish'
		]}
		subjects={['AB', 'CN', '', 'GN', 'ISE', 'SP']}
	/>
	<DropDown
		subjectText="Humanities"
		pills={[
			'Art',
			'English',
			'History',
			'Humanities',
			'International & Global Studies',
			'Music',
			'Philosophy',
			'Religion',
			'Theatre',
			'Writing'
		]}
		subjects={['AR', 'EN', 'HI', 'HU', 'INTL', 'MU', 'PY', 'RE', 'TH', 'WR']}
	/>
	<DropDown
		subjectText="Social Science"
		pills={[
			'Development',
			'Economics',
			'Environmental Studies',
			'Government, Political Science, and Law',
			'Psychology',
			'System Dynamics',
			'Sociology',
			'Social Science',
			'Society-Technology Studies'
		]}
		subjects={['DEV', 'ECON', 'ENV', 'GOV', 'PSY', 'SD', 'SOC', 'SS', 'STS']}
	/>
	<DropDown
		subjectText="Business"
		pills={[
			'Business',
			'Entrepreneurship',
			'Finance',
			'Management Information Systems',
			'Marketing',
			'Organizational Behavior & Change'
		]}
		subjects={['BUS', 'ETR', 'FIN', 'MIS', 'MKT', 'OBC']}
	/>
	<DropDown
		subjectText="Other"
		pills={[
			'Air Science',
			'Co-op',
			'First Year',
			'Interdisciplinary',
			'Intergrative & Global Studies',
			'Military Leadership',
			'Other',
			'Project Center',
			'Physical Education',
			'STEM for Educators'
		]}
		subjects={['AS', 'CP', 'FY', 'ID', 'IGS', 'ML', 'OT', 'PC', 'PE', 'SEME']}
	/>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
	<!-- <div class="text-3xl font-semibold ml-5 mt-5 flex w-full">
		Listings
		<div class="ml-auto mr-10 self-end h-6" on:click={() => (helpVisible = !helpVisible)}>
			<Help />
		</div>
	</div>
	<p class="text-xs font-normal ml-5 mr-10 mt-1 {helpVisible ? 'visible' : 'hidden'}">
		Current listings are just the courses that are available this year, so any cat II courses that
		do not occur this year will not be shown
	</p> -->
	<!-- <div class="flex mt-5">
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
	</div> -->
	<!-- <hr class="mb-5 mr-5 ml-5 mt-1" /> -->
</div>

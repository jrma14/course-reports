<script>
	import Help from './helpoutline.svelte';
	import DropDown from './SubjectDropdown.svelte';
	import Pill from './Pill.svelte';

	let pills = [false, false, false, false];

	function clickedPill(ind) {
		pills[ind] = !pills[ind];
		if (pills[ind]) {
			document.getElementsByClassName('pill')[ind].classList.remove('bg-base-100');
			document.getElementsByClassName('pill')[ind].classList.add('bg-primary');
			document.getElementsByClassName('pill')[ind].classList.add('text-white');
		} else {
			document.getElementsByClassName('pill')[ind].classList.remove('bg-primary');
			document.getElementsByClassName('pill')[ind].classList.remove('text-white');
			document.getElementsByClassName('pill')[ind].classList.add('bg-base-100');
		}
	}
</script>

<div class="min-w-[384px] w-96 h-full bg-white select-none drop-shadow-md overflow-y-scroll overflow-x-clip">
	<div class="text-3xl font-semibold ml-5 mt-3">Term</div>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
	<div class="flex w-full justify-center">
		<Pill text="A Term" size="sm" />
		<Pill text="B Term" size="sm" />
		<Pill text="C Term" size="sm" />
		<Pill text="D Term" size="sm" />
	</div>
	<div class="text-3xl font-semibold ml-5 mt-5">Subject</div>
	<DropDown subject="Science" pills={['Physics']} />
	<DropDown
		subject="Engineering"
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
	/>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
	<div class="text-3xl font-semibold ml-5 mt-5 flex w-full">
		Listings
		<div class="tooltip ml-auto mr-10 self-end h-6" data-tip="Current listings are just the courses that are available this year, so any cat II courses that do not occur this year will not be shown">
			<Help />
		</div>
	</div>
	<div class="flex mt-5">
		<div
			class="currentListings w-32 flex justify-center items-center rounded-full bg-base-100 mr-auto ml-auto"
		>
			Current Listings
		</div>
		<input type="checkbox" class="toggle" on:click={(e) => {
			if(e.srcElement.checked){
				document.getElementsByClassName('allListings')[0].classList.remove('bg-base-100');
				document.getElementsByClassName('allListings')[0].classList.add('bg-primary');
				document.getElementsByClassName('allListings')[0].classList.add('text-white');
				document.getElementsByClassName('currentListings')[0].classList.remove('bg-primary');
				document.getElementsByClassName('currentListings')[0].classList.remove('text-white');
				document.getElementsByClassName('currentListings')[0].classList.add('bg-base-100');
			} else {
				document.getElementsByClassName('allListings')[0].classList.remove('bg-primary');
				document.getElementsByClassName('allListings')[0].classList.remove('text-white');
				document.getElementsByClassName('allListings')[0].classList.add('bg-base-100');
				document.getElementsByClassName('currentListings')[0].classList.remove('bg-base-100');
				document.getElementsByClassName('currentListings')[0].classList.add('bg-primary');
				document.getElementsByClassName('currentListings')[0].classList.add('text-white');
			}
		}} checked />
		<div
			class="allListings w-32 flex justify-center items-center rounded-full bg-primary text-white mr-auto ml-auto"
		>
			All Listings
		</div>
	</div>
	<hr class="mb-5 mr-5 ml-5 mt-1" />
</div>

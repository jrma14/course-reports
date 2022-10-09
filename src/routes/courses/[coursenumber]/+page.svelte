<script>
	import OverallHeader from './components/OverallHeader.svelte';
	export let data;
</script>

<div class="flex flex-col h-full font-bold text-3xl w-full">
	<OverallHeader title={'Webware'} number={data.courseNumber} />
	<div id="stats" class="w-full h-[60%] flex flex-row">
		<div id="left-holder" class="w-[38%] m-3 bg-blue-400 h-full flex flex-col">
			<!-- Rating Box -->
			<div class="rounded-md h-full bg-green-400 text-center m-3">Ratings</div>
			<div id="rev-prof-holder" class="w-full h-[40%] flex flex-row mb-3">
				<!-- num reviews -->
				<div class="rounded-md w-[50%] bg-purple-400 text-center ml-3">Rev#</div>
				<!-- num professors -->
				<div class="rounded-md w-[50%] bg-cyan-400 text-center ml-3 mr-3">Prof#</div>
			</div>
		</div>
		<!-- Expected grade / hrs per week section -->
		<div class="w-[62%] m-3 rounded-sm h-full bg-red-400 text-center">
			Grade / Hours
			<div class="rounded-md m-3 bg-blue-500">Chart</div>
		</div>
	</div>
</div>

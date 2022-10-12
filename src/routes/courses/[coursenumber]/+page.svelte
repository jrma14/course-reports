<script>
	import OverallHeader from './components/OverallHeader.svelte';
	import { onMount } from 'svelte';

	import * as d3 from 'd3';
	export let data;
	const courseData = Object.values(data);
	var exData = [30, 86, 168, 281, 303, 365];

	let el;
	// console.log(courseData);
	// replace course number - with space

	onMount(() => {
		d3.select(el)
			.selectAll('div')
			.data(exData)
			.enter()
			.append('div')
			.style('width', function (d) {
				return d + 'px';
			})
			.text(function (d) {
				return d;
			});
	});

	let avgRating = 0;
	let ratingSum = 0;
	let ratingCount = 0;
	let profAvgs = {};
	// make a list of profs and their average ratings
	// list form is [ profName: { avgRating: 4.5, numRatings: 10 } ]
	for (let i = 0; i < courseData.length; i++) {
		// console.log(courseData[i]);
		if (
			courseData[i]['course_report_data']['overallRatings']['overallQuality']['average'] != null
		) {
			ratingSum += parseInt(
				courseData[i]['course_report_data']['overallRatings']['overallQuality']['average']
			);
			ratingCount++;
		}

		// if prof is not in list, add them using their name as the key
		let profName = courseData[i]['last_name'] + ' ' + courseData[i]['first_name'];
		if (profAvgs[profName] == null) {
			profAvgs[profName] = {
				avgRating: 0,
				numRatings: 0,
				numStudents: 0
			};
		}

		profAvgs[profName]['avgRating'] += parseInt(
			courseData[i]['course_report_data']['overallRatings']['overallQuality']['average']
		);
		profAvgs[profName]['numRatings']++;
		profAvgs[profName]['numStudents'] += parseInt(
			courseData[i]['course_report_data']['overallRatings']['overallQuality']['surveySize']
		);
	}

	console.log(profAvgs);
	avgRating = ratingSum / ratingCount;
	//round to 2 decimal places
	avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100;
</script>

<div class="flex flex-col h-full font-bold text-3xl w-full">
	<OverallHeader title={courseData[0].course_title} number={courseData[0].course_number} />
	<div id="stats" class="w-full h-[60%] flex flex-row">
		<div id="left-holder" class="w-[38%] m-3 bg-blue-400 h-full flex flex-col">
			<!-- Rating Box -->
			<div class="rounded-md h-full bg-green-400 text-center m-3">
				<div
					id="rating-box"
					class="flex flex-row w-full h-[30%] bg-white rounded-2xl drop-shadow-md"
				>
					<div class="flex flex-col w-full h-full justify-center items-center">
						<h1 class="text-xl">Average Rating</h1>
						<h1 class="text-4xl">{avgRating}/5</h1>
					</div>
				</div>
				<div bind:this={el} class="chart" />
			</div>
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

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>

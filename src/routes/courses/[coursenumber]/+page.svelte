<script>
	import OverallHeader from './components/OverallHeader.svelte';
	import { onMount } from 'svelte';
	import { Scatter } from 'svelte-chartjs';
	import * as d3 from 'd3';

	import Logo from '../../../lib/components/logo.svelte';
	export let data;
	const courseData = Object.values(data);

	let el;
	// replace course number - with space

	let avgRating = 0;
	let ratingSum = 0;
	let ratingCount = 0;
	let profAvgs = {};
	// make a list of profs and their average ratings
	// list form is [ profName: { avgRating: 4.5, numRatings: 10 } ]
	for (let i = 0; i < courseData.length; i++) {
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

	let profGradeVsHrs = {};
	for (let course of courseData) {
		if (profGradeVsHrs[course.first_name + ' ' + course.last_name]) {
			let newN = profGradeVsHrs[course.first_name + ' ' + course.last_name][2] + 1;
			let newExpectedGrade =
				(parseFloat(course.course_report_data.misc.expectedGrade.average) +
					profGradeVsHrs[course.first_name + ' ' + course.last_name][0]) /
				newN;
			let newOutsideClassTime =
				(parseFloat(course.course_report_data.misc.outsideClassTime.average) +
					profGradeVsHrs[course.first_name + ' ' + course.last_name][1]) /
				newN;
			profGradeVsHrs[course.first_name + ' ' + course.last_name] = [
				newExpectedGrade,
				newOutsideClassTime,
				newN
			];
		} else {
			profGradeVsHrs[course.first_name + ' ' + course.last_name] = [
				parseFloat(course.course_report_data.misc.expectedGrade.average),
				parseFloat(course.course_report_data.misc.outsideClassTime.average),
				1
			];
		}
	}

	let dataset1 = [];
	for (let prof of Object.keys(profGradeVsHrs)) {
		let temp = profGradeVsHrs[prof].slice(0, 2);
		temp.push(prof);
		dataset1.push(temp);
	}

	//update profAvgs to have the average rating
	for (let prof in profAvgs) {
		profAvgs[prof]['avgRating'] /= profAvgs[prof]['numRatings'];
		profAvgs[prof]['avgRating'] =
			Math.round((profAvgs[prof]['avgRating'] + Number.EPSILON) * 100) / 100;
	}
	// console.log(profAvgs);

	let profs = Object.keys(profAvgs);
	profs.sort((a, b) => {
		return -1 * (profAvgs[b]['avgRating'] - profAvgs[a]['avgRating']);
	});
	//make a map of profs to a color
	let profColors = {};
	let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
	for (let i = 0; i < profs.length; i++) {
		profColors[profs[i]] = colorScale(i);
	}
</script>

<div class="flex flex-col h-full font-bold text-3xl w-full">
	<OverallHeader title={courseData[0].course_title} number={courseData[0].course_number} />
	<div id="stats" class="w-full h-[90%] flex flex-row">
		<div id="left-holder" class="w-[38%] m-3 bg-blue-400 h-full flex flex-col">
			<!-- Rating Box -->
			<div class="rounded-md h-full bg-green-400 text-center m-3">
				<div
					id="rating-box"
					class="flex flex-row w-full h-[30%] bg-white rounded-2xl drop-shadow-md"
				>
					<div class="flex flex-col w-full h-full justify-center items-center">
						<h1 class="text-xl">Average Rating</h1>
						<h1 class="text-4xl">
							{avgRating}<span class="text-xl font-normal">/5</span>
						</h1>
					</div>
				</div>

				<div class="h-[70%] bg-white flex flex-col justify-center">
					<div bind:this={el} class="chart" />
				</div>
			</div>
			<div id="rev-prof-holder" class="w-full h-[40%] flex flex-row mb-3">
				<!-- num reviews -->
				<div class="rounded-md w-[50%] bg-purple-400 text-center ml-3">Rev#</div>
				<!-- num professors -->
				<div class="rounded-md w-[50%] bg-cyan-400 text-center ml-3 mr-3">Prof#</div>
			</div>
		</div>
		<!-- Expected grade / hrs per week section -->
		<div class="w-[62%] m-3 h-full bg-white rounded-2xl text-center">
			Grade / Hours
			<Scatter {dataset1} options={{ responsive: true }} />
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

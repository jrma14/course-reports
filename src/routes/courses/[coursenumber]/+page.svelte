<script>
	import OverallHeader from './components/OverallHeader.svelte';
	import { onMount } from 'svelte';
	import { Scatter } from 'svelte-chartjs';
	import Chart from './components/Chart.svelte';
	import * as d3 from 'd3';

	import Logo from '../../../lib/components/logo.svelte';
	export let data;
	const courseData = Object.values(data);

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
		let profName = courseData[i]['last_name'] + ', ' + courseData[i]['first_name'];
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

	let barChartData = {
		labels: [],
		datasets: [
			{
				label: 'Average',
				data: [],
				backgroundColor: [],
				borderWidth: 2,
				borderColor: [],
				borderRadius: 5
			}
		]
	};

	for (let prof in profs) {
		barChartData.labels.push(profs[prof]);
		barChartData.datasets[0].data.push(profAvgs[profs[prof]]['avgRating']);
		barChartData.datasets[0].backgroundColor.push(profColors[profs[prof]]);
		barChartData.datasets[0].borderColor.push(profColors[profs[prof]]);
	}

	let numReviewsData = [];
	for (let prof in profs) {
		numReviewsData.push(profAvgs[profs[prof]]['numStudents']);
	}

	let totalStudents = 0;
	for (let prof in profs) {
		totalStudents += profAvgs[profs[prof]]['numStudents'];
	}
</script>

<div class="flex flex-col h-[100vw - 64px] font-bold text-3xl w-full">
	<OverallHeader title={courseData[0].course_title} number={courseData[0].course_number} />
	<div id="stats" class="w-full h-[70%] flex flex-row">
		<div id="left-holder" class="w-[38%] h-full flex flex-col m-3">
			<!-- Rating Box -->
			<div class="rounded-md h-[70%] text-center mb-3">
				<div
					id="rating-box"
					class="flex flex-col w-full h-full bg-white rounded-2xl drop-shadow-md"
				>
					<div class="flex flex-col w-full h-full justify-center items-center">
						<h1 class="text-xl font-light text-gray-500">Average Rating</h1>
						<h1 class="text-7xl">
							{avgRating}<span class="text-xl font-normal">/5</span>
						</h1>
					</div>
					<Chart data={barChartData} {numReviewsData} />
				</div>
			</div>
			<div id="rev-prof-holder" class="w-full h-[30%] flex flex-row">
				<!-- num reviews -->
				<div
					class="rounded-md w-[50%] h-full bg-white text-center text-7xl drop-shadow-md flex flex-col justify-center"
				>
					<div>
						{totalStudents}
					</div>
					<div class="text-xl m-3 font-light text-gray-500">Respondents</div>
				</div>
				<!-- num professors -->
				<div
					class="rounded-md w-[50%] ml-3 h-full bg-white text-center drop-shadow-md flex flex-col justify-center"
				>
					<div class="text-7xl">
						{profs.length}
					</div>
					<div class="text-xl m-3 font-light text-gray-500">Professors</div>
				</div>
			</div>
		</div>
		<!-- Expected grade / hrs per week section -->
		<div class="w-[62%] h-full bg-white rounded-2xl text-center mr-3 mt-3">
			Grade / Hours
			<Scatter {dataset1} options={{ responsive: true }} />
		</div>
	</div>
</div>

<script>
	import OverallHeader from './components/OverallHeader.svelte';
	import { onMount } from 'svelte';
	import { Scatter } from 'svelte-chartjs';
	import Chart from './components/Chart.svelte';
	import * as d3 from 'd3';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

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

	avgRating = ratingSum / ratingCount;
	//round to 2 decimal places
	avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100;

	let profData = {};
	for (let course of courseData) {
		if (profData[course.first_name + ' ' + course.last_name]) {
			let curr = profData[course.first_name + ' ' + course.last_name];
			let newN = curr.responses + 1;
			let newExpectedGrade = (calcGrade(course) + curr.expectedGrade * curr.responses) / newN;
			let newOutsideClassTime = (calcHrs(course) + curr.hrsWk * curr.responses) / newN;
			curr.expectedGrade = newExpectedGrade;
			curr.hrsWk = newOutsideClassTime;
			curr.responses = newN;
		} else {
			profData[course.last_name + ', ' + course.first_name] = {
				name: course.last_name + ', ' + course.first_name,
				expectedGrade: calcGrade(course),
				hrsWk: calcHrs(course),
				responses: 1
			};
		}
	}

	function calcGrade(course) {
		let sum = 0;
		sum += parseInt(course.course_report_data.misc.expectedGrade.scoreBreakdown.oneStar) * 95;
		sum += parseInt(course.course_report_data.misc.expectedGrade.scoreBreakdown.twoStar) * 85;
		sum += parseInt(course.course_report_data.misc.expectedGrade.scoreBreakdown.threeStar) * 75;
		sum += parseInt(course.course_report_data.misc.expectedGrade.scoreBreakdown.fourStar) * 60;
		return (
			sum /
			(course.course_report_data.misc.expectedGrade.surveySize -
				parseInt(course.course_report_data.misc.expectedGrade.scoreBreakdown.fiveStar))
		);
	}

	function calcHrs(course) {
		let sum = 0;
		sum +=
			parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.elevenToFifteen) * 13;
		sum += parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.oneToFive) * 3;
		sum += parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.sixToTen) * 8;
		sum +=
			parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.sixteenToTwenty) * 18;
		sum +=
			parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.twentyOnePlus) * 22;
		sum += parseInt(course.course_report_data.misc.outsideClassTime.hourBreakdown.zero) * 0;
		return sum / course.course_report_data.misc.outsideClassTime.surveySize;
	}

	let scatterData = {
		labels: [],
		datasets: [
			{
				borderColor: [],
				backgroundColor: [],
				data: [],
				pointRadius: 8,
				pointHoverRadius: 10
			}
		]
	};

	const options = {
		scales: {
			x: {
				title: {
					display: true,
					text: 'Hours/Week'
				},
				type: 'linear',
				reverse: true,
				position: 'bottom'
			},
			y: {
				title: {
					display: true,
					text: 'Expected Grade'
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, ticks) {
						return value + '%';
					}
				},
				min: 60,
				max: 100
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: true,
				mode: 'index',
				intersect: false,
				callbacks: {
					label: function (context) {
						let label = Object.values(profData)[context.dataIndex].name;
						return label;
					}
				}
			}
		}
	};

	//update profAvgs to have the average rating
	for (let prof in profAvgs) {
		profAvgs[prof]['avgRating'] /= profAvgs[prof]['numRatings'];
		profAvgs[prof]['avgRating'] =
			Math.round((profAvgs[prof]['avgRating'] + Number.EPSILON) * 100) / 100;
	}

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

	for (let prof of Object.keys(profData)) {
		scatterData.datasets[0].data.push({ x: profData[prof].hrsWk, y: profData[prof].expectedGrade });
		scatterData.datasets[0].backgroundColor.push(profColors[prof]);
		scatterData.datasets[0].borderColor.push(profColors[prof]);
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
		<div class="w-[62%] m-3 h-full bg-white rounded-2xl text-center p-5">
			<div class="flex mb-5">
				<div class="w-1/2">
					<p class="font-normal">Expected Grade</p>
					<h1>{data[0].overall_average_grade}</h1>
				</div>
				<div class="w-1/2">
					<p class="font-normal">Hours/Week</p>
					<h1>{data[0].overall_average_work}</h1>
				</div>
			</div>
			Grade Vs Hours
			<Scatter data={scatterData} {options} />
		</div>
	</div>
</div>

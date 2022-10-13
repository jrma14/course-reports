<script>
	import OverallHeader from '$lib/components/OverallHeader.svelte';
	import { onMount } from 'svelte';

	import * as d3 from 'd3';
	import { scaleLinear } from 'd3-scale';

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
	// console.log('dataset', dataset1);

	const margin = { top: 10, right: 30, bottom: 30, left: 60 },
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	// console.log(profGradeVsHrs);
	onMount(() => {
		const svg = d3
			.select('#my_dataviz')
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.style('display', 'flex')
			// .style('margin-left', '100px')
			.append('g')
			.attr('x', '50%')
			.attr('y', '50%')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleLinear().domain([0, 5]).range([0, width]);
		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		// Add Y axis
		const y = d3.scaleLinear().domain([0, 5]).range([height, 0]);
		svg.append('g').call(d3.axisLeft(y));

		// Add dots
		svg
			.append('g')
			.selectAll('dot')
			.data(dataset1)
			.join('circle')
			.attr('cx', function (d) {
				return x(d[1]);
			})
			.attr('cy', function (d) {
				return y(d[0]);
			})
			.attr('r', 5)
			.attr('class', 'scatterdot')
			.style('fill', '#69b3a2');

		// console.log(dataset1);
		console.log(svg.selectAll('.scatterdot'));
		svg
			.append('g')
			.selectAll('circle')
			.data(dataset1)
			.join('text')
			.text((d) => {
				console.log(d);
				return d[2];
			})
			.attr('x', function (d) {
				return x(d[1]);
			})
			.attr('y', function (d) {
				return y(d[0]);
			})
			.style('font-size', '20px')
			.style('text-color', 'black');

		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('transform', 'rotate(-90)')
			.attr('y', -margin.left + 20)
			.attr('x', -margin.top)
			.text('Expected Grade');

		svg
			.append('text')
			.attr('text-anchor', 'end')
			.attr('x', width)
			.attr('y', height + margin.top + 20)
			.text('Hours/Week');
	});

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

	onMount(() => {
		const xTicks = [0, 1, 2, 3, 4, 5];
		const yTicks = profs;
		const padding = { top: 20, right: 15, bottom: 20, left: 25 };
		let width = el.parentElement.clientWidth;
		let height = el.parentElement.clientHeight;
		// get bounding box height
		let elParent = el.parentElement;
		let parentHeight = elParent.getBoundingClientRect().height;
		console.log(parentHeight);
		//calculate margin
		//min margin is 10px
		//estimate margin to be 10px
		let totalMargin = 5 * profs.length;
		let barHeight = Math.floor(parentHeight - totalMargin) / profs.length;

		let margin = 5;
		//recalculate bar height to account for margin

		d3.select(el)
			.selectAll('div')
			.data(profs)
			.enter()
			.append('div')
			.attr('class', 'bar')
			.style('width', (d) => {
				//calc width based on avg rating and parent width
				return (profAvgs[d]['avgRating'] / 5) * el.getBoundingClientRect().width + 'px';
			})
			.style('height', (d) => {
				//calc height based on number of professors and parent height
				return barHeight + 'px';
			})
			.style('max-height', (d) => {
				//calc height based on number of professors and parent height
				return '70px';
			})
			.style('background-color', (d) => {
				return profColors[d];
			})
			.style('border-radius', '0px 10px 10px 0px')
			.style('margin-bottom', (d) => {
				//if last element, no margin
				if (d == profs[profs.length - 1]) {
					return '0px';
				}
				return margin + 'px';
			})
			.text((d) => {
				return d;
			})
			.style('min', 'white')
			//left align text
			.style('text-align', 'left')
			.style('color', 'white')
			// add black stroke to the text
			.style('text-shadow', '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black')
			// center the text vertically
			.style('display', 'flex')
			.style('align-items', 'center')
			.style('font-size', (d) => {
				return '15px';
			});
	});
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
			<div class="w-full h-full flex justify-center items-center" id="my_dataviz" />
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

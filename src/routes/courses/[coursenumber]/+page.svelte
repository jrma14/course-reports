<script>
	import OverallHeader from './components/OverallHeader.svelte';
	import { onMount } from 'svelte';

	import * as d3 from 'd3';
	import { scaleLinear } from 'd3-scale';

	export let data;
	const courseData = Object.values(data);

	let el;
	// console.log(courseData);
	// replace course number - with space

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

	avgRating = ratingSum / ratingCount;
	//round to 2 decimal places
	avgRating = Math.round((avgRating + Number.EPSILON) * 100) / 100;

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
		let totalMargin = 10 * profs.length;
		let barHeight = Math.floor(parentHeight - totalMargin) / profs.length;

		let margin = 10;
		//recalculate bar height to account for margin

		// // create scale functions
		// var xScale = d3.scaleLinear().domain([0, 5]).range([0, 500]);

		// var yScale = d3.scaleLinear().domain([0, profs.length]).range([0, parentHeight]);
		// //create SVG element
		// var svg = d3.select(el).append('svg').attr('width', 600).attr('height', parentHeight);

		// //define X axis
		// var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5);

		// //define Y axis
		// var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(5);

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
				return '30px';
			})
			.style('background-color', (d) => {
				return profColors[d];
			})
			.style('margin-bottom', (d) => {
				return margin + 'px';
			})
			.text((d) => {
				return d + ' - ' + profAvgs[d]['avgRating'] + '/5 (n=' + profAvgs[d]['numStudents'] + ')';
			})
			.style('min', 'white')
			//left align text
			.style('text-align', 'left')
			//
			.style('font-size', (d) => {
				return '15px';
			});
	});
</script>

<div class="flex flex-col h-full font-bold text-3xl w-full">
	<OverallHeader title={courseData[0].course_title} number={courseData[0].course_number} />
	<div id="stats" class="w-full h-[70%] flex flex-row">
		<div id="left-holder" class="w-[38%] m-3 bg-blue-400 h-full flex flex-col">
			<!-- Rating Box -->
			<div class="rounded-md h-full bg-green-400 text-center m-3">
				<div
					id="rating-box"
					class="flex flex-row w-full h-[30%] bg-white rounded-2xl drop-shadow-md"
				>
					<div class="flex flex-col w-full h-full justify-center items-center">
						<h1 class="text-xl">Average Rating</h1>
						<h1 class="text-4xl">{avgRating}<span class="text-base font-normal">/5</span></h1>
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

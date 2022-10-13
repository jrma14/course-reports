<script>
	import { Bar } from 'svelte-chartjs';
	export let data;
	export let numReviewsData;

	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		layouts
	} from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<!-- set yAxis Max to 5  -->
<Bar
	{data}
	options={{
		responsive: true,
		layout: {
			padding: {
				left: 10,
				right: 10,
				top: 0,
				bottom: 0
			}
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Average Rating by Professor'
			},
			tooltip: {
				enabled: true,
				mode: 'index',
				intersect: false,
				callbacks: {
					label: function (context) {
						return (
							' ' +
							context.parsed.y +
							'/5 out of ' +
							numReviewsData[context.dataIndex] +
							' respondents'
						);
					}
				}
			}
		},
		scales: {
			y: {
				min: 0,
				max: 5,
				ticks: {
					stepSize: 1
				}
			}
		}
	}}
/>

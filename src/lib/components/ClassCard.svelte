<script>
	export let course;

	const getRatingColor = (rating) => {
		if (rating >= 4.7) {
			return 'bg-success';
		} else if (rating >= 4 && rating < 4.7) {
			return 'bg-warning';
		} else {
			return 'bg-error';
		}
	};

	const getGradeColor = (grade) => {
		if (grade >= 90) {
			return 'bg-success';
		} else if (grade >= 80 && grade < 90) {
			return 'bg-warning';
		} else {
			return 'bg-error';
		}
	};

	const getWorkColor = (work) => {
		if (work <= 8) {
			return 'bg-success';
		} else if (work > 8 && work < 16) {
			return 'bg-warning';
		} else {
			return 'bg-error';
		}
	};
</script>

<a
	class="h-full flex flex-col items-center"
	href={`/courses/${(course['course_number'] ?? '').replaceAll(' ', '-')}`}
>
	<div class="hover:bg-blue-50 rounded-lg p-5 flex w-full h-full items-center mb-auto mt-auto">
		<div class="flex flex-grow w-3/4">
			<h1 class="font-bold underline text-3xl mr-10">
				{course['course_number']}
			</h1>
			<h1 class="font-normal ml-10 text-3xl mr-5">
				{course['course_title'].replaceAll('-', ' ').trim()}
			</h1>
		</div>
		<!-- <div class="flex w-1/4 justify-between h-full items-center"> -->
		<div class="w-1/4 grid grid-cols-3 items-center content-center justify-items-center">
			<div
				class="p-5 w-20 h-1/2 {getRatingColor(
					course['overall_average_rating']
				)} rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				{Math.round(course['overall_average_rating'] * 10) / 10}
			</div>
			<div
				class="p-5 w-20 h-10 {getGradeColor(
					course['overall_average_grade']
				)} rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				{Math.round(course['overall_average_grade']) + 5}%
			</div>
			<div
				class="p-5 h-10 w-20 {getWorkColor(
					course['overall_average_work']
				)} rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				{Math.round(course['overall_average_work'])}
			</div>
		</div>
	</div>
	<div class="w-[calc(100%-40px)] h-[1px] bg-base-100 mt-auto mb-3" />
</a>

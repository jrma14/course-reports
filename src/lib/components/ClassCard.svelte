<script>
	export let title;
	export let number;
</script>

<a class="h-full flex flex-col items-center" href={`/courses/${number.replace(' ', '-')}`}>
	<div class="hover:bg-blue-50 rounded-lg p-5 flex w-full h-full items-center mb-auto mt-auto">
		<div class="flex flex-grow">
			<h1 class="font-bold underline text-3xl mr-10">
				{number}
			</h1>
			<h1 class="font-normal ml-10 text-3xl mr-5">
				{title}
			</h1>
		</div>
		<div class="flex w-[25%] justify-between h-full items-center">
			<div
				class="p-5 w-20 h-1/2 bg-success rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				4.2
			</div>
			<div
				class="p-5 w-10 h-10 bg-error rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				A
			</div>
			<div
				class="p-5 h-10 w-26 bg-warning rounded-xl flex justify-center items-center font-semibold text-2xl"
			>
				13-15
			</div>
		</div>
	</div>
	<div class="w-[calc(100%-40px)] h-[1px] bg-base-100 mt-auto mb-3" />
</a>

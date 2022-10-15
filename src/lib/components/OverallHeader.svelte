<script>
	export let title, number;
</script>

<div class="flex flex-col items-baseline w-full m-0 mb-3">
	<div class="flex flex-row items-baseline gap-5">
		<h1 class="text-5xl font-bold mt-3 ml-3">{title}</h1>
		<h1 class="text-2xl font-light">{number}</h1>
	</div>
	<!-- horizontal line -->
	<div class="w-full h-[1px] bg-gray-300 my-2" />
</div>

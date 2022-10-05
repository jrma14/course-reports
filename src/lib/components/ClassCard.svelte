<script>
	export let title;
	export let number;
</script>

<a href={`/courses/?title=${title}&number=${number}`}>
	<h1 class="font-normal text-3xl">
		{number}
	</h1>
	<h1 class="font-normal text-3xl">
		{title}
	</h1>
	<hr class="mb-5 mt-1" />
</a>

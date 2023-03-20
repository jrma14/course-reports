<script>
	import '../app.css';
	import Header from '$lib/components/header.svelte';
</script>

<svelte:head>
	<title>WPI Course Reports</title>
	<meta
		name="description"
		content="A one stop stop for choosing your next courses. Look up courses to easily see their rankings and how different teachers compare for that course. "
	/>
	<meta name="keywords" content="WPI, Course Reports, OSCAR, Course Ratings" />
</svelte:head>

<div class="w-screen h-screen bg-base-100" data-theme="mytheme">
	<Header />
	<slot />
</div>

<style>
	:global(body) {
		background-color: #f5f5f5;
	}
</style>

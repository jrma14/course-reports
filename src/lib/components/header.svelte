<script>
	import Logo from './logo.svelte';
	import { page } from '$app/stores';
</script>

<div class="w-full h-16 bg-primary flex text-white items-center text-xl">
	<Logo />
	<a href="/" class="ml-5 {$page.url.pathname === '/' ? 'underline' : ''}">Courses</a>
	<a href="/professors" class="ml-5 {$page.url.pathname === '/professors' ? 'underline' : ''}"
		>Professors</a
	>
</div>

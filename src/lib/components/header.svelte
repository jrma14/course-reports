<script>
	import Logo from './logo.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="w-full h-16 bg-primary flex flex-row text-white items-center text-xl">
	<Logo />
	<a href="/" class="ml-5 {$page.url.pathname === '/' ? 'underline' : ''}">Courses</a>
	<!-- TODO -->
	<!-- <a href="/professors" class="ml-5 {$page.url.pathname === '/professors' ? 'underline' : ''}"
		>Professors</a
	> -->
	<!-- <button data-toggle-theme="wpi-light,wpi-dark" data-act-class="ACTIVECLASS">This Button</button> -->
	<button data-set-theme="wpi-light" data-act-class="ACTIVECLASS">LIGHT</button>
	<button data-set-theme="wpi-dark" data-act-class="ACTIVECLASS">DARK</button>
</div>

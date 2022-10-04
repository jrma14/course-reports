<script>
	import '../app.css';

	//import page store
	import { page } from '$app/stores';

	function getErrorText() {
		switch ($page.status) {
			case 404:
				return 'Page not found';
			case 500:
				return 'Internal server error';
			default:
				return 'Unknown error';
		}
	}
</script>

<h1 class="text-6xl text-center m-3">
	{$page.status}
</h1>
<p class="text-center m-3">
	{getErrorText()}
</p>

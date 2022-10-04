<script>
	export let text;
	export let checked = false;
	export let size = 'large';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// dispatch('search', searchQuery);

	const uncheckedStyles = `flex justify-center items-center rounded-full bg-base-100 ${
		size === 'sm' ? 'w-20' : 'w-40 h-8'
	} mr-auto ml-auto hover:cursor-pointer hover:bg-primary/50`;
	const checkedStyles = `flex justify-center items-center rounded-full text-white bg-primary ${
		size === 'sm' ? 'w-20' : 'w-40 h-8'
	} mr-auto ml-auto hover:cursor-pointer`;
	let pillClasses = uncheckedStyles;

	$: pillClasses = checked ? checkedStyles : uncheckedStyles;
</script>

<div
	on:click={() => {
		checked = !checked;
		dispatch('selected', checked);
	}}
	class={pillClasses}
>
	{text}
</div>

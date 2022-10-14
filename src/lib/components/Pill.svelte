<script>
	export let text;
	export let checked = false;
	export let size = 'large';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// dispatch('search', searchQuery);

	const getPillSize = () => {
		if (size === 'sm') {
			return 'w-20 h-8';
		} else {
			if (text.length > 24) {
				return 'w-64 h-12';
			} else {
				return 'w-32 h-12';
			}
			// return 'w-32 h-12';
		}
	};

	const uncheckedStyles = `flex justify-center p-3 items-center text-center rounded-full bg-base-100 
	${getPillSize()} mr-auto ml-auto hover:cursor-pointer hover:bg-primary/50`;

	const checkedStyles = `flex justify-center p-3 items-center rounded-full text-center text-white bg-primary 
	${getPillSize()} mr-auto ml-auto hover:cursor-pointer`;

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

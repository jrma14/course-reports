<script>
	export let text;

	export let size;

	export function clickedPill(pill) {
		let element = pill.srcElement;
		if (element.classList.contains('bg-base-100')) {
			element.classList.remove('bg-base-100');
			element.classList.add('bg-primary');
			element.classList.add('text-white');
		} else {
			element.classList.remove('bg-primary');
			element.classList.remove('text-white');
			element.classList.add('bg-base-100');
		}
	}
</script>

<div
	on:click={(e) => clickedPill(e)}
	class="flex justify-center items-center rounded-full bg-base-100 {size === 'sm'
		? 'w-20'
		: 'w-40 h-8'} mr-auto ml-auto"
>
	{text}
</div>

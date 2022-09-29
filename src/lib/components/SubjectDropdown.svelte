<script>
	import Pill from './Pill.svelte';

	export let subject;
	export let isOpen = false;
    export let pills


	let dropdownClass = 'collapse-close';

	const handleDropdownClick = () => {
		isOpen = !isOpen;
		dropdownClass = isOpen ? 'collapse-open' : 'collapse-close'
	}

</script>

<div class="collapse collapse-arrow border border-base-100 bg-white rounded-[30px] m-5 {dropdownClass}">
	<div class="flex collapse-title text-xl font-medium items-center" on:click="{handleDropdownClick}">
		<input class="checkbox checkbox-sm mr-2" type="checkbox" on:click="{(e) => e.stopPropagation()}" />
		{subject}
	</div>
	<div class="collapse-content">
        <div class="grid grid-cols-2 gap-4">
            {#each pills as pill}
                <Pill text={pill} size=""/>
            {/each}
        </div>
	</div>
</div>

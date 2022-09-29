<script>
	import Pill from './Pill.svelte';

	export let subject;

    export let pills

</script>

<div class="collapse collapse-arrow border border-base-100 bg-white rounded-[30px] m-5">
	<input type="checkbox" />
	<div class="flex collapse-title text-xl font-medium">
		{subject}
	</div>
	<div class="collapse-content">
        <div class="grid grid-cols-2 gap-4">
            {#each pills as pill}
                <Pill text={pill} />
            {/each}
        </div>
	</div>
</div>

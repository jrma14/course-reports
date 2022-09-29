<script>
    import SearchBar from "./components/SearchBar.svelte";
     import Filter from './filter.svelte'
</script>


    <div class="h-full w-full flex">
        <Filter />
        <SearchBar class="w-full" on:search={(e) => console.log(e.detail)} />
    </div>

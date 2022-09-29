<script>
    import SearchBar from "./components/SearchBar.svelte";
     import Filter from './components/filter.svelte'
</script>


    <div class="w-full h-full flex">
        <Filter/>
        <SearchBar on:search={(e) => console.log(e.detail)} />
    </div>

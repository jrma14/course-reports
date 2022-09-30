<script>
    import "../app.css";
    import Header from '$lib/components/header.svelte'
  </script>
  
  <div class="w-screen h-screen bg-base-100" data-theme='mytheme'>
    <Header />
    <slot />
  </div>
  
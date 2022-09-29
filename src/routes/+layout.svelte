<script>
    import "../app.css";
    import Header from './components/header.svelte'
  </script>
  
  <div class="w-screen h-screen bg-base-100">
    <Header />
    <slot />
  </div>
  
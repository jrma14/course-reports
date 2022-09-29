<script>
    import "../app.css";
    import Logo from './logo.svelte'
  </script>
  
  <div class="w-screen h-screen bg-base-100">
    <div class="w-full h-28 bg-primary flex text-white items-center text-3xl">
      <!-- <Logo class="w-40 h-14" /> -->
      <div class="ml-5 underline">
        Courses
      </div>
      <div class="ml-5">
        Professors
      </div>
    </div>
    <slot />

  </div>
  
<template>
    <div class="default-layout">
      <Header />
      <!-- <Navbar /> -->
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/layout/Header.vue'
  // import Navbar from '~/components/layout/Navbar.vue'
  import Footer from '~/components/layout/Footer.vue'
  </script>
  
  <style scoped>
  .default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  </style>
  
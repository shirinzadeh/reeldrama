<template>
    <div class="default-layout">
      <Header />
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/layout/Header.vue'
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
  }
  </style>
  
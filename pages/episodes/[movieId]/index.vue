<script setup>
definePageMeta({ 
  layout: "episodes",
  middleware: ['episode-redirect']
});
</script>

<template>
  <div class="loading-state">
    {{ $t('loading') }}
  </div>
</template>

<style scoped>
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  font-size: 1.2rem;
  color: #fff;
}
</style>

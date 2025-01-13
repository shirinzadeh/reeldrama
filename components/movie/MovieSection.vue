<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  movies: {
    type: Array,
    required: true
  },
  icon: {
    type: String,
    required: false,
  }
})
</script>

<template>
  <div class="movie-section">
    <div class="container">
      <h2 class="section-title">
        <span v-if="icon" class="section-icon">{{ icon }}</span>
        <span>{{ title }}</span>
      </h2>
      <div class="movie-grid">
        <LazyMovieCard v-for="movie in movies" :key="movie._id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-section {
  padding: 3rem 0;
}

.section-title {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
}

.section-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}

@media (max-width: 1024px) {
  .movie-grid {
    flex-wrap: nowrap;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: mandatory;
  }
}
</style>
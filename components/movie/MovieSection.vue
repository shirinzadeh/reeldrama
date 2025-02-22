<script setup>
const { t } = useI18n()

// Make the props more strict with proper types
defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: ''
  }
  
})
</script>

<template>
    <section class="movie-section">
      <div class="container">
          <h2 class="section-title">
            <span>{{ icon }}</span>
            {{ title }}
          </h2>
        <div class="movie-grid">
          <MovieCard 
            v-for="movie in movies" 
            :key="movie._id" 
            :movie="movie" 
          />
        </div>
      </div>
    </section>
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
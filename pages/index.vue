<script setup>
definePageMeta({ layout: 'home' })
import HeroBanner from '~/components/home/HeroBanner.vue'

const {locale} = useI18n()
const categoryStore = useCategoryStore()
const movieStore = useMovieStore()

await categoryStore.fetchCategories()
await movieStore.fetchMovies()

</script>

<template>
  <div class="homepage">
    <HeroBanner :movies="movieStore.featuredMovies" />

    <div class="movie-sections">
      <div v-for="category in categoryStore.categories">
        <MovieSection 
          v-if="movieStore.getMoviesByCategory(category.slug).length > 0"
          :key="category._id" 
          :title="category.name[locale]" 
          :movies="movieStore.getMoviesByCategory(category.slug)" 
          :icon="category.icon" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
}

.movie-sections {
  margin-top: 2rem;
}

.recommended-section {
  margin-top: 2rem;
  padding-bottom: 3rem;
}
</style>

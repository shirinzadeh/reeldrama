<script setup>
defineProps(['movie'])
</script>

<template>
  <NuxtLink :to="`/episodes/${movie._id}`" class="movie-card" :aria-label="`Watch ${movie.title}`">
    <NuxtImg
      :src="movie.thumbnail"
      :alt="`Thumbnail for ${movie.title}`"
      class="movie-image"
      loading="lazy"
      placeholder
    />
    <div class="overlay">
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <span class="play-button">▶ Watch Now</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.movie-card {
  position: relative;
  flex: 0;
  min-width: 12.5rem;
  max-width: 12.5rem;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  display: inline-block; /* Added for NuxtLink */
  text-decoration: none; /* Added for NuxtLink */
}

.movie-card:hover {
  transform: scale(1.05);
  z-index: 1;
}

.movie-card::before { /* Added background overlay */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}

.movie-card:hover::before {
  opacity: 1;
}

.movie-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2; /* Added to appear above the background overlay */
}

.movie-card:hover .overlay {
  opacity: 1;
}

.movie-info {
  color: white;
}

.movie-title {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.play-button {
  background: #e50914;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
}

</style>
<script setup>
const { locale } = useI18n()
defineProps(['movie'])

const { t } = useI18n()
</script>

<template>
  <NuxtLink :to="`/episodes/${movie._id}`" class="movie-card" :aria-label="`Watch ${movie.title[locale]}`">
    <NuxtImg
      :src="movie.thumbnail"
      :alt="`Thumbnail for ${movie.title[locale]}`"
      class="movie-image"
      loading="lazy"
      placeholder
    />
    <div class="overlay">
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title[locale] }}</h3>
        <p class="movie-description">{{ movie.description[locale] }}</p>
        <span class="play-button">{{ t('watch_now') }}</span>
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
  color: #fff;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.movie-description {
  font-size: .75rem;
  color: #e5e5e5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
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
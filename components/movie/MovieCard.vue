<script setup>
const { locale } = useI18n()
const props = defineProps({
  movie: {
    type: Object,
    required: true,
    validator: (movie) => {
      return movie && 
        movie._id && 
        movie.title && 
        movie.description && 
        movie.thumbnail
    }
  }
})

const { t } = useI18n()
const localePath = useLocalePath()

const myListStore = useMyListStore()

const isInList = computed(() => {
  return Array.isArray(myListStore.items) && 
    myListStore.items.some(item => item._id === props.movie._id)
})

const isAnimating = ref(false)

const toggleFavorite = async (e) => {
  e.preventDefault() // Prevent link navigation
  if (isAnimating.value) return // Prevent multiple clicks during animation
  
  isAnimating.value = true
  
  if (isInList.value) {
    await myListStore.removeFromList(props.movie._id)
  } else {
    await myListStore.addToList(props.movie)
  }
  
  // Reset animation state after a short delay
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}
</script>

<template>
  <NuxtLink :to="localePath(`/episodes/${movie._id}/episode-1`)" class="movie-card" :aria-label="`Watch ${movie.title[locale]}`">
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
        <div class="action-buttons">
          <span class="play-button">{{ t('watch_now') }}</span>
          <button 
            @click="toggleFavorite" 
            class="star-button" 
            :class="{ 
              'active': isInList, 
              'animate': isAnimating 
            }"
          >
            <Icon name="mdi-star" />
          </button>
        </div>
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

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star-button {
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 36px;
  height: 36px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  transform-origin: center;
}

.star-button.animate {
  animation: starPop 0.3s ease-in-out;
}

@keyframes starPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.star-button.active {
  color: hsl(51, 100%, 50%);
  text-shadow: 0 0 8px hsla(51, 100%, 50%, 0.5);
}

.star-button:active {
  transform: scale(0.9);
}
</style>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const props = defineProps({
  movies: {
    type: Array,
    required: true
  }
})

const movieStore = useMovieStore()

const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onTitleHover = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
  }
}

const parallaxOffset = ref(0)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  parallaxOffset.value = window.scrollY * 0.5 // Adjust multiplier for parallax intensity
}

</script>

<template>
  <div class="hero-banner">
    <Swiper
      @swiper="onSwiper"
      :modules="[Autoplay, EffectFade]"
      :slides-per-view="1"
      :loop="true"
      effect="fade"
      :speed="800"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      class="hero-swiper"
    >
      <SwiperSlide v-for="movie in movieStore.featuredMovies" :key="movie._id" class="hero-slide">
        <div class="slide-content">
          <div class="gradient-overlay top"></div>
          <div class="gradient-overlay bottom"></div>
          <NuxtImg
            :src="movie.banner"
            :alt="movie.title"
            class="banner-image"
            :style="{ transform: `translateY(${parallaxOffset}px)` }"
            format="webp"
            loading="lazy"
            placeholder
          />
          <div class="movie-info">
            <NuxtLink :to="`/episodes/${movie._id}`" class="main-button watch-button" :aria-label="`Watch ${ movie.title }`">
              <Icon name="carbon:play-filled" class="play-icon" />
              Watch Now
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>

      <div class="titles-sidebar">
      <NuxtLink 
        v-for="(movie, index) in movieStore.featuredMovies" 
        :key="movie._id"
        :to="`/episodes/${movie._id}`"
        class="movie-title-link"
        :aria-label="`Navigate to ${ movie.title }`"
        @mouseenter="onTitleHover(index)"
      >
        {{ movie.title }}
      </NuxtLink>
    </div>
    </Swiper>


  </div>
</template>

<style scoped>
.hero-banner {
  width: 100%;
  height: 65vh;
  position: relative;
  display: flex;
}

.hero-swiper {
  width: 100%;
  height: 100%;
}

.hero-slide {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.swiper-slide-active {
  opacity: 1;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  /* transition: transform 0.1s linear; */
}

.gradient-overlay {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  z-index: 1;
  pointer-events: none;
}

.gradient-overlay.top {
  top: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
}

.gradient-overlay.bottom {
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  z-index: 2;
}

.movie-info p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.play-icon {
  width: 20px;
  height: 20px;
}

.titles-sidebar {
  width: 25%;
  background: rgba(0, 0, 0, 0.3);
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: absolute;
  top: 4rem;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.movie-title-link {
  color: white;
  text-decoration: none;
  padding: 1rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  cursor: pointer;
}

.movie-title-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-left: 3px solid #ff5a5f;
  font-size: 1.0625rem;
}

@media (max-width: 768px) {
  .hero-swiper {
    width: 100%;
  }

  .titles-sidebar {
    display: none;
  }
}
</style>
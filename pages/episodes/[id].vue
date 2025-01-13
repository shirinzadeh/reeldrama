<script setup>
definePageMeta({ layout: "episodes" });

const movieStore = useMovieStore();
const episodeStore = useEpisodeStore();

const route = useRoute();
const movieId = route.params.id;
const initialEpisodeIndex = parseInt(route.query.episode) || 0;

const currentEpisodeIndex = ref(initialEpisodeIndex);

// Fetch movie and episode details on movieId change
watch(
  () => movieId,
  () => {
    movieStore.fetchMovieDetail(movieId);
    episodeStore.fetchEpisodeDetail(movieId);
  },
  { immediate: true }
);

const movieDetail = computed(() => movieStore.movieDetail);
const episodes = computed(() => episodeStore.currentEpisode || []);
const currentEpisode = computed(() => episodes.value[currentEpisodeIndex.value] || null);
const episodeCount = computed(() => episodes.value.length);

const breadcrumbItems = computed(() => [
  { name: movieDetail.value?.title || '', href: `/movies/${movieId}` },
  { name: currentEpisode.value?.title || '' },
]);

const playEpisode = (index) => { currentEpisodeIndex.value = index; };
</script>

<template>
  <NuxtLink to="/" class="close-button" >
    <Icon name="carbon:close" />
  </NuxtLink>
  <div class="container">
    <div class="movie-page">
      <div class="content-wrapper">
      <!-- Video Section -->
      <div class="video-section">
        <video
          v-if="currentEpisode"
          controls
          autoplay
          class="video-player"
          :src="currentEpisode.videoUrl"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Details Section -->
      <div class="details-section">
        <Breadcrumb :items="breadcrumbItems" />
        <h1 class="movie-title">
          {{ currentEpisode?.title }} - {{ movieDetail?.title }}
        </h1>

        <!-- Plot Section -->
        <div class="plot-section">
          <h2 class="section-title">Plot of {{ movieDetail?.title }}</h2>
          <p class="plot-text">{{ movieDetail?.description }}</p>
        </div>

        <!-- Tags -->
        <div class="tags-container">
          <span
            v-for="(tag, index) in movieDetail?.tags"
            :key="index"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Episodes Section -->
        <div class="episodes-section">
          <div class="episodes-header">
            <h2 class="section-title">Episode List</h2>
          </div>

          <!-- Episode Status -->
          <div class="episode-status">
            <span>
              Episode ({{ currentEpisodeIndex + 1 }} / {{ episodeCount }})
            </span>
            <span class="status-completed">
              {{ episodeCount === currentEpisodeIndex + 1 ? 'Completed' : 'In Progress' }}
            </span>
          </div>

          <!-- Episode Grid -->
          <div class="episode-grid">
            <button v-for="(episode, index) in episodeStore.currentEpisode" :key="index" :class="['episode-number', { active: index === currentEpisodeIndex }]" @click="playEpisode(index)">
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>


<style scoped>
.movie-page {
  height: 100dvh;
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  height: 100%;
}

.video-section {
  flex: 2;
  display: flex;
  justify-content: center;
}

.video-player {
  height: 100%;
  aspect-ratio: 9/16;
  border-radius: 0.5rem;
}

.details-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-block: 2rem;
}

.movie-title {
  font-size: 1.75rem;
  font-weight: 600;
}

.social-metrics {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.metric-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
}

.metric-button i {
  font-size: 1.25rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.plot-text {
  color: #9ca3af;
  font-size: .875rem;
  line-height: 1.6;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #1f2937;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.episodes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.episode-filters {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
}

.filter-button {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
}

.filter-button.active {
  color: #ef4444;
}

.filter-button.all {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.episode-status {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.status-completed {
  color: #9ca3af;
}

.episode-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
}

.episode-number {
  aspect-ratio: 1;
  background: #1f2937;
  border: none;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.episode-number.active {
  background: #ef4444;
}

.episode-number:hover {
  background: #374151;
}

.close-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2rem;
  border-radius: 50%;
  background: rgba(103, 102, 102, 0.5);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  z-index: 10;
}

.close-button:hover {
  background: rgba(44, 44, 44, 0.7);
}

.close-button i {
  font-size: 1.5rem;
}

@media screen and (max-width: 1024px) {
  .video-player {
    width: 100%;
    aspect-ratio: auto;
  }
  
}

@media (max-width: 768px) {
  .movie-page {
    padding-top: 2rem;
    height: auto;
  }
  .content-wrapper {
    flex-direction: column;
  }

  .video-player {
    width: 100%;
    min-height: 25rem;
  }

  .video-section {
    width: 100%;
    height: 100%;
  }

  .details-section {
    width: 100%;
  }
}

@media (max-width: 640px) {

  .episode-filters {
    display: none;
  }
}
</style>
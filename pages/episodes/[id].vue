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

const showPackagesModal = ref(false);
const selectedLockedEpisodeIndex = ref(null);

const playEpisode = (index) => {
  // Always change the current episode index
  currentEpisodeIndex.value = index;
  
  const episode = episodes.value[index];
  if (!episode.free) {
    selectedLockedEpisodeIndex.value = index;
    showPackagesModal.value = true;
  }
};

const handlePackagePurchase = () => {
  // Handle the purchase completion
  showPackagesModal.value = false;
  selectedLockedEpisodeIndex.value = null;
};

const handleVideoEnded = () => {
  const nextEpisodeIndex = currentEpisodeIndex.value + 1;
  
  // Check if there is a next episode
  if (nextEpisodeIndex < episodes.value.length) {
    // Always move to next episode, but show modal if it's locked
    currentEpisodeIndex.value = nextEpisodeIndex;
    
    if (!episodes.value[nextEpisodeIndex].free) {
      selectedLockedEpisodeIndex.value = nextEpisodeIndex;
      showPackagesModal.value = true;
    }
  }
};

const shouldAutoPlay = computed(() => 
  currentEpisode.value && currentEpisode.value.free
);

const isCurrentEpisodeLocked = computed(() => 
  currentEpisode.value && !currentEpisode.value.free
);

// New computed property to get video URL only if episode is free
const videoSource = computed(() => {
  if (!currentEpisode.value || !currentEpisode.value.free) {
    return null; // Return null for locked episodes
  }
  return currentEpisode.value.videoUrl;
});

// Add handler for video errors
const handleVideoError = () => {
  if (isCurrentEpisodeLocked.value) {
    showPackagesModal.value = true;
  }
};

// Add preventPlayback method
const videoRef = ref(null);
const preventLockedPlayback = () => {
  if (isCurrentEpisodeLocked.value && videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
};

const isLoading = computed(() => episodeStore.loading);
const error = computed(() => episodeStore.error);
</script>

<template>
  <NuxtLink to="/" class="close-button" >
    <Icon name="carbon:close" />
  </NuxtLink>
  
  <div v-if="isLoading" class="loading-state">
    Loading...
  </div>
  
  <div v-else-if="error" class="error-state">
    {{ error }}
  </div>
  
  <div v-else class="container">
    <div class="movie-page">
      <div class="content-wrapper">
      <!-- Video Section -->
      <div class="video-section">
        <div class="video-wrapper">
          <!-- Modified video element -->
          <video
            v-if="currentEpisode"
            ref="videoRef"
            controls
            :autoplay="shouldAutoPlay"
            class="video-player"
            :src="videoSource"
            @play="preventLockedPlayback"
            @timeupdate="preventLockedPlayback"
            @loadstart="preventLockedPlayback"
            @error="handleVideoError"
            @ended="handleVideoEnded"
            :poster="movieDetail?.thumbnail"
          >
            Your browser does not support the video tag.
          </video>
          
          <!-- Overlay for locked episodes -->
          <div 
            v-if="isCurrentEpisodeLocked" 
            class="video-overlay"
            @mousedown.prevent
            @contextmenu.prevent
          >
            <div class="overlay-content">
              <div class="premium-badge">PREMIUM</div>
              <h3>Subscribe to Continue Watching</h3>
              <p>Get unlimited access to all premium content</p>
              <div class="benefits">
                <div class="benefit-item">
                  <Icon name="material-symbols:check-circle-outline" class="check-icon" />
                  <span>HD Quality Content</span>
                </div>
                <div class="benefit-item">
                  <Icon name="material-symbols:check-circle-outline" class="check-icon" />
                  <span>Ad-free Experience</span>
                </div>
                <div class="benefit-item">
                  <Icon name="material-symbols:check-circle-outline" class="check-icon" />
                  <span>Exclusive Episodes</span>
                </div>
              </div>
              <button class="unlock-btn" @click="showPackagesModal = true">
                Top up to get 100% bonus
              </button>
            </div>
          </div>
        </div>
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
            <button 
              v-for="(episode, index) in episodeStore.currentEpisode" 
              :key="index" 
              :class="[
                'episode-number', 
                { 
                  active: index === currentEpisodeIndex,
                  locked: !episode.free 
                }
              ]" 
              @click="playEpisode(index)"
            >
              <span>{{ index + 1 }}</span>
              <Icon v-if="!episode.free" name="ph:lock-simple-fill" class="lock-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Packages Modal -->
    <BaseModal v-if="showPackagesModal" size="large" @close="showPackagesModal = false">
      <div class="packages-modal">
        <h2 class="modal-title">Get Access to All Episodes</h2>
        <p class="modal-subtitle">Choose a package to unlock all episodes</p>
        
        <div class="packages-container">
          <shopping-packages @package-selected="handlePackagePurchase" />
        </div>
      </div>
    </BaseModal>
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

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.video-player {
  height: 100%;
  aspect-ratio: 9/16;
  border-radius: 0.5rem;
  z-index: 1;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  pointer-events: all !important;
  user-select: none;
  z-index: 2;
}

.overlay-content {
  text-align: center;
  padding: 2rem;
  max-width: 400px;
}

.premium-badge {
  display: inline-block;
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.overlay-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.overlay-content p {
  color: #9ca3af;
  margin-bottom: 2rem;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.check-icon {
  color: #ef4444;
  font-size: 1.25rem;
}

.unlock-btn {
  background: #ef4444;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.unlock-btn:hover {
  background: #dc2626;
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
  position: relative;
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

.episode-number.locked {
  background: #1a1a1a;
  color: #666;
}

.episode-number:hover {
  background: #374151;
}

.lock-icon {
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 0.75rem;
  opacity: 0.8;
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

.packages-modal {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.modal-subtitle {
  color: #9ca3af;
  text-align: center;
  margin-bottom: 2rem;
}

/* .packages-container {
  max-height: 70vh;
  overflow-y: auto;
} */

.loading-state,
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  font-size: 1.2rem;
  color: #fff;
}

.error-state {
  color: #ef4444;
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
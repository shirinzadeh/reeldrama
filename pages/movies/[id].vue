<script setup>
const route = useRoute();
const movieStore = useMovieStore();
const episodeStore = useEpisodeStore();
const { movieDetail } = storeToRefs(movieStore);
const { t, locale } = useI18n();
const { formatDate } = useFormattedDate();
const localePath = useLocalePath();

const movieId = route.params.id;

await movieStore.fetchMovies(movieId);
await movieStore.fetchMovieDetail(movieId);
await episodeStore.fetchEpisodeDetail(movieId);

const playEpisode = async (_, i) => {
  navigateTo(localePath(`/episodes/${movieDetail.value._id}/episode-${i+1}`));
};
</script>

<template>
  <div class="movie-detail-page">
    <!-- Banner Section -->
    <div class="banner-section">
      <img :src="movieDetail?.banner" :alt="movieDetail?.title" class="banner-image">
      <div class="banner-overlay"></div>

      <div class="movie-info">
          <h1 class="movie-title">{{ movieDetail?.title[locale] }}</h1>
          <div class="movie-meta">
            <span class="release-date">{{ formatDate(movieDetail?.releaseDate) }}</span>
            <span class="separator">•</span>
            <span v-for="tag in movieDetail?.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p class="movie-description">{{ movieDetail?.description[locale] }}</p>
          <div class="action-buttons">
            <NuxtLink :to="`/episodes/${movieDetail._id}`" class="main-button watch-button">
              <span class="play-icon">▶</span>
              {{ t('watch_now') }}
            </NuxtLink>
            <!-- <button class="add-list-button">
              <span class="plus-icon">+</span>
              Add to My List
            </button> -->
          </div>
        </div>
    </div>

    <!-- Episodes Section -->
    <div class="container">
      <div class="episodes-section">
        <h2 class="section-title">{{ t('episodes.list') }}</h2>
        <div class="episodes-grid">
          <div 
            v-for="(episode, index) in episodeStore.currentEpisode" 
            :key="episode._id" class="episode-card" 
            @click="playEpisode(episode, index)">
            <!-- <div class="episode-thumbnail">
              <img :src="movieDetail?.banner" :alt="episode.title">
              <span class="play-overlay">▶</span>
              <span class="episode-status" :class="{ 'free': episode.free }">
                {{ episode.free ? 'FREE' : 'PREMIUM' }}
              </span>
            </div> -->
            <div class="episode-info">
              <h3 class="episode-title">{{ episode.title[locale] }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- You Might Like Section -->
    <ClientOnly>
      <!-- without ClientOnly wrapper title gives hydration mismatch error  -->
      <MovieSection 
        :movies="movieStore.getRelatedMovies"
        :title="t('movie.youMightLike')"
      />
    </ClientOnly>
  </div>
</template>



<style scoped>
.movie-detail-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
}

.banner-section {
  position: relative;
  height: 70vh;
  min-height: 500px;
  margin-block: 3.75rem
}

.banner-overlay {
  position: absolute;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 40%, transparent);
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.movie-info {
  position: absolute;
  top: 0;
  left: 0;
  padding-inline: 3.75rem;
  max-width: 37.5rem;
}

.movie-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.separator {
  color: #666;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}

.movie-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.add-list-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.episodes-section {
  padding: 3rem 0;
  /* Modified padding */
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.episodes-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.episode-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.episode-card:hover {
  transform: scale(1.05);
}

.episode-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
}

.episode-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.episode-card:hover .play-overlay {
  opacity: 1;
}

.episode-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
}

.episode-status.free {
  background: #e50914;
}

.episode-info {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
}

.episode-title {
  font-size: 1rem;
  font-weight: 500;
}

.related-section {
  padding: 3rem 60px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9));
}

.related-movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {

  .movie-title {
    font-size: 2rem;
  }

  .movie-info {
    padding-inline: 1.25rem;
  }

  .episodes-section {
    padding-block: 30px;
  }

  .related-section {
    padding: 2rem 30px;
  }

  .related-movies {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
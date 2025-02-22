<template>
  <div class="history-page">
    <h1 class="page-title">{{ t('history') }}</h1>
    
    <div class="content">
      <div v-if="!historyStore.watchHistory.length" class="empty-state">
        <Icon name="mdi-history" size="48" class="mb-4" />
        <p>{{ t('no_watch_history') }}</p>
      </div>
      
      <div v-else class="history-grid">
        <div v-for="item in historyStore.watchHistory" 
          :key="item._id"
          class="history-card">
          <NuxtLink 
            :to="localePath(`/episodes/${item.movie._id}/episode-${item.episode.number}`)"
            class="card-content">
            <div class="thumbnail-wrapper">
              <img :src="item.movie.thumbnail" :alt="item.movie.title[locale]" class="thumbnail">
              <div class="episode-badge">
                {{ t('episode') }} {{ item.episode.number }}
              </div>
              <div class="play-overlay">
                <Icon name="mdi:play-circle" size="48" />
              </div>
            </div>
            
            <div class="info">
              <h3 class="title">{{ item.movie.title[locale] }}</h3>
              <p class="episode-info">
                {{ t('episode') }} {{ item.episode.number }}/{{ item.movie.totalEpisodes }}
                <span class="progress">{{ getSeriesProgress(item) }}%</span>
              </p>
              <div class="progress-bar">
                <div class="progress-fill" :style="`width: ${getSeriesProgress(item)}%`"></div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const historyStore = useHistoryStore()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const getSeriesProgress = (item) => {
  if (!item.movie?.totalEpisodes) return 0
  return Math.round((item.episode.number / item.movie.totalEpisodes) * 100)
}

onMounted(() => {
  historyStore.fetchHistory()
})
</script>

<style scoped>
.page-title {
  margin-bottom: 2rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: var(--text-secondary);
  text-align: center;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.history-card {
  background: var(--dark-surface);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s;
}

.history-card:hover {
  transform: translateY(-4px);
}

.card-content {
  display: block;
  text-decoration: none;
  color: inherit;
}

.thumbnail-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.episode-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.75);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
}

.play-overlay .icon {
  transform: scale(0.9);
  transition: transform 0.2s ease;
}

.card-content:hover .play-overlay {
  opacity: 1;
}

.card-content:hover .play-overlay .icon {
  transform: scale(1);
}

.info {
  padding: 1rem;
}

.title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.episode-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.progress {
  color: var(--primary-900);
  font-weight: 500;
}

.progress-bar {
  height: 3px;
  background: var(--dark-surface-soft);
  border-radius: 1.5px;
  margin-bottom: 0.75rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-900);
  border-radius: 1.5px;
  transition: width 0.3s ease;
}

.description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}


</style>

<script setup>
const historyStore = useHistoryStore()
const myListStore = useMyListStore()

const localePath = useLocalePath()
const { t, locale } = useI18n()
const activeTab = ref('history')

// Calculate series progress for a movie
const getSeriesProgress = (item) => {
  if (!item.movie?.totalEpisodes) return 0
  return Math.round((item.episode.number / item.movie.totalEpisodes) * 100)
}

const MAX_ITEMS = 3

const shouldShowMore = computed(() => {
  if (activeTab.value === 'history') {
    return historyStore.watchHistory.length > MAX_ITEMS
  }
  return myListStore.items.length > MAX_ITEMS
})

const displayedItems = computed(() => {
  if (activeTab.value === 'history') {
    return historyStore.watchHistory.slice(0, MAX_ITEMS)
  }
  return myListStore.items.slice(0, MAX_ITEMS)
})

onMounted(() => {
  historyStore.fetchHistory()
  myListStore.fetchItems()
})
</script>

<template>
  <BaseDropdown>
    <template #trigger>
        <Icon name="mdi-history" class="icon" />
        <span class="icon-label">{{ t('history') }}</span>
    </template>

    <div class="history-wrapper">
      <div class="history-header">
        <div class="tabs">
          <button 
            @click="activeTab = 'history'"
            :class="['tab-btn', { active: activeTab === 'history' }]"
          >
            {{ t('history') }}
          </button>
          <button 
            @click="activeTab = 'mylist'"
            :class="['tab-btn', { active: activeTab === 'mylist' }]"
          >
            {{ t('my_list') }}
          </button>
        </div>
      </div>

      <div class="history-content">
        <div v-if="activeTab === 'history'">
          <div v-if="!historyStore.watchHistory.length" class="history-empty">
            <Icon name="mdi-playlist-play" size="24" class="mb-2" />
            <p>{{ t('no_watch_history') }}</p>
          </div>

          <div v-else class="history-list">
            <NuxtLink 
              v-for="item in displayedItems" 
              :key="item._id"
              :to="localePath(`/episodes/${item.movie._id}/episode-${item.episode.number}`)"
              class="history-item">
              <img :src="item.movie.thumbnail" :alt="item.movie.title[locale]" class="history-thumb">
              <div class="history-info">
                <h4>{{ item.movie.title[locale] }}</h4>
                <div class="episode-info">
                  <p>{{t('episode')}} {{ item.episode.number }}/{{ item.movie.totalEpisodes }}</p>
                  <span class="progress-percent">{{ getSeriesProgress(item) }}%</span>
                </div>
                <div class="progress-bars">
                  <!-- Series progress -->
                  <div class="progress-bar series-progress">
                    <div :style="`width: ${getSeriesProgress(item)}%`" class="progress"></div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
        
        <div v-else>
          <div v-if="!myListStore.items.length" class="history-empty">
            <Icon name="mdi-playlist-play" size="24" class="mb-2" />
            <p>{{ t('no_items_in_list') }}</p>
          </div>
          
          <div v-else class="history-list">
            <NuxtLink 
              v-for="movie in displayedItems" 
              :key="movie._id"
              :to="localePath(`/episodes/${movie._id}/episode-1`)"
              class="history-item">
              <img :src="movie.thumbnail" :alt="movie.title[locale]" class="history-thumb">
              <div class="history-info">
                <h4>{{ movie.title[locale] }}</h4>
                <p class="description">{{ movie.description[locale] }}</p>
                <button 
                  @click.prevent="myListStore.removeFromList(movie._id)"
                  class="remove-button"
                >
                  <Icon name="mdi:close" />
                </button>
              </div>
            </NuxtLink>
          </div>
        </div>
        <NuxtLink 
          v-if="shouldShowMore"
          :to="localePath(`/dashboard/${activeTab}`)" 
          class="more-link"
        >
          {{ t('more') }}
        </NuxtLink>
      </div>
    </div>
    
  </BaseDropdown>
</template>

<style scoped>
.history-wrapper {
  width: 320px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.history-header h3 {
  font-size: 1rem;
  font-weight: 600;
}

.history-content {
  min-height: 300px;
  overflow-y: auto;
}

.history-empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 2rem;
}

.history-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem;
  text-decoration: none;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  position: relative;
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.history-thumb {
  width: 100px;
  height: 56px;
  object-fit: cover;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.history-info {
  flex: 1;
  min-width: 0;
}

.history-info h4 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-info p {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}

.episode-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-percent {
  font-size: 0.75rem;
  color: #e50914;
  font-weight: 500;
}

.progress-bars {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.progress-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1px;
}

.episode-progress {
  height: 3px;
  margin-bottom: 2px;
}

.progress {
  height: 100%;
  background: #e50914;
  border-radius: 1.5px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.tabs {
  display: flex;
  gap: 1rem;
}

.tab-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.25rem 0;
  position: relative;
}

.tab-btn.active {
  color: var(--text-primary);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-900);
}

.more-link {
  color: var(--primary-900);
  font-size: 0.875rem;
  text-decoration: none;
    margin-top: 1rem;
    display: flex;
    justify-content: center;

}

.more-link:hover {
  text-decoration: underline;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.remove-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.history-item:hover .remove-button {
  opacity: 1;
}

.remove-button:hover {
  background: rgba(229, 9, 20, 0.8);
}
</style>

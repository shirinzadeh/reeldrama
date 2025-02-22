<template>
  <div class="mylist-page">
    <h1 class="page-title">{{ t('my_list') }}</h1>
    
    <div class="content">
      <div v-if="!myListStore.items.length" class="empty-state">
        <Icon name="mdi-playlist-play" size="48" class="mb-4" />
        <p>{{ t('no_items_in_list') }}</p>
      </div>
      
      <div v-else class="items-grid">
        <MovieCard 
          v-for="movie in myListStore.items" 
          :key="movie._id" 
          :movie="movie" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

const myListStore = useMyListStore()
const { t } = useI18n()

onMounted(() => {
  myListStore.fetchItems()
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

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
</style>

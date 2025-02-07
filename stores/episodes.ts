import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import Episode from '~/server/models/Episode';

interface State {
  currentEpisode: any[] | null;
  loading: boolean;
  error: string | null;
}

export const useEpisodeStore = defineStore('episodeStore', () => {
  // state
  const currentEpisode: Ref<any[] | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // actions
  const fetchEpisodeDetail = async (movieId: string) => {
    if (!movieId) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      const api = useApi();
      const response = await api.get(`/episodes/${movieId}`);
      const data = response as { success: boolean; data: any[] };
      if (data.success) {
        currentEpisode.value = data.data
      } else {
        throw new Error('Failed to fetch episodes')
      }
    } catch (err) {
      console.error('Error fetching episodes:', err)
      error.value = err instanceof Error ? err.message : 'Failed to fetch episodes'
      currentEpisode.value = []
    } finally {
      loading.value = false
    }
  };

  const clearEpisodes = () => {
    currentEpisode.value = null;
    error.value = null;
  };

  // return composed store
  return {
    // state
    currentEpisode,
    loading,
    error,
    // actions
    fetchEpisodeDetail,
    clearEpisodes,
  };
});

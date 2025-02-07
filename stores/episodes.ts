import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { H3Error } from 'h3'
export const useEpisodeStore = defineStore('episodeStore', () => {
  // state
  const currentEpisode: Ref<any[] | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const $reset = () => {
    currentEpisode.value = []
    loading.value = false
    error.value = null
  }

  // actions
  const fetchEpisodeDetail = async (movieId: string) => {
    if (!movieId) return;

    loading.value = true;
    error.value = null;

    try {
      const api = useApi();
      const response = await api.get(`/episodes/${movieId}`);
      const data = response as { success: boolean; data: [] };
      if (data.success) {
        currentEpisode.value = data.data
      }
    }
    catch (error) {
      console.error('Error fetching episodes:', error);
  
    }
    finally {
      loading.value = false;
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
    $reset
  };
});

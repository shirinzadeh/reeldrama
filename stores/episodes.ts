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
      const episodes = await api.get(`/episodes/${movieId}`);
      currentEpisode.value = episodes as (typeof Episode)[];
    } catch (err) {
      console.error('Error fetching episode:', err);
      error.value = err instanceof Error ? err.message : 'Failed to fetch episodes';
      currentEpisode.value = null;
    } finally {
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
  };
});

// stores/episodes.js
export const useEpisodeStore = defineStore('episodeStore', () => {
    const { fetch } = useApi();
    const currentEpisode = ref(null);
  
    const fetchEpisodeDetail = async (episodeId) => {
      const { data, error } = await fetch(`/episodes/${episodeId}`);
      if (error) {
        console.error('Error fetching episode:', error);
        return;
      }
      currentEpisode.value = data?.data || null;
    };
  
    return {
      currentEpisode,
      fetchEpisodeDetail,
    };
  });
  
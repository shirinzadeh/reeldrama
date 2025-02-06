import { defineStore } from 'pinia'
import { ref } from 'vue'

interface HistoryMovieData {
    id: string;  // Keep as 'id' for frontend consistency
    title: Record<string, string>;
    thumbnail: string;
    totalEpisodes: number;
}

interface HistoryEpisodeData {
    id: string;  // Keep as 'id' for frontend consistency
    number: number;
}

interface HistoryData {
    movie: HistoryMovieData;
    episode: HistoryEpisodeData;
    progress: number;
}

export const useHistoryStore = defineStore('history', () => {
    const api = useApi()
    const watchHistory = ref([])
    const isLoading = ref(false)

    async function fetchHistory() {
        isLoading.value = true
        const deviceId = localStorage.getItem('device_id')
        const response = await api.get('/history', {
            query: deviceId ? { deviceId } : {}
        })

        const data = response as []
        watchHistory.value = data
    }

    async function addToHistory(data: HistoryData) {
        const deviceId = localStorage.getItem('device_id') || crypto.randomUUID()
        localStorage.setItem('device_id', deviceId)

        try {
            await api.post('/history', {
                body: {
                    ...data,
                    deviceId,
                    watchedAt: new Date()
                }
            })
    
            await fetchHistory()
        } catch (error) {
            console.error('Error adding to history:', error)
        }
    }

    return {
        watchHistory,
        isLoading,
        fetchHistory,
        addToHistory
    }
})

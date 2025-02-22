import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Movie } from '~/types/movie'

export const useMyListStore = defineStore('myList', () => {
    const api = useApi()
    const items = ref<Movie[]>([])
    const localStorage = useLocalStorage()
    const { status } = useAuth()

    const addToList = async (movie: Movie) => {
        if (status.value === 'authenticated') {
            await api.post('/mylist', {
                body: { movieId: movie._id }
            })
        } else {
            localStorage.addToMyList(movie)
        }
        
        if (!items.value.find(item => item._id === movie._id)) {
            items.value = [movie, ...items.value]
        }
    }

    const removeFromList = async (movieId: string) => {
        if (status.value === 'authenticated') {
            await api.delete(`/mylist/${movieId}`)
        } else {
            localStorage.removeFromMyList(movieId)
        }
        items.value = items.value.filter(item => item._id !== movieId)
    }

    const fetchItems = async () => {
        try {
            if (status.value === 'authenticated') {
                const response = await api.get('/mylist')
                const data = response as { statusCode: number, success: boolean, data: Movie[] }
                items.value = data.data || []
            } else {
                items.value = localStorage.getMyList()
            }
        } catch (error) {
            console.error('Failed to fetch my list:', error)
            // Fallback to localStorage even on API error
            items.value = localStorage.getMyList()
        }
    }

    // Sync localStorage with store when authentication state changes
    watch(() => status.value, async (newStatus) => {
        if (newStatus === 'authenticated') {
            await fetchItems()
        } else {
            items.value = localStorage.getMyList()
        }
    })

    return {
        items,
        addToList,
        removeFromList,
        fetchItems
    }
})

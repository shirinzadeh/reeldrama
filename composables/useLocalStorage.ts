import type { Movie } from '~/types/movie'

export const useLocalStorage = () => {
  const MY_LIST_KEY = 'my_list'

  const getMyList = (): Movie[] => {
    if (process.server) return []
    const stored = localStorage.getItem(MY_LIST_KEY)
    return stored ? JSON.parse(stored) : []
  }

  const addToMyList = (movie: Movie) => {
    if (process.server) return
    const currentList = getMyList()
    if (!currentList.some(item => item._id === movie._id)) {
      const newList = [movie, ...currentList]
      localStorage.setItem(MY_LIST_KEY, JSON.stringify(newList))
    }
  }

  const removeFromMyList = (movieId: string) => {
    if (process.server) return
    const currentList = getMyList()
    const newList = currentList.filter(item => item._id !== movieId)
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(newList))
  }

  return {
    getMyList,
    addToMyList,
    removeFromMyList
  }
}

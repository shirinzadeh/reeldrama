interface HistoryItem {
    movieId: string,
    episodeId: {
        number: number;
    };
}

interface LastWatchedEpisode {
    episodeId: {
        number: number;
    };
}

export default defineNuxtRouteMiddleware(async (to) => {
    try {   
        const pathMatch = to.path.match(/^\/([a-z]{2}\/)?episodes\/[^/]+$/)

        if (!pathMatch) {
            console.log('Path did not match expected pattern - exiting middleware')
            return
        }

        // Extract and validate movieId
        const movieId = to.params.movieId as string
        if (!movieId) {
            console.error('No movieId found in route params')
            return
        }

        // Extract language prefix
        const langPrefix = to.path.match(/^\/([a-z]{2})\//)?.[1] || ''
        const basePrefix = langPrefix ? `/${langPrefix}` : ''

        // Get history store
        const historyStore = useHistoryStore()
        if (!historyStore?.watchHistory) {
            console.error('History store or watch history not available')
            return navigateTo(`${basePrefix}/episodes/${movieId}/episode-1`)
        }

        // Find last watched episode
        const lastWatched = historyStore.watchHistory.find((h: HistoryItem) => {
            return h.movieId === movieId
        })

        if (lastWatched) {
            const ep = lastWatched as LastWatchedEpisode
            const targetPath = `${basePrefix}/episodes/${movieId}/episode-${ep.episodeId.number}`
            return navigateTo(targetPath)
        }

        // Default redirect to first episode
        const defaultPath = `${basePrefix}/episodes/${movieId}/episode-1`
        return navigateTo(defaultPath)

    } catch (error) {
        console.error('Middleware error:', error)
        // In case of error, redirect to episode 1
        const fallbackPath = `/episodes/${to.params.movieId}/episode-1`
        console.log('Error occurred - falling back to:', fallbackPath)
        return navigateTo(fallbackPath)
    }
})
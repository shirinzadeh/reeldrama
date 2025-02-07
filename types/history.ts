// types/history.ts
export interface HistoryMovieData {
    _id: string
    title: {
      en: string
      tr?: string
      ar?: string
    }
    thumbnail: string
    totalEpisodes: number
  }
  
  export interface HistoryEpisodeData {
    _id: string
    number: number
  }
  
  export interface History {
    userId?: string
    movie: HistoryMovieData
    episode: HistoryEpisodeData
    progress: number
    deviceId: string
    watchedAt: Date
    createdAt: Date
    updatedAt: Date
  }
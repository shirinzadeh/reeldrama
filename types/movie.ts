interface TranslatedField {
    en: string
    tr?: string
    ar?: string
  }
  
  export interface Movie {
    title: TranslatedField
    description: TranslatedField
    tags: string[]
    category: string
    thumbnail: string
    banner: string
    releaseDate: Date
    isFeatured: boolean
    totalEpisodes: number
    freeEpisodes: number
    createdAt: Date
    updatedAt: Date
  }
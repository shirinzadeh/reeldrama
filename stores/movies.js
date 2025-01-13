export const useMovieStore = defineStore('movieStore', () => {
  const { fetch } = useApi();

  // State
  const movies = ref([]);
  const movieDetail = ref(null);

  // Computed
  const featuredMovies = computed(() => movies.value.filter(movie => movie.isFeatured));
  const getRelatedMovies = computed(() => {
    if (!movieDetail.value) return [];
    return movies.value.filter(movie => 
      movie._id !== movieDetail.value._id && (
        movie.category === movieDetail.value.category ||
        movie.tags.some(tag => movieDetail.value.tags.includes(tag))
      )
    ).slice(0, 8);
  });
  const getRecommendedMovies = computed(() => {
    return movies.value
      .filter(movie => movie.rating >= 4) // Filter movies with high ratings
      .sort(() => Math.random() - 0.5) // Randomize the order
      .slice(0, 8); // Get first 8 movies
  })

  // Actions
  const fetchMovies = async () => {
    const { data, error } = await fetch('/movies');
    if (error) {
      console.error('Error fetching movies:', error);
      return;
    }
    movies.value = data.data || [];
  };

  const fetchMovieDetail = async (movieId) => {
    const { data } = await fetch(`/movies/${movieId}`);
    if (data) {
      movieDetail.value = data.data;
    }
  };

  const getMoviesByCategory = (categorySlug) => {
    return movies.value.filter(movie => movie.category === categorySlug);
  };

  return {
    // State
    movies,
    movieDetail,

    // Computed
    featuredMovies,
    getRelatedMovies,
    getRecommendedMovies,
    // Actions
    fetchMovies,
    fetchMovieDetail,
    getMoviesByCategory,
  };
});

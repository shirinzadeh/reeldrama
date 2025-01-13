export const useCategoryStore = defineStore('categoryStore', () => {
  const { fetch } = useApi()

  // State
  const categories = ref([])

  // Actions
  const fetchCategories = async () => {
      const { data, error } = await fetch('/categories')
      if (error) {
        console.error('Error fetching categories:', error)
        return
      }
      categories.value = data.data || []
   
  }

  return {
    // State
    categories,

    // Actions
    fetchCategories,
  }
})

export const useLazyLoad = () => {
  const observer = ref<IntersectionObserver | null>(null)

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          observer.value?.unobserve(img)
        }
      })
    })
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    observe: (el: HTMLElement) => observer.value?.observe(el)
  }
}

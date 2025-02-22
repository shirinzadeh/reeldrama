const activeDropdownId = ref<string | null>(null)

export const useDropdownState = () => {
  const closeOtherDropdowns = (currentId: string) => {
    if (activeDropdownId.value && activeDropdownId.value !== currentId) {
      // Emit event to close other dropdowns
      window.dispatchEvent(new CustomEvent('close-other-dropdowns', {
        detail: { exceptId: currentId }
      }))
    }
    activeDropdownId.value = currentId
  }

  const clearActiveDropdown = (currentId: string) => {
    if (activeDropdownId.value === currentId) {
      activeDropdownId.value = null
    }
  }

  return {
    closeOtherDropdowns,
    clearActiveDropdown
  }
}

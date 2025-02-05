// stores/package.ts
import { defineStore } from 'pinia'
import type { Package, PackageResponse } from '~/types/package'

interface PackageState {
    packages: Package[]
    selectedPackage: Package | null
    loading: boolean
    error: string | null
}

export const usePackageStore = defineStore('packageStore', () => {
    const state = reactive<PackageState>({
        packages: [],
        selectedPackage: null,
        loading: false,
        error: null
    })

    const newUserPackage = computed(() =>
        state.packages.find(pkg => pkg.isNewUserOnly)
    )

    const regularPackages = computed(() =>
        state.packages.filter(pkg => !pkg.isNewUserOnly)
    )

    async function fetchPackages() {
        const api = useApi()
        state.loading = true
        state.error = null

        const { data: resData, error } = await api.asyncData('packages', '/packages')

        const data = resData as { value: PackageResponse }

        if (data.value?.success) {
            state.packages = data.value.data
            // Set default selected package
            state.selectedPackage = newUserPackage.value || state.packages[0] || null
        } else {
            state.error = error.value?.message || 'Failed to fetch packages'
        }
    }

    function setSelectedPackage(packageId: string) {
        state.selectedPackage = state.packages.find(pkg => pkg._id === packageId) || null
    }

    return {
        // State
        packages: computed(() => state.packages),
        selectedPackage: computed(() => state.selectedPackage),
        loading: computed(() => state.loading),
        error: computed(() => state.error),

        // Computed
        newUserPackage,
        regularPackages,

        // Actions
        fetchPackages,
        setSelectedPackage
    }
})
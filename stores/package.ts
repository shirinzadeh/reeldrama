interface Package {
    _id: string
    id: number
    coins: number
    bonus: number
    bonusPercentage: number
    price: number
    isNewUserOnly?: boolean
    isActive: boolean
}

interface ApiResponse { 
    success: boolean; 
    data: Package[] 
}

export const usePackageStore = defineStore('packageStore', () => {
    const packages = ref<Package[]>([])
    const selectedPackage = ref<Package | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const newUserPackage = computed(() =>
        packages.value.find(pkg => pkg.isNewUserOnly)
    )

    async function fetchPackages() {
        const api = useApi()
        loading.value = true
        error.value = null

        const { data } = await api.asyncData('packages', '/packages')
        const resData = data.value as ApiResponse;

        if (resData.success) {
            packages.value = resData.data as Package[]
            // Set default selected package to new user package if available
            selectedPackage.value = newUserPackage.value || packages.value[0] || null
        }
    }

    function setSelectedPackage(packageId: string) {
        selectedPackage.value = packages.value.find(pkg => pkg._id === packageId) || null
    }

    const regularPackages = computed(() => packages.value.filter(pkg => !pkg.isNewUserOnly))

    return {
        packages,
        selectedPackage,
        loading,
        error,
        newUserPackage,
        regularPackages,
        fetchPackages,
        setSelectedPackage
    }
})
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { status, data: session, signIn, signOut } = useAuth()
  const loading = ref(false)
  const showLoginModal = ref(false)
  const showRegisterModal = ref(false)

  const isAuthenticated = computed(() => status.value === 'authenticated')
  const user = computed(() => session.value?.user)
  
  async function handleLogin(email, password) {
    loading.value = true
    try {
      const response = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
        redirect: false
      })

      console.log('login response', response)

      if (response?.error) {
        return { 
          success: false, 
          error: response.error
        }
      }

      showLoginModal.value = false
      return { 
        success: true,
        message: 'Login successful'
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  const api = useApi()
  async function handleRegister(userData) {
    loading.value = true
    try {
      const response = await api.post('/auth/register', {
        body: userData
      })
      
      if (response.success) {
        const loginResponse = await signIn('credentials', {
          email: userData.email,
          password: userData.password,
          callbackUrl: '/',
          redirect: false
        })

        if (loginResponse?.error) {
          return {
            success: false,
            error: 'Registration successful but login failed'
          }
        }

        showRegisterModal.value = false
        return {
          success: true,
          message: response.message
        }
      }
      
      return {
        success: false,
        error: response.error
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'An unexpected error occurred'
      }
    } finally {
      loading.value = false
    }
  }

  // Add function to close all modals
  function closeAllModals() {
    showLoginModal.value = false
    showRegisterModal.value = false
  }

  return {
    user,
    loading: readonly(loading),
    isAuthenticated,
    showLoginModal,
    handleLogin,
    signOut,
    showRegisterModal,
    handleRegister,
    closeAllModals
  }
})


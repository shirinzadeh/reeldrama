// stores/auth.ts
import { defineStore } from 'pinia'
import type { UserProfile } from '~/types/user'

interface AuthState {
  loading: boolean
  showLoginModal: boolean
  showRegisterModal: boolean
}

interface LoginResponse {
  success: boolean
  message?: string
  error?: string
}

interface RegisterData {
  email: string
  password: string
  [key: string]: any
}

export const useAuthStore = defineStore('auth', () => {
  const { status, data: session, signIn, signOut } = useAuth()
  const state = reactive<AuthState>({
    loading: false,
    showLoginModal: false,
    showRegisterModal: false
  })

  const isAuthenticated = computed(() => status.value === 'authenticated')
  const user = computed(() => session.value?.user ?? null)

  async function handleLogin(
    email: string, 
    password: string
  ): Promise<LoginResponse> {
    state.loading = true
    
    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (response?.error) {
        return { 
          success: false, 
          error: response.error
        }
      }

      await refreshNuxtData()
      state.showLoginModal = false
      
      return { 
        success: true,
        message: 'Login successful'
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }
    } finally {
      state.loading = false
    }
  }

  async function handleRegister(userData: RegisterData): Promise<LoginResponse> {
    state.loading = true
    const api = useApi()
    
    try {
      const res = await api.post('/auth/register', {
        body: userData
      })

      const response = res as LoginResponse
      
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

        state.showRegisterModal = false
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
      state.loading = false
    }
  }

  function closeAllModals() {
    state.showLoginModal = false
    state.showRegisterModal = false
  }

  return {
    user,
    loading: computed(() => state.loading),
    isAuthenticated,
    showLoginModal: toRef(state, 'showLoginModal'),
    showRegisterModal: toRef(state, 'showRegisterModal'),
    handleLogin,
    handleRegister,
    signOut,
    closeAllModals
  }
})
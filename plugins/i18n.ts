// plugins/i18n.ts
import type { Language } from '~/types/language'

export default defineNuxtPlugin(async (nuxtApp) => {
    try {
      const api = useApi()
      // Fetch languages from API
      const response = await api.get('/languages')

      console.log('lang response', response)

      if (!response || typeof response !== 'object') {
        throw new Error('Invalid language API response')
      }

      const languages = response as Language[]
      
      // Store languages in state for global access
      useState<Language[]>('languages', () => languages)
  
      // Get default language
      
      // Get i18n instance
      const { $i18n } = nuxtApp
      const i18n = $i18n as { locale: { value: string }, setLocale: (lang: string) => Promise<void> }
  
      const route = useRoute()
      const langCode = (route.params.lang as string) || 'en'
      
      if (i18n && !i18n.locale.value) {
        await i18n.setLocale(langCode)
      }
    } catch (error) {
      console.error('Error initializing i18n:', error)
    }
  })
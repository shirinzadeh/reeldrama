import { useI18n } from 'vue-i18n'

export const useFormattedDate = () => {
  const { locale } = useI18n()

  const localeMap = {
    'en': 'en-US',
    'tr': 'tr-TR',
    'ar': 'ar-SA'
  }

  const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) => {
    if (!date) return ''

    const dateLocale = localeMap[locale.value] || locale.value

    try {
      return new Date(date).toLocaleDateString(dateLocale, options)
    } catch (error) {
      console.error('Date formatting error:', error)
      return new Date(date).toLocaleDateString('en-US', options)
    }
  }

  const formatRelativeDate = (date: string | Date) => {
    const now = new Date()
    const targetDate = new Date(date)
    const diffInDays = Math.floor((now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays < 1) return 'today'
    if (diffInDays < 2) return 'yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    
    return formatDate(date)
  }

  return {
    formatDate,
    formatRelativeDate
  }
}

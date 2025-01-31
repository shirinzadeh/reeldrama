export interface Language {
  code: LocaleCode
  name: string
  native: string
  isActive: boolean
  isDefault: boolean
}

export type LocaleCode = 'en' | 'tr'

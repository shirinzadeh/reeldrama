// types/package.ts
export interface Package {
    _id: string
    id: number
    coins: number
    bonus: number
    bonusPercentage: number
    price: number
    isNewUserOnly: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
  }
  
  export interface PackageResponse {
    success: boolean
    data: Package[]
    message?: string
  }
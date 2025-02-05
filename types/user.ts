// types/user.ts
export interface User {
    email: string
    password: string
    coins: number
    bonus: number
    createdAt: Date
    updatedAt: Date
  }
  
  export interface UserProfile {
    id: string
    email: string
    coins: number
    bonus: number
  }
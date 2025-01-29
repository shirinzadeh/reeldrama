import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

interface UserData {
    id: string
    email: string
    coins: number
    bonus: number
}

interface ApiResponse {
    success: boolean
    data?: UserData
}

interface SessionData {
    id: string;
    email?: string | null;
    coins: number;
    bonus: number;
}

export const useUserStore = defineStore('user', () => {
    const { data: session } = useAuth()
   
    const user = computed(() => {
        if (session.value?.user) {
            const userData = session.value.user as SessionData;
            return {
                id: userData.id,
                email: userData.email,
                coins: userData.coins ?? 0,
                bonus: userData.bonus ?? 0,
            };
        }
        return null;
    });
    return { user }
})

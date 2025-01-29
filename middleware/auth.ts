// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()

    // Define public routes that don't require authentication
    const publicRoutes = ['/login', '/register']

    if (!publicRoutes.includes(to.path) && status.value === 'unauthenticated') {
        return navigateTo('/login')
    }
})
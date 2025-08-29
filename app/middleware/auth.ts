export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore();
    if (!userStore.loggedIn && to.path !== '/login' && !to.path.startsWith('/auth/')) {
        return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
})
// composables/useAuth.ts

export function useAuth() {
    const config = useRuntimeConfig()
    const { $api } = useNuxtApp()
    const userStore = useUserStore()

    async function fetchUser() {
        const response: APIResponse<User> = await $api('/user')
        if (response.error) {
            console.error('Error fetching user:', response.error)
            return null
        }
        userStore.setUser(response.data)
        return response.data;
    }

    // Send user to your API's Discord redirect endpoint
    function login(redirect?: string) {
        const url = new URL(`${import.meta.dev ? config.public.apiBaseDev : config.public.apiBase}/auth/redirect`)
        if (redirect) url.searchParams.set('redirect', redirect) // optional
        window.location.href = url.toString()
    }

    function finishLoginWithToken(rawToken: string) {
        userStore.setToken(rawToken)
        return fetchUser()
    }

    function logout() {
        userStore.clearToken();
        userStore.clearUser();
        navigateTo('/')
    }

    return { login, finishLoginWithToken, logout }
}

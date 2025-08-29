// plugins/api.ts
export default defineNuxtPlugin(() => {
    const cfg = useRuntimeConfig()
    const userStore = useUserStore()

    const api = $fetch.create({
        baseURL: import.meta.dev ? cfg.public.apiBaseDev : cfg.public.apiBase,
        onRequest({ options }) {
            const headers = new Headers(options.headers) // normalize to Headers API
            if (userStore.token) {
                headers.set('Authorization', `Bearer ${userStore.token}`)
            }
            options.headers = headers
        }
    })

    return { provide: { api } }
});

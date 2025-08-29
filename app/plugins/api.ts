// plugins/api.ts
export default defineNuxtPlugin(() => {
    const cfg = useRuntimeConfig()
    const userStore = useUserStore()
    const token = userStore.token;

    const api = $fetch.create({
        baseURL: import.meta.dev ? cfg.public.apiBaseDev : cfg.public.apiBase,
        onRequest({ options }) {
            const headers = new Headers(options.headers) // normalize to Headers API
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            options.headers = headers
        }
    })

    return { provide: { api } }
});

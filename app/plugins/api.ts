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
				headers.set('Accept', 'application/json')
            }
            options.headers = headers
        },
		async onResponseError({response}) {
			if(response.status === 401) {
				userStore.clearToken();
				userStore.clearUser();
				console.error('Unauthorized')
			}
		}
    })

    return { provide: { api } }
});

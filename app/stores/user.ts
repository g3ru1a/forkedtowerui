// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | User,
        token: null as null | string,
    }),
    getters: {
        loggedIn: (s) => !!s.token
    },
    actions: {
        setToken(t: string) {
            this.token = t;
        },
        clearToken() {
            this.token = null;
        },
        setUser(u: User) {
            this.user = u;
        },
        clearUser() {
            this.user = null;
        }
    },
    persist: {
        storage: piniaPluginPersistedstate.cookies(),
    },
})

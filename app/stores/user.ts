// stores/user.ts
import { defineStore } from 'pinia'
import type {DBCharacter} from "#shared/types/models";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | User,
		characters: [] as DBCharacter[],
        token: null as null | string,
    }),
    getters: {
        loggedIn: (s) => !!s.token
    },
    actions: {
		setCharacters(c: DBCharacter[]) {
			this.characters = c
		},
		clearCharacters() {
			this.characters = []
		},
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

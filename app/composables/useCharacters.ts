// composables/useAuth.ts

import type {DBCharacter, Group} from "#shared/types/models";
import {until} from "@vueuse/core";

export function useCharacters() {
	const userStore = useUserStore()

	async function getCharacters(force = false): Promise<DBCharacter[] | null> {
		if(userStore.characters.length > 0 && !force) return userStore.characters;

		const {data, status, error, refresh } = await useAPI<APIResponse<DBCharacter[]>>('/characters', {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value || !data.value) return null
		userStore.setCharacters(data.value.data)
		return data.value.data;
	}

	return { getCharacters };
}

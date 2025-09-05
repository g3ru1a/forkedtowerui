// composables/useAuth.ts

import type {DBCharacter} from "#shared/types/models";

export function useCharacters() {
	const { $api } = useNuxtApp()
	const userStore = useUserStore()

	async function getCharacters(refresh = false): Promise<DBCharacter[] | null> {
		if(userStore.characters.length > 0 && !refresh) return userStore.characters;

		const response: APIResponse<DBCharacter[]> = await $api('/characters')
		if (response.error) {
			console.error('Error fetching characters:', response.error)
			return null
		}
		userStore.setCharacters(response.data)
		return response.data;
	}

	return { getCharacters };
}

// composables/useAuth.ts
import { until } from '@vueuse/core'
import type {RunType} from "#shared/types/models";

export function useRunTypes() {
	const types = useState('types', () => [] as RunType[]);

	async function getTypes(force = false): Promise<RunType[] | null> {
		if (types.value.length > 0 && !force) return types.value;
		const {data, status, error, refresh} = await useAPI<APIResponse<RunType[]>>('/schedules/types', {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value || data.value == undefined) return null
		types.value = data.value.data;
		return data.value?.data ?? null
	}

	return { getTypes };
}

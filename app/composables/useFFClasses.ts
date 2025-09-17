// composables/useAuth.ts
import { until } from '@vueuse/core'
import type {FFClass} from "#shared/types/models";

export function useFFClasses() {
	const ffclasses = useState('ffclasses', () => [] as FFClass[]);

	async function getFFClasses(force = false): Promise<FFClass[] | null> {
		if (ffclasses.value.length > 0 && !force) return ffclasses.value;
		const {data, status, error, refresh} = await useAPI<APIResponse<FFClass[]>>('/classes', {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value || data.value == undefined) return null
		ffclasses.value = data.value.data;
		return data.value?.data ?? null
	}

	return { getFFClasses };
}

// composables/useAuth.ts
import { until } from '@vueuse/core'
import type {Fight} from "#shared/types/models";

export function useFights() {
	const fights = useState('fights', () => [] as Fight[]);

	async function getFights(force = false): Promise<Fight[] | null> {
		if (fights.value.length > 0 && !force) return fights.value;
		const {data, status, error, refresh} = await useAPI<APIResponse<Fight[]>>('/fights', {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value || data.value == undefined) return null
		fights.value = data.value.data;
		return data.value?.data ?? null
	}

	return { getFights };
}

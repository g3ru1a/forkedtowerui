// composables/useAuth.ts
import { until } from '@vueuse/core'
import type {Group, Schedule} from "#shared/types/models";

export function useSchedules() {
	const userStore = useUserStore();
	const route = useRoute();
	const groupID = computed(() => route.params.group_id as string);
	const schedules = useState('schedules', () => [] as Schedule[]);

	async function createSchedule(date: string, time: string, description: string, type: RunType, registration_open = false, registration_deadline: string | null = null): Promise<Schedule | null>{
		const {data, status, error } = await useAPI<APIResponse<Schedule>>('/schedules', {
			method: 'post',
			body: {
				data: date,
				time: time,
				description: description,
				registration_open: registration_open,
				registration_deadline: registration_deadline,
				host_id: userStore.user!.id,
				group_id: groupID.value,
				type_id: type.id
			}
		});
		if(status.value === 'success' && data.value){
			console.log(data)
			return data.value.data;
		}else{
			console.error(error);
			return null
		}
	}

	async function getSchedules(page: number = 0, size: number = 10, force = false): Promise<Schedule[] | null> {
		if (schedules.value.length > 0 && !force) return schedules.value;
		const path = `/groups/${groupID.value}/schedules?current_page=${page}&per_page=${size}`;
		const {data, status, error, refresh} = await useAPI<APIResponse<Schedule[]>>(path, {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value || data.value == undefined) return null
		schedules.value = data.value.data;
		return data.value?.data ?? null
	}

	return { getSchedules, createSchedule };
}

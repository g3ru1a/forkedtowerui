// composables/useAuth.ts
import { until } from '@vueuse/core'
import type {Group} from "#shared/types/models";

export function useGroups() {
	const userStore = useUserStore();

	const create_group_shape = ref<Group>({
		id: '',
		name: '',
		color: '#f1f1f1f1',
		gradient: '#f1f1f1f1',
		badge_text: '',
		private_path: '',
		owner: userStore.user!
	});

	async function createGroup(group: Group): Promise<Group | null>{
		const {data, status, error } = await useAPI<APIResponse<Group>>('/groups', {
			method: 'post',
			body: {
				...group,
				owner: userStore.user!
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

	async function getGroups(): Promise<Group[] | null> {
		const {data, status, error, refresh } = await useAPI<APIResponse<Group[]>>('/groups', {
			server: false,
			immediate: true
		});
		// console.log(status.value, data.value, error.value)
		if (status.value === 'idle') await refresh()            // start the request
		await until(status).not.toBe('idle')                    // or .not.toBe('pending')

		if (error.value) return null
		return data.value?.data ?? null
	}

	return { create_group_shape, createGroup, getGroups };
}

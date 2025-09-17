// It will be available as useFoo() (camelCase of file name without extension)
import useParseApiError from "~/composables/useParseApiError";

export default function () {
	const {$api} = useNuxtApp();
	// const baseUrl: string = '/schedules';

	const all = async (groupID: string, page: number = 0, size: number = 10): Promise<Result<Schedule[]>> => {
		try{
			const {data} = await $api<APIResponse<Schedule[]>>(`/groups/${groupID}/schedules?current_page=${page}&per_page=${size}`)
			return {
				success: true,
				code: 200,
				data: data,
				message: 'Success'
			}
		}catch(err){
			return useParseApiError<Schedule[]>(err);
		}
	}

	const create = async (payload: Partial<Schedule>): Promise<Result<Schedule>> => {
		try{
			const {data} = await $api<APIResponse<Schedule>>(`/schedules`, {
				method: 'POST',
				body: payload
			})
			return {
				success: true,
				code: 200,
				data: data,
				message: 'Success'
			}
		}catch (err){
			return useParseApiError<Schedule>(err);
		}
	}

	return {
		all,
		create
	}
}

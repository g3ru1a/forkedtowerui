// It will be available as useFoo() (camelCase of file name without extension)
import useParseApiError from "~/composables/useParseApiError";
import type {ScheduleSummary} from "#shared/types/models";

export default function () {
	const {$api} = useNuxtApp();
	// const baseUrl: string = '/schedules';

	const all = async (groupID: string, page: number = 0, size: number = 10): Promise<Result<Schedule[]>> => {
		try{
			const {data} = await $api<APIResponse<Schedule[]>>(`/schedules/groups/${groupID}?current_page=${page}&per_page=${size}`)
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

	const summary = async (groupID: string): Promise<Result<ScheduleSummary>> => {
		try{
			const {data} = await $api<APIResponse<ScheduleSummary>>(`/schedules/groups/${groupID}/summary`)
			return {
				success: true,
				code: 200,
				data: data,
				message: 'Success'
			}
		}catch(err){
			return useParseApiError<ScheduleSummary>(err);
		}
	}

	const next = async (groupID: string): Promise<Result<Schedule>> => {
		try {
			const {data} = await $api<APIResponse<Schedule>>(`/schedules/groups/${groupID}/next`)
			return {
				success: true,
				code: 200,
				data: data,
				message: 'Success'
			}
		} catch (err) {
			return useParseApiError<Schedule>(err);
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
		create,
		summary,
		next,
	}
}

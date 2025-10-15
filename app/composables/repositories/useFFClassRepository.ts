// It will be available as useFoo() (camelCase of file name without extension)
import useParseApiError from "~/composables/useParseApiError";
import type {FFClass} from "#shared/types/static";

export default function () {
	const {$api} = useNuxtApp();

	const all = async (): Promise<Result<FFClass[]>> => {
		try{
			const {data} = await $api<APIResponse<FFClass[]>>(`/classes`)
			return {
				success: true,
				data: data,
			}
		}catch(err){
			return useParseApiError<FFClass[]>(err);
		}
	}

	return {
		all,
	}
}

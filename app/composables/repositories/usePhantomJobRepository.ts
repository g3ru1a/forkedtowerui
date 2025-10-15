// It will be available as useFoo() (camelCase of file name without extension)
import useParseApiError from "~/composables/useParseApiError";
import type {PhantomJob} from "#shared/types/static";

export default function () {
	const {$api} = useNuxtApp();

	const all = async (): Promise<Result<PhantomJob[]>> => {
		try{
			const {data} = await $api<APIResponse<PhantomJob[]>>(`/phantomjobs`)
			return {
				success: true,
				data: data,
			}
		}catch(err){
			return useParseApiError<PhantomJob[]>(err);
		}
	}

	return {
		all,
	}
}

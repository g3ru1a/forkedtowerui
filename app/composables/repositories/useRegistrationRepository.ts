// It will be available as useFoo() (camelCase of file name without extension)
import useParseApiError from "~/composables/useParseApiError";
import type {RegistrationPayload, RegistrationResponse} from "#shared/types/registration";

export default function () {
	const {$api} = useNuxtApp();

	const create = async (payload: RegistrationPayload): Promise<Result<RegistrationResponse>> => {
		try{
			const {data} = await $api<APIResponse<RegistrationResponse>>(`/registrations`, {
				method: 'POST',
				body: payload
			})
			return {
				success: true,
				data: data,
			}
		}catch(err){
			return useParseApiError<RegistrationResponse>(err);
		}
	}

	return {
		create,
	}
}

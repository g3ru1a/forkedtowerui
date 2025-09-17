import type {APIError} from "#shared/types/models";

function isAPIError(error: unknown): error is APIError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'data' in error &&
		typeof (error as any).data === 'object'
	)
}

export default function <T>(error: unknown): Result<T> {

	let message = 'Unknown error';
	let code = 500;

	if (typeof error === 'object' && error !== null && 'message' in error) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		message = String((error as any).message)
	}

	if (typeof error === 'object' && error !== null && 'status' in error) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		code = Number((error as any).status)
	}

	if (typeof error === 'object' && error !== null && 'data' in error) {
		if(isAPIError(error)){
			// Laravel-style: errors is a Record<string, string[]>
			const validationErrors = error.data.errors as Record<string, string[]>

			message = Object.values(validationErrors)
				.flat()
				.join(', ')
		}
	}

	return {
		success: false,
		message,
		code: code,
		data: undefined,
	}
}

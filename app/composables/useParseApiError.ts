/* eslint-disable  @typescript-eslint/no-explicit-any */
import type { FetchError } from 'ofetch'
import type { Result } from '#shared/types/common'

type ErrorShape = {
	message?: string
	errors?: Record<string, string[]>
}

// Runtime-safe FetchError guard
function isFetchError<T = unknown>(error: unknown): error is FetchError<T> {
	return (
		typeof error === 'object'
		&& error !== null
		&& 'status' in error
		&& typeof (error as any).status === 'number'
		&& 'data' in error
	)
}

// Robust, type-safe universal error parser
export default function parseError<T = unknown>(error: unknown): Result<T> {
	let code = 500
	let message = 'Unknown error'
	let errors: Record<string, string[]> | undefined

	if (isFetchError(error)) {
		code = error.status!
		const data = error.data as ErrorShape

		// Laravel-style validation
		if (code === 422 && data?.errors) {
			errors = data.errors
			message = Object.values(data.errors).flat().join(', ')
		} else {
			message = data?.message ?? error.statusMessage ?? 'An error occurred'
		}
	}

	else if (error instanceof Error) {
		message = error.message
	}

	else if (typeof error === 'object' && error !== null) {
		if ('message' in error && typeof (error as any).message === 'string') {
			message = (error as any).message
		}

		if ('status' in error && typeof (error as any).status === 'number') {
			code = (error as any).status
		}

		if ('data' in error && typeof (error as any).data === 'object') {
			const data = (error as any).data as ErrorShape
			if (data?.errors) {
				errors = data.errors
				message = Object.values(data.errors).flat().join(', ')
			} else if (data?.message) {
				message = data.message
			}
		}
	}

	return {
		success: false,
		message,
		code,
		...(errors && { errors })
	}
}

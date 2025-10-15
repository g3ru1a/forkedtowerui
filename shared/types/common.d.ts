export type Result<T> =
	| { success: true; data: T }
	| { success: false; message: string; code: number; errors?: Record<string, string[]> }

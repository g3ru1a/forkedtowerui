export interface APIResponse<T> {
    data: T
    error?: string
	meta?: PaginationMeta
	links?: PaginationLinks
}

export interface PaginationMeta {
	path: string | null
	current_page: number
	from: number | null
	to: number | null
	per_page: number
	last_page: number
	total: number
	links: {
		url: string | null
		label: string
		active: boolean
	}
}

export interface PaginationLinks {
	first: string | null
	last: string | null
	prev: string | null
	next: string | null
}

export interface User {
    id: string
    username: string
    avatar_url: string,
    handle: string,
    email: string,
    discord_id: string,
    bot_notifications: boolean,
	characters?: DBCharacter[]
}

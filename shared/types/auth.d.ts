export interface APIResponse<T> {
    data: T
    error?: string
}

export interface User {
    id: string
    username: string
    avatar_url: string,
    handle: string,
    email: string,
    discord_id: string,
    bot_notifications: boolean
}

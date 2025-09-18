export interface Result<T> {
	success: boolean
	code?: number
	data?: T
	message?: string
	fromCache?: boolean
}

export interface APIError {
	data: {
		message?: string
		errors?: Record<string, string[]>
	}
}


export interface DBCharacter {
	id: string
	name: string
	avatar_url: string,
	datacenter: string,
	world: string,
	lodestone_id: string,
	occult_data: object,
	phantom_jobs: object[],
	verification_code: string,
	verified: boolean,
}

export interface CharacterVerification {
	character_id: string
	status: boolean
}

export interface Group {
	id: string,
	owner: User,
	name: string,
	color: string,
	badge_text: string,
	gradient?: string,
	discord_invite?: string,
	private_path: string,
	members?: User[]
}

export interface RunType {
	id: string,
	name: string,
	color_hex: string,
}

export interface Fight {
	id: string,
	name: string,
	description: string,
	min_players: number,
	max_players: number,
}

export interface FFClass {
	id: string,
	name: string,
	icon_url: string,
	flat_icon_url: string,
	type: string
}

export interface Seat {
	id: string,
	schedule: Schedule,
	number: number,
	character: DBCharacter | null,
	registration: object | null,
	class: FFClass | null,
	phantom_job: object | null,
	is_raidlead: boolean,
	is_helper: boolean,
}

export interface Schedule {
	id: string,
	description: string,
	time: string,
	date: string,
	public: boolean,
	is_public: boolean,
	require_registration: boolean,
	duration_hours: number,
	seat_count: number,
	host?: DBCharacter,
	group?: Group,
	type?: RunType
	fight?: Fight,
	host_id?: string,
	group_id?: string,
	type_id?: string,
	fight_id?: string,
}
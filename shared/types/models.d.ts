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

export interface Schedule {
	id: string,
	description: string,
	time: string,
	date: string,
	public: boolean,
	registration_open: boolean,
	registration_deadline: string,
	slots: number,
	host: User,
	group: Group,
	type: RunType
}
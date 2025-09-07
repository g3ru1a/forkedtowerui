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
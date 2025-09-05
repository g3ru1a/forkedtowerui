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
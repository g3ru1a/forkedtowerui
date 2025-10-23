export type RegistrationPayload = {
	schedule_id: string,
	schedule_secret?: string,
	character_id: string,
	preferred_class_id: string,
	preferred_job_id: string,
	flex_classes?: string[],
	flex_jobs?: string[],
	can_solo_heal: boolean,
	can_english: boolean,
	can_markers: boolean,
	notes?: string
}

export type RegistrationResponse = {
	id: string,
	schedule: Schedule,
	user: User,
	character: DBCharacter,
	preferred_class: FFClass,
	preferred_job: PhantomJob,
	flex_classes: FFClass[],
	flex_jobs: PhantomJob[],
	can_solo_heal: boolean,
	can_english: boolean,
	can_markers: boolean,
	notes?: string,
	created_at: string,
	updated_at: string,
}
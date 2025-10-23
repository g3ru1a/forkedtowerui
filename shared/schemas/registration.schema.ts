import * as z from 'zod'

export const registrationSchemaZod = z.object({
	character_uuid: z.string().uuid({
		message: 'Please select a character.'
	}),
	preferred_class: z.string().min(1, {
		message: 'Please select a class.'
	}),
	preferred_phantom_job: z.string().min(1, {
		message: 'Please select a phantom job.'
	}),
	alternative_classes: z.array(z.string()).optional(),
	alternative_phantom_jobs: z.array(z.string()).optional(),
	can_solo_heal: z.boolean(),
	can_english: z.boolean(),
	can_place_markers: z.boolean(),
	notes: z.string().max(1000).optional()
})

export type RegistrationSchema = z.output<typeof registrationSchemaZod>
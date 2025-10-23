// composables/useAuth.ts
import type {RegistrationPayload, RegistrationResponse} from "#shared/types/registration";
import type {RegistrationSchema} from "#shared/schemas/registration.schema";
import useRegistrationRepository from "~/composables/repositories/useRegistrationRepository";

export function useRegistrations() {
	const repo = useRegistrationRepository()

	const mapToPayload = (data: RegistrationSchema, schedule_id: string, schedule_secret?: string): RegistrationPayload =>  {
		return {
			schedule_id: schedule_id,
			schedule_secret: schedule_secret,
			character_id: data.character_uuid,
			preferred_class_id: data.preferred_class,
			preferred_job_id: data.preferred_phantom_job,
			flex_classes: data.alternative_classes,
			flex_jobs: data.alternative_phantom_jobs,
			can_solo_heal: data.can_solo_heal,
			can_english: data.can_english,
			can_markers: data.can_place_markers,
			notes: data.notes
		}
	}

	const create = async (payload: RegistrationPayload): Promise<Result<RegistrationResponse>> => {
		return await repo.create(payload);
	}

	return { mapToPayload, create };
}

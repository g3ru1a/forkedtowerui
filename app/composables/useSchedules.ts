// composables/useAuth.ts
import type {Schedule, ScheduleSummary} from "#shared/types/models";
import useScheduleRepository from "~/composables/repositories/useScheduleRepository";

export function useSchedules() {
	const route = useRoute();
	const groupID = computed(() => route.params.group_id as string);

	const scheduleRepo = useScheduleRepository();
	const schedules = useState('schedules', () => [] as Schedule[]);

	async function createSchedule(payload: Partial<Schedule>): Promise<Result<Schedule>>{
		payload = {
			...payload,
			group_id: groupID.value,
			public: payload.is_public
		}
		const result = await scheduleRepo.create(payload);
		if(result.success && result.data != undefined) {
			schedules.value.push(result.data);
			return result;
		}else{
			return result;
		}
	}

	async function getSchedules(force = false, page: number = 0, size: number = 10): Promise<Result<Schedule[]>> {
		if(!schedules.value || schedules.value.length == 0 || force) {
			const result: Result<Schedule[]> = await scheduleRepo.all(groupID.value, page, size);
			if(result.success && result.data != undefined) {
				schedules.value = result.data;
				return result;
			}else{
				return result;
			}
		}else return {
			success: true,
			data: schedules.value,
			fromCache: true,
		}
	}

	async function getScheduleSummary(): Promise<Result<ScheduleSummary>> {
		return scheduleRepo.summary(groupID.value);
	}

	async function getNextSchedule(): Promise<Result<Schedule>> {
		return scheduleRepo.next(groupID.value);
	}

	return { schedules, getSchedules, createSchedule, getNextSchedule, getScheduleSummary };
}

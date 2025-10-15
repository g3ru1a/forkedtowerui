// composables/useAuth.ts
import type {FFClass} from "#shared/types/static";
import useFFClassRepository from "~/composables/repositories/useFFClassRepository";

export function useFFClasses() {
	const repo = useFFClassRepository()
	const classes = useState('ffclasses', () => [] as FFClass[]);

	async function getFFClasses(force = false): Promise<Result<FFClass[]>> {
		if (classes.value.length > 0 && !force){
			return {
				success: true,
				data: classes.value
			}
		}
		const result = await repo.all();
		if (result.success) {
			classes.value = result.data;
			return result;
		}
		return result;
	}

	return { getFFClasses };
}

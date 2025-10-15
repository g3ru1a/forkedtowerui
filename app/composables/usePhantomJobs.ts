// composables/useAuth.ts
import type {PhantomJob} from "#shared/types/static";
import usePhantomJobRepository from "~/composables/repositories/usePhantomJobRepository";

export function usePhantomJobs() {
	const repo = usePhantomJobRepository()
	const phantomjobs = useState('phantomjobs', () => [] as PhantomJob[]);

	async function getPhantomJobs(force = false): Promise<Result<PhantomJob[]>> {
		if (phantomjobs.value.length > 0 && !force){
			return {
				success: true,
				data: phantomjobs.value
			}
		}
		const result = await repo.all();
		if (result.success) {
			phantomjobs.value = result.data;
			return result;
		}
		return result;
	}

	return { getPhantomJobs };
}

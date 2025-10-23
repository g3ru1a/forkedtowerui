<script setup lang="ts">
import type { SelectMenuItem } from '@nuxt/ui'

const value = defineModel<Schedule | null>() // full schedule object
const {block = false} = defineProps<{
	block?: boolean;
}>();

const route = useRoute()
const router = useRouter()
const scheduleID = computed(() => route.query.schedule as string | undefined)
const loading = ref<boolean>(true);

const { getSchedules } = useSchedules()
const schedules = ref<Schedule[]>([])

function formatDateTime(dateISO: string, timeISO: string): string {
	try {
		const datePart = new Date(dateISO).toISOString().split('T')[0]
		const timePart = new Date(timeISO).toISOString().split('T')[1]?.split('.')[0] ?? '00:00:00'
		const combined = `${datePart}T${timePart}Z`
		const mergedDate = new Date(combined)

		const time = mergedDate.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})

		const fullDate = mergedDate.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		})

		return `${time} ST, ${fullDate}`
	} catch (error) {
		console.error('Failed to format date/time:', error)
		return 'Invalid date'
	}
}

const items = computed<SelectMenuItem[]>(() =>
	schedules.value.map((schedule): SelectMenuItem => ({
		label: formatDateTime(schedule.date, schedule.time),
		id: schedule.id,
	}))
)
const selected: Ref<SelectMenuItem | null> = ref(null);

onMounted(async () => {
	const result = await getSchedules()
	schedules.value = result.success ? result.data : []

	if (scheduleID.value) {
		// console.log(items.value[0]!.id);
		const sched: Schedule | undefined = schedules.value.find((s) => s.id === scheduleID.value);
		if (!sched) return router.push('/404');
		selected.value = {
			label: formatDateTime(sched.date, sched.time),
			id: sched.id
		}
	}
	loading.value = false;
})

watch(selected, (newVal) => {
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	// value.value = (newVal as any)?.id ?? null;
	value.value = schedules.value.find((s) => s.id === (newVal as any)?.id);
})
</script>

<template>
	<p v-if="!loading && schedules.length === 0" class="text-sm text-error text-center">
		NO SCHEDULES
	</p>
	<USelectMenu
		v-model="selected"
		:items="items"
		:loading="loading"
		:disable="block"
		icon="i-lucide-calendar"
		placeholder="Select Schedule"
		class="w-32 min-w-fit"
		:ui="{ content: 'min-w-fit' }"
		variant="ghost"
		size="xl"
	/>
</template>

<script setup lang="ts">
import type {BreadcrumbItem} from "#ui/components/Breadcrumb.vue";

const { getDays } = useCalendar();

const { direction = 'vertical', showHeader = true } = defineProps<{
	direction?: 'vertical' | 'horizontal',
	showHeader?: boolean,
}>();

const breadcrumbs = ref<BreadcrumbItem[]>([
	{
		label: 'Home',
		icon: 'i-lucide-house',
		to: '/home'
	},
	{
		label: 'Schedule',
		icon: 'lucide:calendar-search',
		to: '/schedule'
	}
])

// --- Week helpers (Monday as start) ---
function startOfWeek(d: Date) {
	const x = new Date(d)
	x.setHours(0, 0, 0, 0)
	const dow = (x.getDay() + 6) % 7 // 0=Mon … 6=Sun
	x.setDate(x.getDate() - dow)
	return x
}
function addDays(d: Date, n: number) {
	const x = new Date(d)
	x.setDate(x.getDate() + n)
	return x
}
function sameDay(a: Date, b: Date) {
	return a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
}

// --- State ---
const today = new Date()
const weekAnchor = ref<Date>(startOfWeek(today)) // always a Monday

// Weekdays labels (Mon–Sun)
const weekdays = [
	'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];
// The 7 Date objects for the visible week (Mon…Sun)
const weekDays = computed(() =>
	Array.from({ length: 7 }, (_, i) => addDays(weekAnchor.value, i))
)

// Header like: "Aug 25 – 31, 2025" or "Aug 26 – Sep 1, 2025"
const currentWeekString = computed(() => {
	const start = weekAnchor.value
	const end = addDays(start, 6)

	const fmtMonth = (d: Date) => d.toLocaleString('default', { month: 'short' })
	const sameMonth = start.getMonth() === end.getMonth()
	const sameYear = start.getFullYear() === end.getFullYear()

	if (sameYear && sameMonth) {
		return `${fmtMonth(start)} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`
	}
	if (sameYear) {
		return `${fmtMonth(start)} ${start.getDate()} – ${fmtMonth(end)} ${end.getDate()}, ${start.getFullYear()}`
	}
	// spans New Year
	return `${fmtMonth(start)} ${start.getDate()}, ${start.getFullYear()} – ${fmtMonth(end)} ${end.getDate()}, ${end.getFullYear()}`
})

// Navigation
function previousWeek() {
	weekAnchor.value = addDays(weekAnchor.value, -7)
}
function nextWeek() {
	weekAnchor.value = addDays(weekAnchor.value, 7)
}
function resetWeek() {
	weekAnchor.value = startOfWeek(today)
}
</script>

<template>
	<div class="w-full" :class="{ 'p-4': direction === 'vertical'}">
		<UBreadcrumb v-if="showHeader" :items="breadcrumbs" class="mb-4" />
		<div v-if="showHeader" class="w-full mb-2 flex flex-row items-center justify-center space-x-2">
			<UButton icon="lucide:chevron-left" size="md" color="secondary" variant="ghost" @click="previousWeek" />
			<p class="text-center text-2xl font-bold">{{ currentWeekString }}</p>
			<UButton icon="lucide:chevron-right" size="md" color="secondary" variant="ghost" @click="nextWeek" />
			<UButton label="Today" size="md" color="primary" variant="outline" @click="resetWeek" />
		</div>
		<UCard variant="outline" class="w-full bg-elevated flex flex-col">
			<div class="w-full flex" :class="{ 'flex-col space-y-2': direction === 'vertical', 'flex-row': direction === 'horizontal' }">
				<CalendarSlot v-for="(day, index) in weekDays" :key="day.getDate()" :date="day" :showDay="false">
					<USeparator :label="weekdays[index]" />
				</CalendarSlot>
			</div>
		</UCard>
	</div>
</template>
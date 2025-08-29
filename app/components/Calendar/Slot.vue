<script setup lang="ts">
import {useUniqueId} from "~/composables/useUniqueId";

function biasedRandom() {
	// Math.random() → uniform [0,1)
	// squaring skews toward 0
	const r = Math.random() ** 2
	// scale to [0,4), then floor
	return Math.floor(r * 4)
}

const { date, showDay } = defineProps(['date', 'showDay']);
const given_date = new Date(date);

const is_today = computed(() => {
	const today = new Date()
	return (
		given_date.getDate() === today.getDate() &&
		given_date.getMonth() === today.getMonth() &&
		given_date.getFullYear() === today.getFullYear()
	)
})

const { generateUUID } = useUniqueId();
const { generateSchedule } = useFakeSchedule();

const count = biasedRandom();
const schedules: any = [];
for(let i = 0; i < count; i++) {
	schedules.push(generateSchedule(generateUUID()))
}

</script>

<template>
	<div class="w-full border-l border-t rounded-lg dark:border-gray-700">
		<div class="w-full h-full dark:bg-gray-900 rounded-lg p-1">
			<slot/>
			<p v-if="showDay" class="text-sm opacity-50">{{given_date.getDate()}} {{is_today ? ' - Today' : ''}}</p>
			<div class="p-1 mt-2 space-y-2">
				<CalendarSchedule v-for="schedule in schedules" :key="schedule.id" :data="schedule" />
			</div>
		</div>
	</div>
</template>
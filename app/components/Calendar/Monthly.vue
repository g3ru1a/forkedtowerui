<script setup lang="ts">
const { getDays } = useCalendar();

const today = new Date();
const month = ref(today.getMonth());
const year = ref(today.getFullYear());


const weekdays = [
	'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

function currentMonthString(){
	const day = new Date(`${year.value}-${month.value+1}-01`);
	return day.toLocaleString('default', { month: 'long', year: 'numeric' })
}

function previousMonth(){
	if(month.value > 0) month.value--;
	else {
		month.value = 11;
		year.value--;
	}
}

function nextMonth(){
	if(month.value < 11) month.value++;
	else {
		month.value = 0;
		year.value++;
	}
}

function resetDate(){
	month.value = today.getMonth();
	year.value = today.getFullYear();
}
</script>

<template>
	<div class="min-h-screen w-full p-4">
		<div class="w-full mb-2 flex flex-row items-center justify-between">
			<div class="flex flex-row font-bold justify-start items-center space-x-2 text-primary">
				<UIcon name="lucide:calendar" size="24"/>
				<p class="text-center text-3xl">
					Raid Schedule
				</p>
			</div>
			<div class="flex flex-row items-center justify-end space-x-2">
				<UButton icon="lucide:chevron-left" size="sm" color="secondary" variant="ghost" @click="previousMonth" />
				<p class="text-center text-2xl font-bold">{{ currentMonthString() }}</p>
				<UButton icon="lucide:chevron-right" size="sm" color="secondary" variant="ghost" @click="nextMonth" />
				<UButton label="Today" size="sm" color="primary" variant="outline" @click="resetDate" />
			</div>
		</div>
		<UCard variant="outline" class="w-full bg-elevated flex flex-col">
			<div class="w-full grid grid-cols-7 mb-2">
				<div v-for="day in weekdays" :key="day" class="w-full px-1">
					<p class="text-center">{{day}}</p>
					<USeparator color="primary" class="mt-2"/>
				</div>
			</div>
			<div class="w-full grid grid-cols-7 space-x-1">
				<CalendarSlot v-for="day in getDays(year, month)" :key="day" :date="day" :showDay="true"/>
			</div>
		</UCard>
	</div>
</template>
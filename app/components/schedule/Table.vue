<script setup lang="ts">
const tabs = [
	{
		label: 'Upcomming Runs',
		icon: 'lucide:calendar-plus',
		slot: 'upcomming'
	},
	{
		label: 'Past Runs',
		icon: 'lucide:history',
		slot: 'past'
	}
]

</script>

<template>
	<div class="w-full h-full flex flex-row items-stretch overflow-y-scroll">
		<UTabs :items="tabs" variant="link" class="w-full h-full" size="sm">
			<template #upcomming>
				<ScheduleTableUpcomming />
			</template>

			<template #past>
				<ScheduleTablePast />
			</template>
		</UTabs>
	</div>
</template>
<script setup lang="ts">

const nextRuns = [
	{
		id: 'asdf'
	},
	{
		id: 'asd3f'
	},
	{
		id: 'as1df'
	}
]

</script>
<template>
	<div class="">
		<div class="flex flex-col gap-4 px-4 py-8 my-12 w-full  mx-auto">
			<p class="text-3xl font-bold w-full text-center">Upcomming Runs</p>
			<UCarousel
				v-slot="{ item }"
				:items="nextRuns"
				prev-icon="i-lucide-chevron-left"
				next-icon="i-lucide-chevron-right"
				loop
				auto-height
				arrows
				dots
				:ui="{
      				container: 'transition-[height]',
				  	dot: 'w-6 h-1'
				}"
				class="w-full max-w-11/12 mx-auto">
				<AssignmentTable :interactive="false"/>
			</UCarousel>
		</div>
		<div class="flex flex-col gap-4 px-4 py-8 bg-elevated">
			<div class="w-full 2xl:w-8/12 mx-auto">
				<p class="text-3xl font-bold w-full text-center">This Week's Runs</p>
				<CalendarWeekly direction="horizontal" :show-header="false"/>
			</div>
		</div>
		<div class="h-24">

		</div>
	</div>
</template>
<script setup lang="ts">
</script>
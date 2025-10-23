<script  lang="ts" setup="">


const schedule = defineModel<Schedule | null>() // full schedule object

const { activeRegistration = null} = defineProps<{
	activeRegistration?: RegistrationResponse | null
}>();

const viewOptionTab = [
	{
		label: '2 Column',
		value: 'two'
	},
	{
		label: '3 Column',
		value: 'three'
	},
	{
		label: 'Full',
		value: 'full'
	},
]

const selectedTab = ref('three')

const threeColumn = [
	['A', 'B', 'C'],
	['D', 'E', 'F'],
]

const twoColumn = [
	['A', 'B'],
	['D', 'C'],
	['E', 'F'],
]

const full = [
	['A', 'B', 'C', 'D', 'E', 'F'],
]

const viewOption = computed(() => {
	if(selectedTab.value === 'full') return full
	if(selectedTab.value === 'two') return twoColumn
	if(selectedTab.value === 'three') return threeColumn
	return [];
})

</script>

<template>
	<UDashboardPanel>
		<UDashboardNavbar class="bg-muted/35">
			<template #leading>
				<ScheduleSelect v-model="schedule"/>
			</template>
			<template #right>
				<UTabs
					v-model="selectedTab"
					:items="viewOptionTab"
					:content="false"
				/>
			</template>
		</UDashboardNavbar>

		<div v-if="schedule" class="p-4 w-full flex flex-col items-stretch justify-evenly gap-4 overflow-y-scroll">
			<UCarousel
				v-slot="{ item }"
				class-names
				dots
				:items="viewOption"
				:ui="{
					  item: 'transition-opacity [&:not(.is-snapped)]:opacity-10'+(selectedTab!=='full' ? ' basis-[90%]' : ''),
					  dot: 'w-12 h-2 rounded-sm',
				}"
				:watch-drag="false"
				class="mx-auto w-full"
			>
				<div class="p-4 w-full flex flex-row items-stretch justify-evenly gap-4">
					<div v-for="i in item" :key="i" class="w-full flex flex-col items-stretch justify-evenly gap-4">
						<p class="text-center">Party {{i}}</p>
						<div v-for="j in [1,2,3,4,5,6,7,8]" :key="j" class="w-full flex items-center justify-center h-18 min-w-36 bg-elevated rounded-lg transform-all hover:scale-105">
							<p class="text-dimmed opacity-50">Empty</p>
						</div>
					</div>
				</div>
			</UCarousel>
			<div class="mt-8">
				Action Buttons
			</div>
		</div>


		<div v-else class="hidden lg:flex flex-col flex-1 items-center justify-center">
			<UIcon name="lucide:file-search" class="size-32 text-dimmed mb-4" />
			<p class="text-dimmed font-black text-2xl">No Data Found</p>
		</div>
	</UDashboardPanel>
</template>
<style scoped>
</style>
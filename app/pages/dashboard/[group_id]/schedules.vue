<script setup lang="ts">
import type {BreadcrumbItem} from "#ui/components/Breadcrumb.vue";
import DataCard from "~/components/DataCard.vue";

definePageMeta({
	layout: 'dashboard'
})
const {getGroups} = useGroups();

const groups = await getGroups();
const group = computed(() => groups ? groups.find(g => g.id === useRoute().params.group_id) : null);

const items = ref<BreadcrumbItem[]>([
	{
		label: group.value?.badge_text ?? 'Home',
	},
	{
		label: 'Schedules',
	},
])
</script>

<template>
	<UDashboardPanel>
		<template #header>
			<UDashboardNavbar class="bg-muted/35" description="This is a description">
				<template #leading>
					<UDashboardSidebarCollapse />
					<UBreadcrumb :items="items" />
				</template>

				<template #trailing>
<!--					<p>Trailing</p>-->
				</template>

				<template #right>
					<ScheduleCreateModal />
				</template>
			</UDashboardNavbar>
		</template>
		<template #body>
			<div class="h-screen overflow-y-scroll grid grid-flow-col grid-cols-6 grid-rows-6 2xl:grid-rows-8 gap-4">
				<div class="col-span-4 row-span-1 gap-4 flex flex-row items-center justify-evenly">
					<div class="w-full h-full">
						<DataCard title="Total Schedules" value="692" icon="i-lucide-calendar" />
					</div>
					<div class="w-full h-full">
						<DataCard title="Pending Registrations" value="12" icon="i-lucide-user-plus" color="warning"/>
					</div>
					<div class="w-full h-full">
						<DataCard title="Pending Progress" value="4" icon="i-lucide-circle-alert" color="info"/>
					</div>
				</div>
				<div class="col-span-4 row-span-5 2xl:row-span-7 space-y-4 p-2 bg-gradient-to-b from-muted/50 to-muted/35 shadow-xl rounded-lg border-b-2 border-muted"> <!-- bg-muted/35 -->
					<ScheduleTable />
				</div>
				<div class="col-span-2 row-span-6 2xl:row-span-8 overflow-y-scroll">
					<ScheduleNext class="mb-4"/>
					<ScheduleActivity/>
				</div>
			</div>
		</template>
	</UDashboardPanel>
</template>
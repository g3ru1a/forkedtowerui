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

				</template>

				<template #right>
					<ScheduleCreateModal />
				</template>
			</UDashboardNavbar>

			<div class="grid grid-cols-3 gap-4 m-4">
				<div class="col-span-1">
					<DataCard title="Total Schedules" value="692" icon="i-lucide-calendar" />
				</div>
				<div class="col-span-1">
					<DataCard title="Pending Registrations" value="12" icon="i-lucide-user-plus" color="warning"/>
				</div>
				<div class="col-span-1">
					<DataCard title="Pending Progress" value="4" icon="i-lucide-circle-alert" color="info"/>
				</div>
				<div class="col-span-3 space-y-4 p-2 bg-muted/35 rounded-lg">
					<ScheduleTable />
				</div>
			</div>

		</template>
	</UDashboardPanel>
</template>
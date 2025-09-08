<script setup lang="ts">
import type {BreadcrumbItem} from "#ui/components/Breadcrumb.vue";

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
		label: 'Settings',
	},
])

</script>

<template>
	<UDashboardPanel>
		<template #header>
			<UDashboardNavbar class="bg-muted/35">
				<template #leading>
					<UDashboardSidebarCollapse />
					<UBreadcrumb :items="items" />
				</template>

				<template #trailing>

				</template>

				<template #right>

				</template>
			</UDashboardNavbar>
		</template>
	</UDashboardPanel>
</template>
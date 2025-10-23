<script setup lang="ts">
import type {BreadcrumbItem} from "#ui/components/Breadcrumb.vue";
import type {DropdownMenuItem} from "@nuxt/ui";
import RegistrationDetailedInfo from "~/components/RegistrationDetailedInfo.vue";
import RegistrationAssigner from "~/components/RegistrationAssigner.vue";

definePageMeta({
	layout: 'dashboard'
})
const {getGroups} = useGroups();
const {getScheduleRegistrations} = useSchedules();

const selectedSchedule = ref<Schedule | undefined>();
const disableScheduleSelect = ref(false);
const route = useRoute();
const router = useRouter();

const registrations = ref<RegistrationResponse[] | null>(null)
const activeRegistration = ref<RegistrationResponse | null>(null)

const groups = await getGroups();
const group = computed(() => groups ? groups.find(g => g.id === useRoute().params.group_id) : null);

const items = ref<BreadcrumbItem[]>([
	{
		label: group.value?.badge_text ?? 'Home',
	},
	{
		label: 'Registrations',
	},
])

const dropdownItems: Ref<DropdownMenuItem[]> = ref([]);

async function loadRegistrations() {
	disableScheduleSelect.value = true;
	activeRegistration.value = null;
	// LOAD STUFF HERE
	console.log("Loading... ")
	if(!selectedSchedule.value) return;
	const result = await getScheduleRegistrations(selectedSchedule.value.id);
	console.log(result);
	if(!result.success) return;
	registrations.value=result.data
	console.log("Done");
	disableScheduleSelect.value = false;
}

watch(selectedSchedule, async (value) => {
	console.log(value);
	if(!value) return;
	if(value.id !== route.query.schedule) {
		console.log("Navigating");
		await router.push({
			path: route.path,
			query: {
				schedule: value.id,
			}
		})
	}
	await loadRegistrations();
})
</script>

<template>
	<UDashboardPanel :default-size="20">
		<UDashboardNavbar class="bg-muted/35">
			<template #leading>
				<UDashboardSidebarCollapse />
				<UBreadcrumb :items="items" />
			</template>
		</UDashboardNavbar>
		<RegistrationList v-if="registrations" :registrations="registrations" v-model="activeRegistration"/>
	</UDashboardPanel>

	<RegistrationAssigner
		v-model="selectedSchedule"
		:active-registration="activeRegistration"
	/>

	<UDashboardPanel :default-size="25">
		<UDashboardNavbar
			v-if="activeRegistration"
			:title="activeRegistration?.character.name"
			:toggle="false"
			class="bg-muted/35"
		>
			<template #leading>
				<UButton
					icon="i-lucide-x"
					color="neutral"
					variant="ghost"
					class="-ms-1.5"
					@click="()=>{activeRegistration=null}"
				/>
			</template>

			<template #right>
				<UTooltip text="Archive">
					<UButton
						icon="i-lucide-inbox"
						color="neutral"
						variant="ghost"
					/>
				</UTooltip>

				<UTooltip text="Reply">
					<UButton icon="i-lucide-reply" color="neutral" variant="ghost" />
				</UTooltip>

				<UDropdownMenu :items="dropdownItems">
					<UButton
						icon="i-lucide-ellipsis-vertical"
						color="neutral"
						variant="ghost"
					/>
				</UDropdownMenu>
			</template>
		</UDashboardNavbar>
		<RegistrationDetailedInfo v-if="activeRegistration" :registration="activeRegistration" />
		<div v-else class="hidden lg:flex flex-col flex-1 items-center justify-center">
			<UIcon name="lucide:search" class="size-12 text-dimmed mb-4" />
			<p class="text-dimmed font-black text-lg">No Registration Selected</p>
		</div>
	</UDashboardPanel>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)
const showNotice = ref(true);

const groupID = route.params.group_id as string;

if(groupID == undefined) await navigateTo('/404');

const basePath = '/dashboard/' + groupID;

const links = [
	[
		{
			label: 'Overview',
			icon: 'i-lucide-activity',
			to: basePath,
			onSelect: () => {
				open.value = false
			},
			active: route.path.includes('/dashboard') && route.path.split('/').length === 4
		},
		{
			label: 'Participants',
			icon: 'i-lucide-users',
			to: basePath+'/participants',
			badge: {
				label: '835',
				color: 'info',
			},
			onSelect: () => {
				open.value = false
			}
		},
	],
	[
		{
			label: 'Schedules',
			to: basePath+'/schedules',
			icon: 'lucide:calendar',
		},
		{
			label: 'Registrations',
			to: basePath+'/registrations',
			icon: 'lucide:user-plus',
			badge: {
				label: '+143',
				color: 'warning',
			},
		},
	],
	[
		{
			label: 'Members',
			to: basePath+'/members',
			icon: 'lucide:square-user-round',
		},
		{
			label: 'Statistics',
			icon: 'lucide:bar-chart-4',
			to: basePath+'/statistics',
			onSelect: () => {
				open.value = false
			}
		},
		{
			label: 'Audit Log',
			to: basePath+'/audit',
			icon: 'lucide:file-clock',
		},
	],
	[
		{
			label: 'Settings',
			icon: 'i-lucide-settings',
			to: basePath+'/settings',
		},
		{
			label: 'Github',
			icon: 'i-lucide-github',
			to: 'https://github.com/g3ru1a/forkedtowerui',
			target: '_blank'
		},
		{
			label: 'Help & Support',
			icon: 'i-lucide-info',
			to: 'https://discord.gg/forkedtower',
			target: '_blank'
		}
	]
] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
	id: 'links',
	label: 'Go to',
	items: links.flat()
}, {
	id: 'code',
	label: 'Code',
	items: [{
		id: 'source',
		label: 'View page source',
		icon: 'i-simple-icons-github',
		to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
		target: '_blank'
	}]
}])

onMounted(async () => {
	const cookie = useCookie('cookie-consent')
	if (cookie.value === 'accepted') {
		return
	}

	toast.add({
		title: 'We use first-party cookies to enhance your experience on our website.',
		duration: 0,
		close: false,
		actions: [{
			label: 'Accept',
			color: 'neutral',
			variant: 'outline',
			onClick: () => {
				cookie.value = 'accepted'
			}
		}, {
			label: 'Opt out',
			color: 'neutral',
			variant: 'ghost'
		}]
	})
})
</script>

<template>
	<UDashboardGroup unit="rem">
		<UDashboardSidebar
			id="default"
			v-model:open="open"
			collapsible
			resizable
			class="bg-muted/35"
			:ui="{ footer: 'lg:border-t lg:border-default p-0' }"
		>
			<template #header="{ collapsed }">
				<LogoFP v-if="!collapsed" class="h-10 mx-auto" />
				<LogoFPSquare v-if="collapsed" class="h-10 mx-auto" />
			</template>

			<template #default="{ collapsed }">
				<GroupsMenu :collapsed="collapsed" class="bg-muted/50 shadow-2xl"/>
				<USeparator />
				<UNavigationMenu
					:collapsed="collapsed"
					:items="links[0]"
					orientation="vertical"
					tooltip
					popover
				/>

				<USeparator />
				<UNavigationMenu
					:collapsed="collapsed"
					:items="links[1]"
					orientation="vertical"
					tooltip
					popover
				/>

				<USeparator />
				<UNavigationMenu
					:collapsed="collapsed"
					:items="links[2]"
					orientation="vertical"
					tooltip
					popover
				/>

				<UCard
					v-if="showNotice && !collapsed"
					class="mt-auto bg-elevated shadow-xl"
					:ui="{
						body: 'p-0 sm:p-2'
					}"
				>
					<div class="flex flex-col w-full">
						<div class="w-full flex flex-col items-start justify-center">
							<UBadge label="Notice" color="warning" class="mb-2" variant="soft" />
						</div>
						<p class="text-toned font-bold">Dashboard is in Beta</p>
						<p class="text-xs text-muted">Please make sure to report any issues to <span class="text-primary">Giki (@yenpress)</span> on Discord.</p>
						<div>
							<UButton label="Open Discord" size="sm" trailing-icon="lucide:external-link" color="neutral" variant="outline" class="mt-2 w-auto" to="https://discord.gg/forkedtower" target="_blank" :ui="{trailingIcon: 'size-3'}"/>
						</div>
					</div>
				</UCard>

				<UNavigationMenu
					:collapsed="collapsed"
					:items="links[3]"
					orientation="vertical"
					tooltip
					:class="{'mt-auto': !showNotice || collapsed}"
				/>
			</template>

			<template #footer="{ collapsed }">
				<UserMenu :collapsed="collapsed" :stretch="true" class="w-full"/>
			</template>
		</UDashboardSidebar>

		<UDashboardSearch :groups="groups" />

		<slot/>
	</UDashboardGroup>
</template>
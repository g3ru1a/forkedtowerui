<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useLocalePath } from '#i18n' // or '#imports' depending on your setup
const localePath = useLocalePath()

const route = useRoute()
const router = useRouter()
const toast = useToast()

const open = ref(false)
const showNotice = ref(true);

const groupID = computed(() => String(route.params.group_id ?? ''))

if(groupID.value == undefined) await navigateTo('/404');

const pathTo = (suffix: string) => `/dashboard/${groupID.value}${suffix}`
const norm = (p: string) => p.replace(/\/+$/, '') // strip trailing slash

const isActive = (toPath: string, exact = false) => {
	const target = norm(router.resolve(localePath(toPath)).path)
	const current = norm(route.path)
	return exact ? current === target : current.includes(target)
}

const links = computed<NavigationMenuItem[][]>(() => [
	[
		{
			label: 'Overview',
			icon: 'i-lucide-activity',
			to: localePath(pathTo('/')),
			onSelect: () => {
				open.value = false
			},
			active: isActive(pathTo('/'), true)
		},
		{
			label: 'Participants',
			icon: 'i-lucide-users',
			to: localePath(pathTo('/participants')),
			badge: {
				label: '835',
				color: 'info',
			},
			onSelect: () => {
				open.value = false
			},
			active: isActive(pathTo('/participants')),
		},
	],
	[
		{
			label: 'Schedules',
			to: localePath(pathTo('/schedules')),
			icon: 'lucide:calendar',
			active: isActive(pathTo('/schedules')),
		},
		{
			label: 'Registrations',
			to: localePath(pathTo('/registrations')),
			icon: 'lucide:user-plus',
			badge: {
				label: '+143',
				color: 'warning',
			},
			active: isActive(pathTo('/registrations')),
		},
	],
	[
		{
			label: 'Members',
			to: localePath(pathTo('/members')),
			icon: 'lucide:square-user-round',
			active: isActive(pathTo('/members')),
		},
		{
			label: 'Statistics',
			icon: 'lucide:bar-chart-4',
			to: localePath(pathTo('/statistics')),
			onSelect: () => {
				open.value = false
			},
			active: isActive(pathTo('/statistics')),
		},
		{
			label: 'Audit Log',
			to: localePath(pathTo('/audit')),
			icon: 'lucide:file-clock',
			active: isActive(pathTo('/audit')),
		},
	],
	[
		{
			label: 'Settings',
			icon: 'i-lucide-settings',
			to: localePath(pathTo('/settings')),
			active: isActive(pathTo('/settings')),
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
]);

const goHome = () => {
	router.push('/');
}
// onMounted(async () => {
// 	const cookie = useCookie('cookie-consent')
// 	if (cookie.value === 'accepted') {
// 		return
// 	}
//
// 	toast.add({
// 		title: 'We use first-party cookies to enhance your experience on our website.',
// 		duration: 0,
// 		close: false,
// 		actions: [{
// 			label: 'Accept',
// 			color: 'neutral',
// 			variant: 'outline',
// 			onClick: () => {
// 				cookie.value = 'accepted'
// 			}
// 		}, {
// 			label: 'Opt out',
// 			color: 'neutral',
// 			variant: 'ghost'
// 		}]
// 	})
// })
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
				<LogoFP v-if="!collapsed" class="h-10 mx-auto" @click="goHome()" />
				<LogoFPSquare v-if="collapsed" class="h-10 mx-auto" @click="goHome()"  />
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


		<slot/>
	</UDashboardGroup>
</template>
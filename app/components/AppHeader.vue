<script setup lang="ts">
import { en, de, fr, ja } from '@nuxt/ui/locale'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

const locale = ref('en')

const route = useRoute()
const userStore = useUserStore()
const { login, logout } = useAuth();

const items = computed(() => [{
	label: 'Home',
	icon: 'lucide:house',
	to: '/',
	active: route.path.split('/').length === 2
}, {
	label: 'Schedule',
	icon: 'lucide:calendar-search',
	to: '/schedule',
	active: route.path.includes('/schedule')
},
// {
// 	label: 'Contest',
// 	icon: 'lucide:trophy',
// 	to: '/contest',
// 	active: route.path.includes('/contest')
// },
	{
	label: 'Statistics',
	icon: 'lucide:chart-no-axes-combined',
	to: '/statistics',
	active: route.path.includes('/statistics')
}, {
	label: 'Strats',
	to: '/strats',
	icon: 'i-lucide-book-open',
	badge: {
		label: 'New',
		color: 'primary' as const
	},
	active: route.path.includes('/strats')
}])


const user_menu_navigation = computed(() => [{
	label: 'Characters',
	icon: 'lucide:calendar-search',
	to: '/characters',
	active: route.path.includes('/characters')
}, {
	label: 'Groups',
	icon: 'lucide:trophy',
	to: '/groups',
	active: route.path.includes('/groups')
}, {
		label: 'Logout',
		icon: 'lucide:log-out',
		onSelect() {
			logout();
		},
	}
])

const user_menu = ref<DropdownMenuItem[]>([
	[
		{
			label: 'Profile',
			icon: 'i-lucide-user'
		},
	],
	[
		{
			label: 'Characters',
			type: 'label'
		},
		{
			label: 'Giki Chomusuke',
			avatar: {
				src: 'https://img2.finalfantasyxiv.com/f/15cff6ad5af687333d4ae7545c7b4ec4_7206469080400ed57a5373d0a9c55c59fc0.jpg?1757013713'
			},
		},
		{
			label: 'Add Character',
			icon: 'i-lucide-plus',
			// kbds: ['meta', 'n']
		}
	],
	[
		{
			label: 'Groups',
			type: 'label'
		},
		{
			label: 'Dashboard',
			icon: 'lucide:layout-dashboard',
			// kbds: ['meta', 'n']
		},
		{
			label: 'Invite users',
			icon: 'i-lucide-user-plus',
			children: [
				[
					{
						label: 'Discord',
						icon: 'ic:baseline-discord'
					},
					{
						label: 'Link',
						icon: 'i-lucide-link'
					}
				],
			]
		},
		{
			label: 'My Groups',
			icon: 'i-lucide-users',
			children: [
				[
					{
						label: 'FTEL',
					},
					{
						label: 'SVSL',
					}
				],
				[
					{
						label: 'New',
						icon: 'i-lucide-plus'
					}
				]
			]
		},
	],
	[
		{
			label: 'Admin',
			type: 'label'
		},
		{
			label: 'Dashboard',
			icon: 'i-lucide-shield',
		},
	],
	[
		{
			label: 'Logout',
			icon: 'i-lucide-log-out',
			// kbds: ['shift', 'meta', 'q']
		}
	]
]);

</script>

<template>
	<UHeader class="bg-elevated" mode="slideover">
		<template #left>
			<NuxtLink to="/">
				<LogoFP class="w-auto h-4 md:h-6 lg:h-10 shrink-0" />
			</NuxtLink>
		</template>

		<UNavigationMenu
			:items="items"
			variant="link"
		/>

		<template #right>
<!--			<UColorModeButton />-->

			<ULocaleSelect v-model="locale" :locales="[en, de, fr, ja]" class="w-36" />

			<UDropdownMenu
				v-if="userStore.loggedIn"
				arrow
				:items="user_menu"
				size="md"
				:ui="{
					content: 'w-48',
					item: 'rounded-md',
				}"
				class="hidden lg:inline-flex"
			>
				<div class="flex items-center justify-center cursor-pointer hover:bg-gray-900 active:bg-gray-900 rounded-xl px-2 py-1">
					<UUser
						class="w-full px-2 py-4"
						:name="userStore.user?.username"
						:description="userStore.user?.handle"
						:avatar="{
							  src: userStore.user?.avatar_url
							}"
						:chip="{
								  color: 'success',
								  position: 'top-right'
							}"
						:ui="{
								description: 'text-warning',
							}"
						size="xl"
					/>
					<UIcon name="i-lucide-chevron-down" class="ml-2" size="20" />
				</div>
			</UDropdownMenu>



			<UButton
				v-if="!userStore.loggedIn"
				label="Sign in"
				color="neutral"
				class="hidden lg:inline-flex"
				icon="ic:baseline-discord"
				@click="login()"
			/>

		</template>

		<template #body>
			<UNavigationMenu
				:items="items"
				orientation="vertical"
				class="-mx-2.5"
			/>

			<USeparator class="my-6" />

			<UButton
				v-if="!userStore.loggedIn"
				label="Sign in"
				color="neutral"
				icon="ic:baseline-discord"
				block
				class="mb-3"
				@click="login()"
			/>

			<UUser
				v-if="userStore.loggedIn"
				class="w-full"
				:name="userStore.user?.username"
				:description="userStore.user?.handle"
				:avatar="{
							  src: userStore.user?.avatar_url
							}"
				:chip="{
								  color: 'success',
								  position: 'top-right'
							}"
				:ui="{
								description: 'text-warning',
							}"
				size="xl"
			/>


			<USeparator class="my-6" />

			<UNavigationMenu
				v-if="userStore.loggedIn"
				:items="user_menu_navigation"
				orientation="vertical"
				class="-mx-2.5"
			/>

		</template>
	</UHeader>
</template>
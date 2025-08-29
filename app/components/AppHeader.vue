<script setup lang="ts">
import { en, de, fr } from '@nuxt/ui/locale'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

const locale = ref('en')

const route = useRoute()
const userStore = useUserStore()
const { login, logout } = useAuth();

console.log(userStore.user);

const items = computed(() => [{
	label: 'Schedule',
	icon: 'lucide:calendar-search',
	to: '/schedule',
	active: route.path.includes('/schedule')
}, {
	label: 'Contest',
	icon: 'lucide:trophy',
	to: '/contest',
	active: route.path.includes('/contest')
}, {
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

const user_menu = ref<DropdownMenuItem[]>([
	{
		label: 'Profile',
		icon: 'i-lucide-user',
		slot: 'profile' as const,
		disabled: true
	},
	{
		label: 'Billing',
		icon: 'i-lucide-credit-card'
	},
	{
		label: 'Logout',
		icon: 'lucide:log-out',
		onSelect() {
		    logout();
		},
	}
])
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
			<UColorModeButton />

			<ULocaleSelect v-model="locale" :locales="[en, de, fr]" class="w-36" />

			<UDropdownMenu
				arrow
				v-if="userStore.loggedIn"
				:items="user_menu"
				:ui="{
					content: 'w-48 p-0',     // remove content padding
					item: 'first:p-0 p-2',             // remove item padding
					group: 'p-0'
				  }"
				size="xl"
			>
				<div class="flex items-center justify-center cursor-pointer hover:bg-gray-900 rounded-xl px-2 py-1">
					<UAvatar :src="userStore.user?.avatar_url" :chip="{ color: 'success', position: 'top-right' }" size="xl"/>
					<UIcon name="i-lucide-chevron-down" class="ml-2" size="20" />
				</div>
				<template #profile>
					<div class="p-2 w-full bg-gradient-to-br from-violet-950 to-purple-700">
						<UUser
							:name="userStore.user?.username"
							:description="userStore.user?.handle"
							:avatar="{
						  src: userStore.user?.avatar_url
						}"
							:chip="{
					  color: 'success',
					  position: 'top-right'
				}"
							size="xl"
						/>
					</div>
				</template>
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
		</template>
	</UHeader>
</template>
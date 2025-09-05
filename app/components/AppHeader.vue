<script setup lang="ts">
import { en, de, fr, ja } from '@nuxt/ui/locale'
import type {NavigationMenuItem} from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

const locale = ref('en')
const route = useRoute()
const userStore = useUserStore()
const { login } = useAuth();

const items = computed(() => [
	{
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
	{
	label: 'Statistics',
	icon: 'lucide:chart-no-axes-combined',
	to: '/statistics',
	active: route.path.includes('/statistics')
},
	{
		label: 'Strats',
		active: route.path.includes('/strats'),
		icon: 'i-lucide-book-open',
		badge: {
			label: 'New',
			color: 'primary' as const
		},
		children: [
			{
				label: 'Forked Tower: ABBA',
				description: 'Most Common Strats for Forked Tower.',
				icon: 'lucide:notepad-text',
				to: '/strats/abba'
			},
			{
				label: 'Forked Tower: FTEL',
				description: 'Our own variation of the ABBA strat.',
				icon: 'lucide:notepad-text',
				to: '/strats/ftel'
			},
			{
				label: 'Speed Strats',
				icon: 'lucide:fast-forward',
				description: 'Sometimes you just gotta go fast.',
				to: '/strats/speed'
			},
			{
				label: 'Greed Strats',
				icon: 'lucide:sword',
				description: 'Squeezing every last drop of damage.',
				to: '/strats/greed'
			},
		]
	},
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
<!--			<UColorModeButton />-->

			<ULocaleSelect v-model="locale" :locales="[en, de, fr, ja]" class="w-36" />

			<UserMenu v-if="userStore.loggedIn" />

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
				class="w-full mb-2"
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

			<UserMenu v-if="userStore.loggedIn" :mobile="true" />

		</template>
	</UHeader>
</template>
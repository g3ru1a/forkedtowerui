<script setup lang="ts">
import { en, de, fr } from '@nuxt/ui/locale'

const locale = ref('en')

const route = useRoute()

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

			<UButton
				label="Sign in"
				color="neutral"
				to="/login"
				class="hidden lg:inline-flex"
				icon="ic:baseline-discord"
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
				label="Sign in"
				color="neutral"
				to="/login"
				block
				class="mb-3"
				icon="ic:baseline-discord"
			/>
		</template>
	</UHeader>
</template>
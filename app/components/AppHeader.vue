<script setup lang="ts">
import { en, de, fr, ja } from '@nuxt/ui/locale'
import type {DBCharacter} from "#shared/types/models";
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

const locale = ref('en')
const characterLink = ref();
const route = useRoute()
const userStore = useUserStore()
const {getCharacters} = useCharacters();
const { login, logout } = useAuth();
const chars = ref<DBCharacter[]>([]);

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

const user_menu = ref<DropdownMenuItem[]>([
	[
		{
			label: 'Profile',
			icon: 'i-lucide-user',
			to: '/profile'
		},
	],
	[
		{
			label: 'Characters',
			type: 'label'
		},
		{
			label: 'Add Character',
			icon: 'i-lucide-plus',
			onSelect: () => {
				characterLink.value.openModal();
			}
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
			onSelect: () => {
				logout();
			}
		}
	]
]);

onMounted(() => {
	getCharacters(true).then(characters => {
		if(!characters) return;
		chars.value = characters;
		user_menu.value = user_menu.value.with(
			1,
			[
				...user_menu.value[1]!.slice(0, -1),
				...characters.map((c): DropdownMenuItem => ({
					label: c.name + ' - ' + c.world,
					avatar: { src: c.avatar_url },
					to: '/characters/' + c.id,
					slot: 'character' as const
				})),
				user_menu.value[1]!.at(-1)!,
			]
		);
	});
})

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
					content: 'min-w-48',
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

			<CharacterLink ref="characterLink"/>

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

			<UNavigationMenu
				v-if="userStore.loggedIn"
				:items="user_menu as NavigationMenuItem[]"
				orientation="vertical"
				class="-mx-2.5"
			/>

		</template>
	</UHeader>
</template>
<script setup lang="ts">
import type {DBCharacter} from "#shared/types/models";
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
import { useUserStore } from '~/stores/user'

const characterLink = ref();
const userStore = useUserStore()
const {getCharacters} = useCharacters();
const { logout } = useAuth();
const chars = ref<DBCharacter[]>([]);
const {mobile = false, collapsed = false, stretch = false} = defineProps<{mobile?: boolean, collapsed?: boolean, stretch?: boolean}>()

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
			to: '/dashboard'
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
	<div>
		<UDropdownMenu
			v-if="!mobile"
			arrow
			:items="user_menu"
			size="md"
			:ui="{
					content: 'min-w-48' + stretch ? 'w-full' : '',
					item: 'rounded-md',
				}"
			class="w-full hidden lg:inline-flex"
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

		<UNavigationMenu
			v-if="mobile"
			:items="user_menu as NavigationMenuItem[]"
			orientation="vertical"
			class="-mx-2.5"
		/>
	</div>
</template>
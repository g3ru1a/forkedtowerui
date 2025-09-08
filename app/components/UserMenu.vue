<script setup lang="ts">
import type {DBCharacter} from "#shared/types/models";
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'
import { useUserStore } from '~/stores/user'
import CreateGroup from "~/components/CreateGroup.vue";

const {getGroups} = useGroups();
const characterLink = ref();
const createGroup = ref();
const userStore = useUserStore()
const {getCharacters} = useCharacters();
const { logout } = useAuth();
const chars = ref<DBCharacter[]>([]);
const groups = ref<Group[]>([]);
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
			label: 'Create',
			icon: 'lucide:plus',
			onSelect: () => {
				createGroup.value.openModal();
			}
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

groups.value = await getGroups() ?? []
if(groups.value.length > 0){
	user_menu.value = user_menu.value.with(
		2,
		[
			...user_menu.value[2]!.slice(0, -1),
			...groups.value.map((g): DropdownMenuItem => ({
				label: g.name,
				children: [
					{
						label: 'Dashboard',
						to: '/dashboard/' + g.id,
						icon: 'lucide:layout-dashboard'
					},
					{
						label: 'Page',
						to: '/groups/' + g.id,
						icon: 'lucide:file-text'
					},
					{
						label: "Invite Member",
						icon: 'lucide:mail',
						onSelect(e: Event) {
							// TODO Invite Logic
						}
					}
				]
			})),
			user_menu.value[2]!.at(-1)!,
		]
	);
}
await getCharacters(true).then(characters => {
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

</script>

<template>
	<div>
		<UDropdownMenu
			v-if="!mobile"
			arrow
			:items="user_menu"
			size="lg"
			:ui="{
					content: 'min-w-48' + stretch ? 'w-full' : '',
					item: 'rounded-md',
				}"
			class="w-full hidden lg:inline-flex"
		>
			<div class="max-h-14 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-accented rounded-md px-2 py-1">
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
		<CreateGroup ref="createGroup" />

		<UNavigationMenu
			v-if="mobile"
			:items="user_menu as NavigationMenuItem[]"
			orientation="vertical"
			class="-mx-2.5"
		/>
	</div>
</template>
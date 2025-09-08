<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useLocalePath } from '#i18n' // or '#imports' depending on your setup
const localePath = useLocalePath()

interface GroupDMI extends DropdownMenuItem {
	badge_text?: string;
	badge_color?: string;
	badge_gradient?: string;
	owner_name?: string;
	id?: string;
}
const route = useRoute();
const groupID = computed(() => route.params.group_id);

const {collapsed = false} = defineProps<{
	collapsed?: boolean,
}>()

const groups = ref<Group[]>([]);
const {getGroups} = useGroups();

const selected = ref<GroupDMI | null>(null);

const items = computed<GroupDMI[]>(() =>
	groups.value.map((g): GroupDMI => ({
		id: g.id,
		label: g.name,
		owner_name: g.owner.username,
		badge_text: g.badge_text,
		badge_color: g.color,
		badge_gradient: g.gradient,
		onSelect() {
			const to = localePath(`/dashboard/${g.id}`)
			if (route.fullPath !== to) {
				navigateTo(to, { external: true })
			}
		}
	}))
);

groups.value = await getGroups() ?? [];
if(!groups.value){
	groups.value = [];
	console.log("No groups found.")
}
if(groupID.value){
	selected.value = items.value.find(g => g.id == groupID.value) ?? {}
}
</script>

<template>
	<p v-if="groups.length == 0" class="text-sm text-error text-center">NO GROUPS EXIST</p>
	<UDropdownMenu
		v-if="groups.length > 0"
		:items="items"
		:content="{ align: 'center', collisionPadding: 12 }"
	>
		<UButton
			v-bind="{
				label: collapsed ? selected?.badge?.label : selected?.label,
				trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down'
			}"
			color="neutral"
			variant="ghost"
			block
			:square="collapsed"
			class="data-[state=open]:bg-elevated"
			:class="[!collapsed && 'py-2']"
			:ui="{
				trailingIcon: 'text-dimmed'
			}"
		>
			<div v-if="!collapsed" class="w-full flex flex-row gap-2">
				<div class="w-1/4 flex items-center justify-center">
					<GroupBadge :text="selected?.badge_text" :color="selected?.badge_color" :gradient="selected?.badge_gradient" />
				</div>
				<div class="w-3/4 flex flex-col items-start justify-center text-left">
					<p class="text-xs font-bold">{{selected?.label}}</p>
					<p class="text-xs text-muted">{{selected?.owner_name}}</p>
				</div>
			</div>
			<div v-else class="w-full flex flex-row items-center justify-center">
				<GroupBadge :text="selected?.badge_text" :color="selected?.badge_color" :gradient="selected?.badge_gradient" />
			</div>
		</UButton>


		<template #item="{item}">
			<div class="w-full flex flex-row gap-2">
				<div class="w-1/4 flex items-center justify-center">
					<GroupBadge :text="item?.badge_text" :color="item?.badge_color" :gradient="item?.badge_gradient" />
				</div>
				<div class="w-3/4 flex flex-col items-start justify-center text-left">
					<p class="text-xs font-bold">{{item.label}}</p>
					<p class="text-xs text-muted">{{item.owner_name}}</p>
				</div>
			</div>
		</template>

	</UDropdownMenu>
</template>
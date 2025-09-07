<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
interface GroupDMI extends DropdownMenuItem {
	badge?: {
		label: string;
	};
	badge_color?: string;
	owner_name?: string;
}


defineProps<{
	collapsed?: boolean,
	prefill?: string
}>()

const groups = ref<Group[]>([]);
const {getGroups} = useGroups();

const selected = ref<GroupDMI>({});

const items = computed<GroupDMI[]>(() =>
	groups.value.map((g): GroupDMI => ({
		label: g.name,
		owner_name: g.owner.username,
		badge: g.badge_text ? { label: g.badge_text } : undefined,
		to: `/groups/${g.id}`,
	}))
);

onMounted(async () => {
	groups.value = await getGroups() ?? [];
	if(!groups.value){
		groups.value = [];
		console.log("No groups found.")
		return;
	}
})
</script>

<template>
	<p v-if="groups.length == 0" class="text-sm text-error text-center">NO GROUPS EXIST</p>
	<UDropdownMenu
		v-if="groups.length > 0"
		:items="items"
		:content="{ align: 'center', collisionPadding: 12 }"
		:ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
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
			<div class="w-full flex flex-row gap-2">
				<div class="w-1/4 flex items-center justify-center">
					<UBadge :label="selected?.badge_text" variant="outline"/>
				</div>
				<div class="w-3/4 flex flex-col items-start justify-center text-left">
					<p class="text-xs font-bold">{{selected?.label}}</p>
					<p class="text-xs text-muted">{{selected?.owner_name}}</p>
				</div>
			</div>
		</UButton>


		<template #item="{item}">
			<div class="w-full flex flex-row gap-2">
				<div class="w-1/4 flex items-center justify-center">
					<UBadge :label="item.badge_text" variant="outline"/>
				</div>
				<div class="w-3/4 flex flex-col items-start justify-center text-left">
					<p class="text-xs font-bold">{{item.label}}</p>
					<p class="text-xs text-muted">{{item.owner_name}}</p>
				</div>
			</div>
		</template>

	</UDropdownMenu>
</template>
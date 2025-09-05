<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
	collapsed?: boolean
}>()

const teams = ref([{
	value: 'id',
	label: 'Forked Tower Enjoyers Light',
	badge: "FTEL",
	owner: "Giki Chomusuke"
}, {
	value: 'id2',
	label: 'Savage Slimes',
	badge: "SVSL",
	owner: "Other Name"
}, {
	value: 'id3',
	label: 'Students of Baldesion',
	badge: "SoB",
	owner: "Quite Someone"
}])
const selectedTeam = ref(teams.value[0])

const items = computed<DropdownMenuItem[][]>(() => {
	return [teams.value.map(team => ({
		...team,
		onSelect() {
			selectedTeam.value = team
		}
	}))]
})
</script>

<template>
	<UDropdownMenu
		:items="items"
		:content="{ align: 'center', collisionPadding: 12 }"
		:ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
	>
		<UButton
			v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
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
		/>
		<template #item="{item}">
			<div class="w-full flex flex-row gap-2">
				<div class="w-1/4 flex items-center justify-center">
					<UBadge :label="item.badge" variant="outline"/>
				</div>
				<div class="w-3/4 flex flex-col items-start justify-center text-left">
					<p class="text-xs font-bold">{{item.label}}</p>
					<p class="text-xs text-muted">{{item.owner}}</p>
				</div>
			</div>
		</template>

	</UDropdownMenu>
</template>
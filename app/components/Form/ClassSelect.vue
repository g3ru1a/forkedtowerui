<script  lang="ts" setup="">
const { getFFClasses } = useFFClasses()
const selected = defineModel<FFClass | FFClass[] | null>();
const {multiple = false, noBaseClasses = false} = defineProps<{ multiple?: boolean, noBaseClasses?: boolean }>();

const result = await getFFClasses()
if (!result.success) {
	throw createError({ statusCode: 500, statusMessage: 'Failed to load classes' })
}
const classes = result.data

const isClassSelectModalOpen = ref(false);

const exclude_classes = ['Gladiator', 'Marauder', 'Conjurer', 'Arcanist', 'Archer', 'Pugilist', 'Lancer', 'Rogue'];
const grouped = computed(() => {
	const map = new Map<string, FFClass[]>()

	for (const c of classes) {
		if (noBaseClasses && exclude_classes.includes(c.name)) continue // Skip excluded classes

		if (!map.has(c.type)) map.set(c.type, [])
		map.get(c.type)!.push(c)
	}

	return Array.from(map.entries()).map(([type, items]) => ({ type, items }))
})


// Selection check
const isSelected = (cls: FFClass): boolean => {
	if (!selected.value) return false
	if (Array.isArray(selected.value)) return selected.value.some((s) => s.id === cls.id)
	return selected.value.id === cls.id
}

const toggle = (cls: FFClass) => {
	if (!multiple) {
		selected.value = cls
	} else {
		const current = (selected.value ?? []) as FFClass[]
		const exists = current.find((c) => c.id === cls.id)
		selected.value = exists
			? current.filter((c) => c.id !== cls.id)
			: [...current, cls]
	}
}

const getRoleColor = (cls: FFClass): string => {
	const type = cls.type.toLowerCase()
	if (type.includes('tank')) return 'bg-blue-500'
	if (type.includes('healer')) return 'bg-green-500'
	if (type.includes('dps')) return 'bg-red-500'
	// if (type.includes('physical') || type.includes('magical')) return 'bg-purple-600'
	return 'bg-gray-500'
}
</script>

<template>
	<div>
		<div>
			<UButton v-if="selected === null" icon="i-lucide-plus" color="primary" variant="outline" @click="isClassSelectModalOpen = true" />
			<div v-else-if="Array.isArray(selected)" class="flex flex-row flex-wrap gap-2">
				<UTooltip
					v-for="cls in selected"
					:key="cls.id"
					:delay-duration="0"
					:text="cls.name">
					<div
						class="flex items-center p-1 border-primary rounded transition-all cursor-pointer"
						:class="[getRoleColor(cls), isSelected(cls) ? 'brightness-100' : 'brightness-50']"
						@click="isClassSelectModalOpen = true"
					>
						<img :src="'http://ftapi.test/'+cls.flat_icon_url" class="w-6 h-6 p-0" style="filter: brightness(0) invert(1);" >
					</div>
				</UTooltip>
				<UButton v-if="selected.length > 0" icon="i-lucide-edit" color="primary" variant="outline" @click="isClassSelectModalOpen = true" />
				<UButton v-else icon="i-lucide-plus" color="primary" variant="outline" @click="isClassSelectModalOpen = true" />
			</div>
			<div v-else-if="selected != null && !Array.isArray(selected)" class="flex flex-row flex-wrap gap-2">
				<UTooltip
					:delay-duration="0"
					:text="selected.name">
					<div
						class="flex items-center gap-2 px-2 py-1 border-primary rounded transition-all cursor-pointer"
						:class="[getRoleColor(selected), isSelected(selected) ? 'brightness-100' : 'brightness-50']"
						@click="isClassSelectModalOpen = true"
					>
						<img :src="'http://ftapi.test/'+selected.flat_icon_url" class="w-6 h-6 p-0" style="filter: brightness(0) invert(1);" >
						<p class="font-black">{{selected.name}}</p>
					</div>
				</UTooltip>
				<UButton icon="i-lucide-edit" color="primary" variant="outline" @click="isClassSelectModalOpen = true" />
			</div>
		</div>

		<UModal v-model:open="isClassSelectModalOpen" title="Select Classes You Want to Play">
			<template #body>
				<div class="m-2 space-y-2.5 w-auto">
					<div v-for="group in grouped" :key="group.type" class="flex flex-row items-center justify-between gap-4">
									<p class="text-md font-semibold mb-2">{{ group.type }}</p>
						<div class="flex flex-row flex-wrap gap-2">
							<UTooltip
								v-for="cls in group.items"
								:key="cls.id"
								:delay-duration="0"
								:text="cls.name">
								<button
									class="flex items-center gap-2 p-3 border-primary rounded transition-all cursor-pointer"
									:class="[getRoleColor(cls), isSelected(cls) ? 'brightness-100' : 'brightness-50']"
									@click="toggle(cls)"
								>
									<img :src="'http://ftapi.test/'+cls.flat_icon_url" class="w-6 h-6" style="filter: brightness(0) invert(1);" >
								</button>
							</UTooltip>
						</div>
					</div>
				</div>
			</template>
			<template #footer>
				<div class="w-full flex flex-row items-center justify-end">
					<UButton color="primary" class="w-full" @click="isClassSelectModalOpen = false">
						<p class="text-center w-full">Confirm</p>
					</UButton>
				</div>
			</template>
		</UModal>
	</div>
</template>

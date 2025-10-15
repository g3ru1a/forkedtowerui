<script  lang="ts" setup="">
const { getPhantomJobs } = usePhantomJobs()
const selected = defineModel<PhantomJob | PhantomJob[] | null>();
const {multiple = false } = defineProps<{ multiple?: boolean }>();

const result = await getPhantomJobs()
if (!result.success) {
	throw createError({ statusCode: 500, statusMessage: 'Failed to load phantomJobs' })
}
const phantomJobs = result.data

const isPhantomJobSelectModalOpen = ref(false);

const exclude: string[] = [];
const grouped = computed(() => phantomJobs.filter(c => !exclude.includes(c.name)))

// Selection check
const isSelected = (cls: PhantomJob): boolean => {
	if (!selected.value) return false
	if (Array.isArray(selected.value)) return selected.value.some((s) => s.id === cls.id)
	return selected.value.id === cls.id
}

const toggle = (cls: PhantomJob) => {
	if (!multiple) {
		selected.value = cls
	} else {
		const current = (selected.value ?? []) as PhantomJob[]
		const exists = current.find((c) => c.id === cls.id)
		selected.value = exists
			? current.filter((c) => c.id !== cls.id)
			: [...current, cls]
	}
}
</script>

<template>
	<div>
		<div>
			<UButton v-if="selected === null" icon="i-lucide-plus" color="primary" variant="outline" @click="isPhantomJobSelectModalOpen = true" />
			<div v-else-if="Array.isArray(selected) && selected.length > 0" class="flex flex-row flex-wrap gap-2">
				<UTooltip
					v-for="cls in selected"
					:key="cls.id"
					:delay-duration="0"
					:text="cls.name">
					<div
						class="flex items-center p-1 border-primary rounded transition-all cursor-pointer bg-gray-500"
						:class="[isSelected(cls) ? 'brightness-100' : 'brightness-50']"
						@click="isPhantomJobSelectModalOpen = true"
					>
						<img :src="cls.icon_url" class="w-6 h-6 p-0" style="filter: grayscale(100%) brightness(100%);" >
					</div>
				</UTooltip>
				<UButton v-if="selected.length > 0" icon="i-lucide-edit" color="primary" variant="outline" @click="isPhantomJobSelectModalOpen = true" />
				<UButton v-else icon="i-lucide-plus" color="primary" variant="outline" @click="isPhantomJobSelectModalOpen = true" />
			</div>
			<div v-else-if="selected != null && !Array.isArray(selected)" class="flex flex-row flex-wrap gap-2">
				<UTooltip
					:delay-duration="0"
					:text="selected.name">
					<div
						class="flex items-center gap-2 px-2 py-1 border-primary rounded transition-all cursor-pointer bg-gray-500"
						:class="[isSelected(selected) ? 'brightness-100' : 'brightness-50']"
						@click="isPhantomJobSelectModalOpen = true"
					>
						<img :src="selected.icon_url" class="w-6 h-6 p-0" style="filter: grayscale(100%) brightness(100%);" >
						<p class="font-black">{{selected.name}}</p>
					</div>
				</UTooltip>
				<UButton icon="i-lucide-edit" color="primary" variant="outline" @click="isPhantomJobSelectModalOpen = true" />
			</div>
		</div>

		<UModal v-model:open="isPhantomJobSelectModalOpen" title="Select The Jobs You Want to Play">
			<template #body>
				<div class="m-2 space-y-2.5 w-auto">
					<div class="flex flex-row items-center justify-between gap-4">
<!--						<p class="text-md font-semibold mb-2">{{ group.type }}</p>-->
						<div class="flex flex-row flex-wrap gap-2">
							<UTooltip
								v-for="cls in grouped"
								:key="cls.id"
								:delay-duration="0"
								:text="cls.name">
								<button
									class="flex items-center gap-2 p-3 border-primary rounded transition-all cursor-pointer bg-gray-500"
									:class="[isSelected(cls) ? 'brightness-110' : 'brightness-75']"
									@click="toggle(cls)"
								>
									<img :src="cls.icon_url" class="w-6 h-6" style="filter: grayscale(100%) brightness(100%);" >
								</button>
							</UTooltip>
						</div>
					</div>
				</div>
			</template>
			<template #footer>
				<div class="w-full flex flex-row items-center justify-end">
					<UButton color="primary" class="w-full" @click="isPhantomJobSelectModalOpen = false">
						<p class="text-center w-full">Confirm</p>
					</UButton>
				</div>
			</template>
		</UModal>
	</div>
</template>

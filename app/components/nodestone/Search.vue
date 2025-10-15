<script setup lang="ts">
/* eslint-disable  @typescript-eslint/no-explicit-any */
import type {NodestoneUser} from "#shared/types/nodestone";
import { useDebounceFn } from '@vueuse/core'

const { $api }=useNuxtApp();
const value = ref('');
const searched = ref(false);
const loading = ref(false);
const data = ref<NodestoneUser[]>([]);
const selected = defineModel<NodestoneUser | null>();
let controller: AbortController | null = null

if(selected.value){
	value.value = selected.value.name;
	data.value = [selected.value];
}

const search = async () => {
	if (!value.value.trim()) return

	// Cancel previous request
	if (controller) controller.abort()
	controller = new AbortController()

	loading.value = true
	searched.value = false

	try {
		const result: APIResponse<NodestoneUser[]> = await $api('/lodestone/search/' + value.value, {
			signal: controller.signal
		})
		data.value = result.data
		searched.value = true
	} catch (e: any) {
		if (e.name === 'AbortError') {
			console.log('Search aborted')
		} else {
			console.error(e)
		}
	} finally {
		loading.value = false
	}
}

const debouncedSearch = useDebounceFn(search, 600)

watch(value, (newVal, oldVal) => {
	if (newVal !== oldVal) {
		searched.value = false
		if (newVal.trim().length > 2) {
			debouncedSearch()
		}
	}
})

</script>

<template>
	<div class="w-full">
		<UFormField class="w-full" required>
			<UInput v-model="value" class="w-full" :loading="loading" placeholder="Enter your name" @keydown.enter="search">
				<template v-if="value?.length" #trailing>
					<UTooltip text="Search Lodestone" :content="{ side: 'right' }">
						<UButton
							:color="searched ? 'success' : 'neutral'"
							variant="link"
							size="sm"
							:icon="searched ? 'i-lucide-copy-check' : 'i-lucide-search'"
							aria-label="Copy to clipboard"
							@click="search()"
						/>
					</UTooltip>
				</template>
			</UInput>
		</UFormField>
		<div v-if="loading" class="mt-4 w-full flex flex-col max-h-48 overflow-y-scroll">
			<div class="w-full flex flex-row items-center justify-center gap-4" >
				<USkeleton class="h-12 w-12 rounded-full" />

				<div class="grid gap-2">
					<USkeleton class="h-4 w-36" />
					<USkeleton class="h-4 w-24" />
				</div>
			</div>
		</div>
		<div v-if="!loading && data.length > 0" class="mt-4 w-full flex flex-col max-h-48 overflow-y-scroll">
			<div
				v-for="user in data"
				:key="user.id"
				class="w-full px-4 py-2 rounded-lg flex flex-row hover:bg-elevated cursor-pointer"
				:class="{'border border-primary bg-elevated': selected && selected.id === user.id}"
				@click="selected = user"
			>
				<UUser
					:name="user.name"
					:description="`${user.datacenter} - ${user.world}`"
					:avatar="{
					  src: user.avatar_url
					}"
				/>
			</div>
		</div>
		<div v-if="!loading && data.length === 0 && searched" class="mt-4 w-full flex flex-col max-h-48 overflow-y-scroll">
			<p class="text-muted text-center text-sm">No Results</p>
		</div>
	</div>
</template>
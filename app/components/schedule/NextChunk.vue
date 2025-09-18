<script  lang="ts" setup="">
defineProps<{
	icon?: string,
	title?: string,
	label?: string,
}>();
</script>

<template>
    <div class="w-full h-full grid grid-cols-8 p-4">
		<div class="col-span-2 flex items-start justify-center">
			<UIcon :name="icon ?? 'i-heroicons-clock'" class="w-6 h-6 text-primary"/>
		</div>
		<div class="col-span-6 flex flex-col items-start justify-start">
			<p class="text-muted text-sm">{{title ?? 'Title'}}</p>
			<p v-if="!$slots.label" class="text-xl font-bold text-highlighted">{{label ?? 'Label'}}</p>
			<div v-else class="w-full h-full">
				<slot name="label"/>
			</div>
		</div>
    </div>
</template>
<style scoped>
</style>
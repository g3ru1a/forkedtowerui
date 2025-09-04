<script setup lang="ts">

const { interactive = true } = defineProps<{ interactive?: boolean }>();
const array=[1,2,3,4,5,6]

</script>

<template>
	<div v-if="!interactive" class="w-full flex flex-row gap-4 items-stretch justify-evenly">
		<AssignmentColumn v-for="i in array" :key="i" />
	</div>
	<div v-if="interactive" class="p-8 mx-auto w-1/2 flex flex-row gap-4 items-center justify-center">
		<AssignmentColumn v-for="i in [1,2,3]" :key="i" />
	</div>
</template>
<script setup lang="ts">

const {url, alt = 'NA', size = 'xs'} = defineProps<{
	url: string,
	alt?: string,
	size?: "xs" | "md" | "3xs" | "2xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | undefined
}>();

</script>

<template>
	<UAvatar :src="url" :alt="alt" :size="size"  icon="i-lucide-image" :ui="{root: 'bg-transparent', image: 'grayscale-100 brightness-100'}"/>
</template>
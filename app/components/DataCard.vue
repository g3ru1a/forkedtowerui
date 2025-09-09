<script  lang="ts" setup="">
const {title = "Title", value = "Value", icon="i-lucide-plus", color="muted"} = defineProps<{
	title?: string,
	value?: string,
	icon?: string,
	color?: 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
}>()

const borderByColor: Record<
	'primary'|'secondary'|'neutral'|'info'|'success'|'warning'|'error'|'muted',
	string
> = {
	primary:   'border-primary text-primary',
	secondary: 'border-secondary text-secondary',
	neutral: 'border-neutral text-neutral',
	info: 'border-info text-info',
	success: 'border-success text-success',
	warning: 'border-warning text-warning',
	error: 'border-error text-error',
	muted: 'border-muted text-higlighted'
}

</script>

<template>
	<div class="w-full h-full flex flex-col items-start justify-center p-4 bg-gradient-to-b from-muted to-muted/35 rounded-lg border-b-2" :class="borderByColor[color]">
		<div class="w-full flex flex-row gap-4 items-center justify-between">
			<p v-if="title" class="text-sm opacity-80">{{title}}</p>
			<UIcon v-if="icon" :name="icon" size="20" class=""/>
		</div>
		<p v-if="value" class="text-3xl font-bold">{{value}}</p>
	</div>
</template>
<style scoped>
</style>
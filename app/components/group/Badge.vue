<script setup lang="ts">

const { text = "NONE", color = "#FFF", gradient = null } = defineProps<{
	text?: string;
	color?: string;
	gradient?: string | null
}>();

const { generateGradient, midpointHex } = useGradient();

const start = computed(() => gradient ? color : generateGradient(color, 33)[0])
const end   =  computed(() => gradient ? gradient : generateGradient(color, 33)[1])
const width = ref(2)           // border width (px)

// surface fill inside the border. Use your app surface or keep transparent.
const fill  = ref('var(--ui-bg, transparent)')

const gradientBorderStyle = computed(() => ({
	border: `${width.value}px solid transparent`,
	borderColor: `transparent`,
	color: gradient ? midpointHex(start.value!, end.value!) : color,
	backgroundImage: `linear-gradient(${fill.value}, ${fill.value}),
                    linear-gradient(45deg, ${start.value}, ${end.value})`,
	backgroundOrigin: 'border-box',
	backgroundClip: 'padding-box, border-box',
}))

</script>

<template>
	<UBadge
		:label="text"
		size="lg"
		variant="soft"
		:style="gradientBorderStyle"
	/>
</template>
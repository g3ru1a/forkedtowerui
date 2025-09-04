<script setup lang="ts">

const slots = [1,2,3,4,5,6,7,8];

</script>

<template>
	<div class="w-full flex flex-col items-center justify-around gap-4">
		<AssignmentSlot
			v-for="i in slots"
			:key="i"
			class="opacity-0 animate-fadeIn"
			:style="{ animationDelay: `${i * 50}ms` }"
		/>
	</div>
</template>

<style scoped>
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
.animate-fadeIn { animation: fadeIn .5s ease-out forwards; }
</style>
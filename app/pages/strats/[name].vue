<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<div>
		Name: {{ route.params.name }}
	</div>
</template>
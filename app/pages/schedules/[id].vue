<script setup lang="ts">

const route = useRoute();
const { id } = route.params;

</script>

<template>
	<div class="p-8">
		<p>Schedule {{id}}</p>

		<AssignmentTable :interactive="false"/>
	</div>
</template>
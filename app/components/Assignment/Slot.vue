<template>
	<div class="w-full min-w-48 h-16 flex items-center justify-start p-2 bg-elevated rounded-lg">
		<UUser
			name="John Doe"
			description="Software Engineer"
			:avatar="{
      src: 'https://i.pravatar.cc/150?u=john-doe'
    }"
			:chip="{
      color: 'primary',
      position: 'top-right'
    }"
		/>
	</div>
</template>

<script setup lang="ts">
</script>
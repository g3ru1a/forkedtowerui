<script setup lang="ts">
definePageMeta({ i18n: false })
const route = useRoute()
const { finishLoginWithToken } = useAuth()

onMounted(async () => {
	const token = route.query.token as string | undefined

	if(token) {
		await finishLoginWithToken(token);
		return navigateTo('/');
	}else{
		return navigateTo('/login?error=auth_failed');
	}
})
</script>

<template>
	<div class="p-6 text-center text-gray-400">Signing you in…</div>
</template>

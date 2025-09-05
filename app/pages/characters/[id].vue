<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp()
const userStore = useUserStore();

async function deleteCharacter() {
	const response: APIResponse<DBCharacter> = await $api('/characters/'+route.params.id, {
		method: 'DELETE'
	});
	console.log(response);
}
</script>

<template>
	<div>
		Character: {{ userStore.characters.find(c => c.id === route.params.id)}}
		<UButton label="DELETE" type="button" variant="outline" color="error" @click="deleteCharacter()"/>
	</div>
</template>
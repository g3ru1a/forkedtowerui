<script setup lang="ts">
//
</script>

<template>
	<UFooter :ui="{ top: 'border-b border-default' }" class="bg-elevated">
		<template #left>
			<p class="text-muted text-sm">
				Copyright © {{ new Date().getFullYear() }}. All rights reserved.
			</p>
		</template>

		<template #right>
			<UColorModeButton />

			<p class="text-muted text-sm space-x-2">
				<ULink to="/tos">ToS</ULink>
				<ULink to="/privacy">Privacy Policy</ULink>
				<ULink to="/cookies">Cookie Settings</ULink>
			</p>

			<UButton
				to="https://discord.gg/forkedtower"
				target="_blank"
				icon="i-simple-icons-discord"
				aria-label="Discord"
				color="neutral"
				variant="ghost"
			/>

			<UButton
				to="https://github.com/g3ru1a/forkedtowerui"
				target="_blank"
				icon="i-simple-icons-github"
				aria-label="GitHub"
				color="neutral"
				variant="ghost"
			/>
		</template>
	</UFooter>
</template>
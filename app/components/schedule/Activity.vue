<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'

const items = [
	{
		date: 'Mar 15, 2025 at 18:36',
		title: 'Created Schedule',
		description:
			'Giki Chomusuke added a new schedule',
		icon: 'i-lucide-plus',
		slot: 'development' as const,
		developers: [
			{
				src: 'https://img2.finalfantasyxiv.com/f/15cff6ad5af687333d4ae7545c7b4ec4_7206469080400ed57a5373d0a9c55c59fc0.jpg?1758144918'
			}
		]
	},
	{
		date: 'Mar 15, 2025 at 18:20',
		title: 'Assigned User',
		description:
			'Giki Chomusuke put Davey Jones as Sage - Ranger on the Newbie Run on 23rd September at 18:00 ST.',
		icon: 'i-lucide-user',
		slot: 'development' as const,
		developers: [
			{
				src: 'https://img2.finalfantasyxiv.com/f/15cff6ad5af687333d4ae7545c7b4ec4_7206469080400ed57a5373d0a9c55c59fc0.jpg?1758144918'
			}
		]
	},
	{
		date: 'Mar 15, 2025 at 17:03',
		title: 'Registration Declined',
		description:
			'Giki Chomusuke declined Davey Jones\'s registration for 23rd September at 18:00 ST.',
		icon: 'i-lucide-circle-x',
		slot: 'development' as const,
		developers: [
			{
				src: 'https://img2.finalfantasyxiv.com/f/15cff6ad5af687333d4ae7545c7b4ec4_7206469080400ed57a5373d0a9c55c59fc0.jpg?1758144918'
			}
		]
	},
	{
		date: 'Mar 15, 2025 at 16:49',
		title: 'Schedule Deleted',
		description:
			'Giki Chomusuke deleted the schedule on 20th September at 18:00 ST.',
		icon: 'i-lucide-trash',
		slot: 'development' as const,
		developers: [
			{
				src: 'https://img2.finalfantasyxiv.com/f/15cff6ad5af687333d4ae7545c7b4ec4_7206469080400ed57a5373d0a9c55c59fc0.jpg?1758144918'
			}
		]
	},
] satisfies TimelineItem[]
</script>

<template>
	<div class="w-full flex flex-col gap-4">
		<p class="text-lg font-bold text-muted">Recent Activity</p>
		<UTimeline :items="items" class="w-full overflow-y-scroll">
			<template #development-title="{ item }">
				<div class="flex items-center gap-1">
					<span>{{ item.title }}</span>

					<UAvatarGroup size="2xs">
						<UAvatar v-for="(developer, index) of item.developers" :key="index" v-bind="developer" />
					</UAvatarGroup>
				</div>
			</template>
		</UTimeline>
	</div>
</template>

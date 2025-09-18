<script  lang="ts" setup="">

</script>

<template>
	<UCard
		class="w-full rounded-xl "
		variant="subtle"
		as="section"
		:ui="{
			root: 'p-0 flex flex-col divide-y-0 bg-gradient-to-b from-muted/50 to-muted/35 border-b-2 border-muted/50',
			header: 'p-2 sm:px-2 border-b border-muted/50',
			body: 'p-0 sm:p-0',
			footer: 'p-2 sm:px-2 mt-auto border-t border-muted/50'
		}"
	>
		<template #header>
			<div class="h-full flex flex-row items-center justify-start gap-2 p-1 2xl:p-2">
				<UIcon name="i-heroicons-clock" class="h-4 w-4" />
				<p class="text-sm text-muted">Next Run: <span class="text-highlighted">18:00ST, 17/09/2025</span></p>
			</div>
		</template>

		<div class="h-full grid grid-cols-2">
			<ScheduleNextChunk class="col-span-1 border-b border-r border-muted/50" title="Seats" label="23/48" icon="i-lucide-users" />
			<ScheduleNextChunk class="col-span-1 border-b border-muted/50" title="Registrations" label="12" icon="lucide:file-clock" />
			<ScheduleNextChunk class="col-span-1 border-b border-r border-muted/50" title="Prog Point" icon="i-lucide-flag">
				<template #label>
					<UBadge color="neutral" variant="soft" label="FToB: Newbie" class="text-green-500 bg-elevated mt-2 p-2" />
				</template>
			</ScheduleNextChunk>
			<ScheduleNextChunk class="col-span-1 border-b border-muted/50" title="Visibility" label="23/48" icon="i-lucide-eye">
				<template #label>
					<UBadge color="neutral" variant="soft" class="text-red-500 bg-elevated mt-2 p-2">
						<p><UIcon name="i-lucide-lock"/> Private</p>
					</UBadge>
				</template>
			</ScheduleNextChunk>
<!--			This can be adjusted based on the schedule content type-->
			<div class="col-span-2 flex flex-col items-start justify-start mb-3">
				<div class="flex flex-col items-start justify-start">
					<p class="p-2 text-sm font-semibold text-muted">Support Jobs</p>
					<div class="flex flex-row flex-wrap items-center justify-start px-2 gap-2">
						<UBadge color="error" variant="outline">0/3 Bard</UBadge>
						<UBadge color="warning" variant="outline">0/2 Ranger</UBadge>
						<UBadge color="warning" variant="outline">1/2 Thief</UBadge>
						<UBadge color="success" variant="outline">4/4 Geomancer</UBadge>
						<UBadge color="success" variant="outline">2/2 Time Mage</UBadge>
					</div>
				</div>
				<div class="flex flex-col items-start justify-start">
					<p class="p-2 text-sm font-semibold text-muted">Damage Jobs</p>
					<div class="flex flex-row flex-wrap items-center justify-start px-2 gap-2">
						<UBadge color="success" variant="outline">1/1 Oracle</UBadge>
						<UBadge color="success" variant="outline">7/1 Samurai</UBadge>
						<UBadge color="error" variant="outline">0/1 Berzerker</UBadge>
					</div>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="h-full flex flex-row items-center justify-between gap-2 p-1 2xl:p-2">
				<p class="text-xs 2xl:text-sm text-muted">Starting in <span class="text-highlighted">12 hours and 30 minutes.</span></p>
				<ULink href="#" class="text-xs text-primary">View Details</ULink>
			</div>
		</template>
	</UCard>
</template>

<style scoped>
</style>
<script  lang="ts" setup="">

const next = await useSchedules().getNextSchedule();

console.log(next);

const data = next.data;

const hour = new Date(data!.time).toLocaleString('en-IE', {
	hour: 'numeric',
	minute: 'numeric',
	hour12: false
}) + "ST"

const date =  new Date(data!.date).toLocaleString('en-IE', {
	day: '2-digit',
	month: 'short',
	year: '2-digit',
})

const formattedTimeRemaining = computed(() => {
	const dateRaw = data?.date // e.g. "2025-09-27T00:00:00.000000Z"
	const timeRaw = data?.time // e.g. "2025-09-26T15:35:32.000000Z"

	if (!dateRaw || !timeRaw) return 'Invalid date or time'

	// Extract date part and time part separately
	const datePart = new Date(dateRaw).toISOString().split('T')[0] // "2025-09-27"
	const timePart = new Date(timeRaw).toISOString().split('T')[1]?.replace('Z', '') // "15:35:32.000Z" → "15:35:32.000"

	const isoCombined = `${datePart}T${timePart}Z` // Combine back into full UTC datetime
	const targetDateTime = new Date(isoCombined)

	if (isNaN(targetDateTime.getTime())) return 'Invalid datetime'

	const now = new Date()
	const diffMs = targetDateTime.getTime() - now.getTime()

	if (diffMs <= 0) return 'Expired'

	const totalMinutes = Math.floor(diffMs / (1000 * 60))
	const days = Math.floor(totalMinutes / (60 * 24))
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
	const minutes = totalMinutes % 60

	const parts = []

	if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
	if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
	if (minutes > 0 || parts.length === 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)

	const last = parts.pop()
	return parts.length ? `${parts.join(', ')} and ${last}` : `${last}`
})


</script>

<template>
	<UCard
		v-if="next.success && data"
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
				<p class="text-sm text-muted">Next Run: <span class="text-highlighted">{{hour}}, {{date}}</span></p>
			</div>
		</template>

		<div class="h-full grid grid-cols-2">
			<ScheduleNextChunk
				class="col-span-1 border-b border-r border-muted/50"
				title="Seats"
				:label="`${data.filled_count}/${data.seat_count}`"
				icon="i-lucide-users" />
			<ScheduleNextChunk
				class="col-span-1 border-b border-muted/50"
				title="Registrations"
				:label="data.recruiting_count?.toString() ?? '0'"
				icon="lucide:file-clock" />
			<ScheduleNextChunk
				class="col-span-1 border-b border-r border-muted/50"
				title="Prog Point"
				icon="i-lucide-flag">
				<template #label>
					<div class="w-full max-w-36 overflow-hidden text-center flex items-center justify-start">
						<div
							class="text-center flex border rounded-md px-2 py-1"
							:style="{
								borderColor: data.type?.color_hex,
								color: data.type?.color_hex
							  }"
						>
							<p class="truncate text-ellipsis text-center text-xs">
								{{ data.type?.name }}
							</p>
						</div>
					</div>
				</template>
			</ScheduleNextChunk>
			<ScheduleNextChunk class="col-span-1 border-b border-muted/50" title="Visibility" label="23/48" icon="i-lucide-eye">
				<template #label>
					<UBadge color="neutral" variant="soft" class="bg-elevated mt-2 p-2" :class="data.public ? 'text-success' : 'text-error'">
						<p><UIcon :name="data.public ? 'i-lucide-globe' : 'i-lucide-lock'"/> {{data.public ? 'Public' : 'Private'}}</p>
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
				<p class="text-xs 2xl:text-sm text-muted">Starting in <span class="text-highlighted">{{formattedTimeRemaining}}</span></p>
				<ULink href="#" class="text-xs text-primary">View Details</ULink>
			</div>
		</template>
	</UCard>
</template>

<style scoped>
</style>
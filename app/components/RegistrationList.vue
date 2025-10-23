<script setup lang="ts">
import type { RegistrationResponse } from '#shared/types/registration'

const props = defineProps<{
	registrations: RegistrationResponse[]
}>()

// Use Map to handle UUID keys safely
const registrationsRefs = new Map<string, Element>()

const selectedRegistration = defineModel<RegistrationResponse | null>()

function preferredClassColor(classType: string) {
	if(classType == 'Tank') return 'border-blue-400 bg-gradient-to-bl from-blue-400/30 via-transparent to-transparent'
	else if(classType == 'Healer') return 'border-green-400 bg-gradient-to-bl from-green-400/30 via-transparent to-transparent'
	else return 'border-red-400 bg-gradient-to-bl from-red-400/30 via-transparent to-transparent'
}

watch(selectedRegistration, () => {
	const id = selectedRegistration.value?.id
	if (!id) return

	const el = registrationsRefs.get(id)
	if (el) {
		el.scrollIntoView({ block: 'nearest' })
	}
})
</script>


<template>
	<div class="overflow-y-auto divide-y divide-default">
		<div
			v-for="registration in registrations"
			:key="registration.id"
			:ref="el => { if (el) registrationsRefs.set(registration.id, el as Element) }"
		>
			<div
				class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
				:class="[
				  // registration.unread ? 'text-highlighted' : 'text-toned',
				  selectedRegistration?.id === registration.id
					? 'border-primary bg-primary/10'
					: 'border-(--ui-bg) hover:border-primary hover:bg-primary/5 ' + preferredClassColor(registration.preferred_class.type)
				]"
				@click="selectedRegistration = registration"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<UAvatar :src="registration.character.avatar_url" :alt="registration.character.name" size="sm"/>
						<p>{{ registration.character.name }}<span class="text-dimmed text-sm"> @ {{ registration.character.world }}</span></p>
					</div>
					<span>
            			<ClassIcon :url="registration.preferred_class.flat_icon_url" :alt="registration.preferred_class.name" size="md"/>
          			</span>
				</div>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<UBadge icon="lucide:award" label="Mastery 12" variant="soft" color="warning"/>
					</div>
					<div class="flex flex-row items-center justify-start gap-2 flex-wrap">
						<ClassIcon v-for="cls in registration.flex_classes" :key="cls.id" :url="cls.flat_icon_url" :alt="cls.name" size="xs" class="brightness-50"/>
					</div>
				</div>
				<div class="flex flex-row items-center justify-start gap-2 flex-wrap">
					<JobIcon :url="registration.preferred_job.icon_url" :alt="registration.preferred_job.name" size="md"/>
					<JobIcon v-for="job in registration.flex_jobs" :key="job.id" :url="job.icon_url" :alt="job.name" size="xs" class="brightness-75"/>
				</div>
			</div>
		</div>
	</div>
</template>

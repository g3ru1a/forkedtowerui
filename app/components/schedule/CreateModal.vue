<script lang="ts" setup>
import * as z from 'zod'
import type {FormErrorEvent, FormSubmitEvent, RadioGroupItem} from '@nuxt/ui'
import type {DBCharacter} from "#shared/types/models";

const route = useRoute();
const {findGroup} = useGroups()
const {getTypes} = useRunTypes();
const {getFights} = useFights();
const {createSchedule} = useSchedules();


const open = ref(false)

//Load Data from API
const types = await getTypes();
const groupID: ComputedRef<string> = computed(() => route.params!.group_id as string);
const group = await findGroup(groupID.value);
const fights = await getFights();

const formatted_types = computed(() => types?.map(t => ({
	label: t.name,
	value: t.id
})) || []);

// 1) Hosts (members + optional owner, deduped by user id)
const hosts = computed<User[]>(() => {
	if (!group) return []
	const all = [...(group.members ?? []), ...(group.owner ? [group.owner] : [])]
	const byId = new Map(all.map(u => [u.id, u]))
	return [...byId.values()]
})

// 2) Flat list of all characters (dedupe by character id)
const character_list = computed<DBCharacter[]>(() => {
	const flat = hosts.value.flatMap(u => u.characters ?? [])
	const seen = new Map(flat.map(c => [c.id, c]))
	return [...seen.values()]
})

// 3) Formatted for UI
const formatted_characters = computed(() =>
	character_list.value.map((char) => ({
		label: char.name,
		description: `${char.datacenter} - ${char.world}`,
		value: char.id,
		avatar: { src: char.avatar_url, alt: char.name }
	}))
)

// 4) Formatted Fights
const formatted_fights = computed(() =>
	fights?.map(f => ({
		label: f.name,
		value: f.id
	})) || []
)
z.date().min(new Date())
//Prepare Form
const _createScheduleSchema = z.object({
	time: z.string().regex(
		/^([01]\d|2[0-3]):([0-5]\d)$/,
		'Use HH:MM (00–23:59)'
	),
	date: z.string().min(1, { message: 'Date is required' }),
	require_registration: z.boolean().default(false),
	duration_hours: z.number().min(1, { message: 'Duration is required' }).max(99, { message: 'That\' too many hours' }),
	is_public: z.boolean().default(false),
	type_id: z.string().min(1, { message: 'Type is required' }),
	host_id: z.string().min(1, { message: 'Host is required' }),
	description: z.string().max(255, { message: 'Notes can\'t be longer than 255 characters'}).optional(),
	seat_count: z.number().max(48, { message: 'That\' too many slots' }).optional(),
	fight_id: z.string(),
}).superRefine((data, ctx) => {
	const now = new Date()
	const datetimeUTC = new Date(`${data.date}T${data.time}:00Z`)
	const nowUTCPlus5Min = new Date(now.getTime() + 5 * 60 * 1000)

	// Date check (is today or later)
	const dateOnly = new Date(`${data.date}T00:00:00Z`)
	if (dateOnly < new Date(now.toISOString().split('T')[0] + 'T00:00:00Z')) {
		ctx.addIssue({
			path: ['date'],
			message: 'Date must be today or in the future',
			code: z.ZodIssueCode.custom
		})
	}

	// Time check (combined date+time must be > now + 5min)
	if (datetimeUTC <= nowUTCPlus5Min) {
		ctx.addIssue({
			path: ['time'],
			message: 'Time must be at least 5 minutes from now',
			code: z.ZodIssueCode.custom
		})
	}
})

type CreateScheduleSchema = z.output<typeof _createScheduleSchema>

const state = reactive<Partial<CreateScheduleSchema>>({
	time: '18:00',
	date: new Date().toISOString().substring(0, 10),
	require_registration: false,
	duration_hours: 3,
	is_public: true,
	type_id: undefined,
	host_id: undefined,
	description: '',
	seat_count: 48,
	fight_id: formatted_fights.value && formatted_fights.value[0] ? formatted_fights.value[0].value : '',
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<CreateScheduleSchema>) {
	const result = await createSchedule(event.data);
	if (result.success) {
		toast.add({ title: 'Schedule Created', description: 'Your schedule has been created.', color: 'success' })
		open.value = false
	} else {
		toast.add({ title: 'Couldn\'t create Schedule', description: result.message, color: 'error' })
	}
}

async function onError(event: FormErrorEvent) {
	console.log(event.errors);
	toast.add({ title: 'Couldn\'t create Schedule', description: 'Make sure all the data you have entered is valid.', color: 'error' })
}

// Form Pre-defined values

const durations = ref<RadioGroupItem[]>([
	{
		label: '3 Hrs',
		id: 3
	},
	{
		label: '4 Hrs',
		id: 4
	},
	{
		label: '6 Hrs',
		id: 6
	}
])

const seat_count_options = ref<RadioGroupItem[]>([
	{
		label: 'Up to 8 Players',
		id: 8,
		disabled: true,
		description: 'Coming Soon'
	},
	{
		label: 'Up to 24 Players',
		id: 24,
		disabled: true,
		description: 'Coming Soon'
	},
	{
		label: 'Up to 48 Players',
		id: 48,
		description: 'Best for Baldesion Arsenal / Delubrum Reginae / Forked Tower'
	}
])

</script>

<template>
	<UModal
		v-model:open="open"
		:ui="{
			content: 'w-full max-w-3/4 2xl:max-w-1/2',
		}"
	>
		<UButton label="New Schedule" icon="i-lucide-plus" variant="outline"/>
		<template #header>
			<div class="w-full flex flex-row items-center gap-4">
				<UIcon name="i-lucide-calendar-plus" size="24" class="text-4xl" />
				<p class="text-lg font-bold">New Schedule</p>
			</div>
		</template>
		<template #body>
			<div class="w-full flex flex-col p-2">
				<UForm :schema="_createScheduleSchema" :state="state" class="w-full mx-auto " @submit="onSubmit" @error="onError">
					<div class="w-full grid grid-cols-2 gap-4 gap-x-8">
						<div class="w-full grid grid-flow-col grid-rows-4 justify-stretch items-start">
							<div class="flex flex-row items-center justify-between gap-4">
								<UFormField label="Date" description="Day of the raid" name="date" class="w-full">
									<UInput v-model="state.date" type="date" class="w-full"/>
								</UFormField>

								<UFormField label="Time" name="time" description="In Server Time (ST)" class="w-full">
									<UInput v-model="state.time" type="time" class="w-full"/>
								</UFormField>
							</div>
							<UFormField label="Duration" name="duration" description="How long are players expected to show up for" class="w-full">
								<div class="flex flex-col md:flex-row items-center w-full gap-2">
									<URadioGroup
										v-model="state.duration_hours"
										value-key="id"
										:items="durations"
										indicator="hidden"
										variant="card"
										orientation="horizontal"
										default-value="System"
										:ui="{ item: 'min-w-16 w-full h-auto p-2 border rounded-md' }"
										class="w-full"
									/>
									<UInputNumber v-model="state.duration_hours" :step="1" :min="1" :max="100" class="w-full md:max-w-28" size="lg" />
								</div>
							</UFormField>

							<UFormField label="Access" description="Who can participate in the raid" class="w-full">
								<div class="w-full grid grid-cols-2 gap-4 px-4 py-2">
									<UFormField name="require_registration">
										<USwitch
											v-model="state.require_registration"
											:label="state.require_registration ? 'By Application' : 'Open'"
											:description="state.require_registration ? 'People can apply to participate' : 'People can assign themselves'"
											size="sm"
											class="w-full"
										/>
									</UFormField>
									<UFormField name="is_public">
										<USwitch
											v-model="state.is_public"
											:label="state.is_public ? 'Public Run' : 'Private Run'"
											:description="state.is_public ? 'Anyone can participate' : 'Only people with the link can participate'"
											size="sm"
											class="w-full"
										/>
									</UFormField>
								</div>
							</UFormField>

							<UFormField label="Host" description="Who will host the raid" name="host_id" class="w-full">
								<USelectMenu v-model="state.host_id" :items="formatted_characters" :avatar="formatted_characters.find(c => c.value == state.host_id)?.avatar" value-key="value" placeholder="Select a character" class="w-full"/>
							</UFormField>
						</div>

						<div class="w-full grid grid-flow-col grid-rows-4">

							<UFormField label="Player Count" name="slots" class="w-full row-span-2 mb-2">
								<div class="flex flex-col md:flex-row items-center w-full gap-2">
									<URadioGroup
										v-model="state.seat_count"
										value-key="id"
										:items="seat_count_options"
										orientation="vertical"
										variant="table"
										class="w-full"
										size="sm"
									/>
								</div>
							</UFormField>

							<UFormField label="Raid" description="What Content are you tackling on" class="w-full">
								<USelectMenu v-model="state.fight_id" :items="formatted_fights" value-key="value" placeholder="Select tooling" class="w-full"/>
							</UFormField>

							<UFormField label="Prog Point" description="What's the goal of the raid" name="type_id" class="w-full">
								<USelectMenu v-model="state.type_id" :items="formatted_types" value-key="value" placeholder="Select a prog point" class="w-full"/>
							</UFormField>
						</div>
					</div>

					<UFormField hint="Optional" label="Notes" description="Any special details about the raid" name="description" class="w-full">
						<UTextarea v-model="state.description" placeholder="i.e. Marathon Run, be prepared for the long haul" autoresize class="w-full"/>
					</UFormField>

					<div class="mt-4 w-full flex flex-row items-center justify-between gap-4">
						<UButton type="button" variant="outline" color="neutral">
							<p class="text-center">Cancel</p>
						</UButton>
						<UButton type="submit" class="w-1/2">
							<p class="text-center">Create</p>
						</UButton>
					</div>
				</UForm>
			</div>
		</template>
	</UModal>
</template>
<style scoped>
</style>
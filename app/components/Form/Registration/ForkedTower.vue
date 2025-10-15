<script setup lang="ts">
import * as z from 'zod'
import type {FormSubmitEvent, FormErrorEvent, RadioGroupItem} from '@nuxt/ui'

defineProps<{
	schedule: Schedule,
}>();

const toast = useToast()
const route = useRoute()
const router = useRouter()

const { getFFClasses } = useFFClasses()
const { getPhantomJobs } = usePhantomJobs()
const { getCharacters } = useCharacters()

const classes = await getFFClasses();
const phantomJobs = await getPhantomJobs();
const characters = await getCharacters();
console.log(classes, phantomJobs, characters)

const selectedCharacter = ref<NodestoneUser | null>(null);
const selectedClasses = ref<FFClass[] | null>(null);
const selectedPreferredClass = ref<FFClass | null>(null);
const selectedPhantomJobs = ref<PhantomJob[] | null>(null);
const selectedPreferredPhantomJob = ref<PhantomJob | null>(null);

const characterSelectionTabs = [
	{
		label: 'Search Lodestone',
		icon: 'i-lucide-search',
		slot: 'lodestone',
		value: 'lodestone',
	},
	{
		label: 'Your Characters',
		icon: 'i-lucide-list',
		value: 'saved',
		slot: 'saved'
	}
]
//
// const activeTab = computed({
// 	get() {
// 		return (route.query.tab as string) || 'saved'
// 	},
// 	set(tab) {
// 		router.push({
// 			path: route.path,
// 			query: { tab },
// 			hash: '#character-selection'
// 		})
// 	}
// })

const characterRadioGroupList = computed<RadioGroupItem[]>(() =>
	characters ? characters.map((c) => ({
		label: c.name,
		value: c.id,
		world: c.world,
		datacenter: c.datacenter,
		avatar_url: c.avatar_url
	})) : []
)


const registrationSchema = z.object({
	character_uuid: z.string().uuid({
		message: 'Please select a character.'
	}),
	preferred_class: z.string().min(1, {
		message: 'Please select a class.'
	}),
	preferred_phantom_job: z.string().min(1, {
		message: 'Please select a phantom job.'
	}),
	alternative_classes: z.array(z.string()).optional(),
	alternative_phantom_jobs: z.array(z.string()).optional(),
	can_solo_heal: z.boolean(),
	can_english: z.boolean(),
	can_place_markers: z.boolean(),
	notes: z.string().max(1000).optional()
})

type RegistrationSchema = z.output<typeof registrationSchema>

const state = reactive<Partial<RegistrationSchema>>({
	character_uuid: '',
	preferred_class: '',
	preferred_phantom_job: '',
	alternative_classes: [],
	alternative_phantom_jobs: [],
	can_solo_heal: false,
	can_english: false,
	can_place_markers: false,
	notes: ''
})

async function onSubmit(event: FormSubmitEvent<RegistrationSchema>) {
	toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
	console.log(event.data)
}

async function onError(event: FormErrorEvent){
	console.error(event);
	if (event?.errors?.[0]?.id) {
		const element = document.getElementById(event.errors[0].id)
		element?.focus()
		element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}
}

const healerSelected = computed(() => {
	if(selectedPreferredClass.value && selectedPreferredClass.value.type == 'Healer') return true;
	return !!selectedClasses.value?.some(c => c.type == 'Healer');
})

watch(selectedCharacter, (newValue) => {
	if (newValue) {
		state.character_uuid = newValue.id
	} else {
		state.character_uuid = ''
	}
})

watch(selectedClasses, (newValue) => {
	if (newValue) {
		state.alternative_classes = newValue.map(c => c.id)
	} else {
		state.alternative_classes = []
	}
})

watch(selectedPreferredClass, (newValue) => {
	if (newValue) {
		state.preferred_class = newValue.id
	} else {
		state.preferred_class = ''
	}
})

watch(selectedPhantomJobs, (newValue) => {
	if (newValue) {
		state.alternative_phantom_jobs = newValue.map(c => c.id)
	} else {
		state.alternative_phantom_jobs = []
	}
})

watch(selectedPreferredPhantomJob, (newValue) => {
	if (newValue) {
		state.preferred_phantom_job = newValue.id
	} else {
		state.preferred_phantom_job = ''
	}
})

watch(state, (newValue) => {
	console.log(newValue);
})

</script>

<template>
	<UCard variant="subtle">
		<UForm v-if="classes.success && phantomJobs.success" :schema="registrationSchema" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">

			<UFormField
				name="character_uuid"
				label="Select Your Character"
				description="Search from the Lodestone or select from your saved characters."
			>
				<UTabs :default-value="characters ? 'saved' : 'lodestone'" :items="characterSelectionTabs" variant="link" class="w-full">
					<template #lodestone>
						<NodestoneSearch v-model="selectedCharacter"/>
					</template>

					<template #saved>
						<URadioGroup v-model="state.character_uuid" color="primary" indicator="start" variant="card" orientation="horizontal" :items="characterRadioGroupList">
							<template #label="{ item }">
								<UUser
									:name="item.label ?? 'John Doe'"
									:description="`${item.world} - ${item.datacenter}`"
									:avatar="{
										  src: item.avatar_url ?? 'https://i.pravatar.cc/150?u=john-doe',
										  icon: 'i-lucide-image'
										}"
									size="xl"
								/>
							</template>
						</URadioGroup>
					</template>
				</UTabs>
			</UFormField>

			<UFormField
				name="preferred_class"
				label="Preferred Class"
				description="Select which class you would prefer to play."
				class="flex flex-col lg:flex-row justify-between items-start gap-4" :ui="{wrapper: 'lg:max-w-1/2'}"
			>
				<FormClassSelect v-model="selectedPreferredClass" no-base-classes/>
			</UFormField>

			<UFormField
				name="alternative_classes"
				label="Flex Classes"
				description="Select one or more classes you're willing to play if you can't play your preferred class."
				class="flex flex-col lg:flex-row justify-between items-start gap-4" :ui="{wrapper: 'lg:max-w-1/2'}"
			>
				<FormClassSelect v-model="selectedClasses" multiple no-base-classes/>
			</UFormField>
			<UFormField
				name="preferred_phantom_job"
				label="Preferred Phantom Job"
				description="Select which Phantom Job you would prefer to play."
				class="flex flex-col lg:flex-row justify-between items-start gap-4" :ui="{wrapper: 'lg:max-w-1/2'}"
			>
				<FormPhantomJobSelect v-model="selectedPreferredPhantomJob" no-base-classes/>
			</UFormField>

			<UFormField
				name="alternative_phantom_jobs"
				label="Flex Phantom Jobs"
				description="Select one or more phantom jobs you're willing to play if you can't play your preferred one."
				class="flex flex-col lg:flex-row justify-between items-start gap-4" :ui="{wrapper: 'lg:max-w-1/2'}"
			>
				<FormPhantomJobSelect v-model="selectedPhantomJobs" multiple no-base-classes/>
			</UFormField>


			<div class="flex flex-col lg:flex-row gap-4 items-stretch w-full">
				<UFormField v-if="healerSelected" name="can_solo_heal" class="flex-1">
					<UCheckbox
						v-model="state.can_solo_heal"
						class="h-full"
						color="primary"
						label="I Can Solo Heal"
						description="I can handle a whole party, even if it might include Gar"
						variant="card"
						:ui="{root: 'lg:min-h-32'}"
					/>
				</UFormField>

				<UFormField name="can_english" class="flex-1">
					<UCheckbox
						v-model="state.can_english"
						class="h-full"
						color="primary"
						label="I speak English fluently"
						description="This helps us ensure smooth communication during raids and coordinate team strategies effectively."
						variant="card"
						:ui="{root: 'lg:min-h-32'}"
					/>
				</UFormField>

				<UFormField name="can_place_markers" class="flex-1">
					<UCheckbox
						v-model="state.can_place_markers"
						class="h-full"
						color="primary"
						label="I Can Place Waymarks"
						description="Being able to place markers swiftly is a huge help especially during marathons or when we dont have enough party leads."
						variant="card"
						:ui="{root: 'lg:min-h-32'}"
					/>
				</UFormField>
			</div>




			<UFormField
				name="notes"
				label="Notes"
				description="Any additional notes you'd like to leave."
			>
				<UTextarea v-model="state.notes" placeholder="e.g. I really hate monks, please dont put me in a party with them..." class="w-full"/>
			</UFormField>

			<div class="w-full flex flex-row items-center justify-end">
				<UButton class="w-full" variant="outline" type="submit">
					<p class="text-center w-full">
						Register
					</p>
				</UButton>
			</div>
		</UForm>
	</UCard>
</template>

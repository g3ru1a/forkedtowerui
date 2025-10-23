<script setup lang="ts">
import type {FormSubmitEvent, FormErrorEvent, RadioGroupItem} from '@nuxt/ui'
import {registrationSchemaZod} from '#shared/schemas/registration.schema';
import type {RegistrationSchema} from '#shared/schemas/registration.schema';

const {schedule} = defineProps<{
	schedule: Schedule,
}>();

const toast = useToast()
const registrations = useRegistrations();

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

const loading = ref(false);
const registrationSuccess = ref(true);

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

const characterRadioGroupList = computed<RadioGroupItem[]>(() =>
	characters ? characters.map((c) => ({
		label: c.name,
		value: c.id,
		world: c.world,
		datacenter: c.datacenter,
		avatar_url: c.avatar_url
	})) : []
)

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
	loading.value = true;
	const payload = registrations.mapToPayload(event.data, schedule.id, schedule.private_key);
	const result = await registrations.create(payload);
	console.log(result);
	if(result.success){
		registrationSuccess.value = true;
		toast.add({ title: 'Success', description: "You've registered to the run!", color: 'success' })
	}else{
		console.error(result.message, result.errors);
		toast.add({ title: 'Error', description: result.message, color: 'error' });
	}

	loading.value = false;
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

</script>

<template>
	<UCard variant="subtle">
		<UForm v-if="!registrationSuccess && classes.success && phantomJobs.success" :schema="registrationSchemaZod" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">

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
				<UButton class="w-full" variant="outline" type="submit" :loading="loading">
					<p class="text-center w-full">
						{{loading ? 'Submitting...' : 'Submit Registration'}}
					</p>
				</UButton>
			</div>
		</UForm>

<!--		SUCCESS BLOCK -->
		<div v-if="registrationSuccess" class="w-full flex flex-col items-center justify-center gap-4 py-8 text-center">
			<!-- Icon -->
			<UIcon name="i-lucide-check-circle" class="text-5xl text-success" />

			<!-- Headline -->
			<h2 class="text-2xl font-semibold text-success">
				Registration Successful!
			</h2>

			<!-- Success Message -->
			<p class="text-muted">
				Your registration has been received. We'll review it shortly and get in touch if anything needs your attention.
			</p>
		</div>


	</UCard>
</template>

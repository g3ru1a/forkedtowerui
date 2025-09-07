<script setup lang="ts">
import * as z from 'zod';
const toast = useToast();
const errored = ref(false);

type StepId = 'name' | 'badge' | 'color' | 'discord' | 'finish'
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid hex')
const inviteRe = /^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord(?:app)?\.com\/invite\/)[A-Za-z0-9-]{2,32}(?:[/?].*)?$/i


const { createGroup } = useGroups();

const createdGroup = ref<Group | null>(null)
const groupPath = computed(() =>
	createdGroup.value && createdGroup.value.id ? `/groups/${createdGroup.value.id}` : '/groups'
)

const customGradient = ref(false);
const steps = [
	{
		id: 'name',
		title: 'What\'s your Groups Name?',
		icon: 'mdi:rename-box-outline'
	},
	{
		id: 'badge',
		title: 'Stand out with a Badge',
		icon: 'mdi:badge-account-horizontal-outline'
	},
	{
		id: 'color',
		title: 'Pick a Color for your Badge',
		icon: 'mdi:palette-outline'
	},
	{
		id: 'discord',
		title: 'Link your Discord',
		icon: 'i-simple-icons-discord'
	},
	{
		id: 'finish',
		title: 'All Done!',
		icon: 'i-lucide-circle-check'
	}
]

const progress = ref(0);
const currentStep = computed(() => steps[progress.value]);
const hasNextStep = computed(() => progress.value < steps.length-1);
const hasPrevStep = computed(() => progress.value > 0);
const loading = ref(false);

const _createGroupSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	badge_text: z.string().min(1, 'Badge is required').max(4, 'Badge must be at most 4 characters'),
	color: z.string().regex(/^#[0-9a-fA-F]{6}$/, {message: 'Color must be a valid hex color code'}),
	gradient: z.string().regex(/^#[0-9a-fA-F]{6}$/, {message: 'Gradient must be a valid hex color code'}).optional(),
	discord_invite: z.string().regex(inviteRe, 'Enter a valid Discord invite URL').optional()
})

const stepSchema = computed<Record<StepId, z.ZodTypeAny>>(() => ({
	name: z.object({ name: z.string().min(1, 'Name is required') }),
	badge: z.object({ badge_text: z.string().min(1, 'Badge is required').max(4, 'Max 4 chars') }),
	color: z.object({
		color: hex,
		gradient: customGradient.value ? hex : hex.optional()
	}),
	discord: z.object({
		discord_invite: z
			.string()
			.regex(inviteRe, 'Enter a valid Discord invite URL')
			.optional()
	}),
	finish: z.object({})
}))

type CreateGroupSchema = z.output<typeof _createGroupSchema>;

const state = reactive<Partial<CreateGroupSchema>>({
	name: undefined,
	badge_text: undefined,
	color: '#f1f1f1',
	gradient: '#f1f1f1',
	discord_invite: undefined
});

const canNext = computed(() => {
	const id = currentStep.value!.id as StepId
	return stepSchema.value[id].safeParse(state).success
})

async function create() {
	console.log("SUBMIT")
	loading.value = true;
	const response: Group | null = await createGroup(state as Group)
	if (response) {
		createdGroup.value = response
		progress.value++
		loading.value = false;
	} else {
		loading.value = false;
		errored.value = true;
		toast.add({title: 'Something went wrong', color: 'error', icon: 'i-lucide-x'})
	}
}

function finish() {
	reloadNuxtApp();
}

function next() {
	if (!canNext.value) return
	progress.value++
}

function prev() {
	progress.value--;
}


async function copyLink() {
	try {
		await navigator.clipboard.writeText(groupPath.value)
		toast.add({ title: 'Group link copied', icon: 'i-lucide-check' })
	} catch {
		toast.add({ title: 'Could not copy link', color: 'error', icon: 'i-lucide-x' })
	}
}

// Modal Stuff
const open = ref(false)
function openModal() {
	open.value = true;
}
defineExpose({ openModal });
</script>

<template>
	<UForm :schema="_createGroupSchema" :state="state">
		<UModal
			v-model:open="open"
			class="transition-all duration-300"
			:title="currentStep!.id != 'finish' ? 'Create your Group' : ''"
			:description="currentStep!.id != 'finish' ? 'This is how players will see you on represented on our platform.' : ''"
		>
			<template v-if="currentStep && currentStep.id == 'finish'" #content>
				<div class="w-full flex flex-col gap-4 p-4 lg:p-8" >
					<!-- Success header -->
					<div class="flex flex-col items-center text-center gap-2">
						<div class="size-14 rounded-full bg-success/10 flex items-center justify-center">
							<UIcon name="i-lucide-circle-check" class="text-success" size="28" />
						</div>
						<p class="text-xl font-bold">{{ currentStep.title }}</p>
						<p class="text-sm text-muted-foreground max-w-prose">
							Your group is ready to go. <br> Here’s a quick summary and a few next steps.
						</p>
					</div>

					<!-- Preview card -->
					<UCard>
						<template #header>
							<div class="flex items-center justify-between">
								<span class="font-semibold">Group preview</span>
								<UBadge variant="outline" color="neutral" :label="createdGroup?.badge_text || '—'" />
							</div>
						</template>

						<div class="flex items-center gap-4">
							<GroupBadge
								:text="createdGroup?.badge_text || 'BDGE'"
								:color="createdGroup?.color"
								:gradient="customGradient ? createdGroup?.gradient : null"
							/>
							<div class="min-w-0">
								<p class="font-medium truncate">{{ createdGroup?.name || 'Untitled Group' }}</p>
								<p class="text-xs text-muted-foreground">
									Owner: {{createdGroup?.owner?.username}}
								</p>
							</div>
						</div>

						<template #footer>
							<div class="flex flex-row items-center justify-evenly gap-3">
								<UButton
									:to="`/groups/${createdGroup?.id}`"
									size="xs"
									variant="ghost"
									icon="lucide:users-round"
									label="View Group"
								/>
								<UButton
									size="xs"
									variant="ghost"
									icon="lucide:copy"
									label="Copy Group Link"
									@click="copyLink"
								/>
								<UButton
									size="xs"
									variant="ghost"
									icon="lucide:layout-dashboard"
									:to="`/dashboard/${createdGroup?.id}`"
									label="Open Dashboard"
								/>
							</div>
						</template>
					</UCard>

					<!-- Next steps -->
					<div class="space-y-2">
						<p class="text-sm font-medium">What’s next?</p>
						<ul class="space-y-1">
							<li class="flex items-start gap-2">
								<UIcon name="i-lucide-check" class="mt-0.5 text-success" />
								<span class="text-sm">Share your group page with your players.</span>
							</li>
							<li class="flex items-start gap-2">
								<UIcon name="i-lucide-check" class="mt-0.5 text-success" />
								<span class="text-sm">Create schedules and invite members in group dashboard.</span>
							</li>
							<li class="flex items-start gap-2">
								<UIcon name="i-lucide-check" class="mt-0.5 text-success" />
								<span class="text-sm">Let your players sign up to your scheduled runs.</span>
							</li>
						</ul>
					</div>

					<!-- Actions -->
					<div class="w-full flex flex-wrap items-center justify-center gap-2">
						<UButton
							color="primary"
							icon="i-lucide-check"
							label="Done"
							@click="finish()"
						/>
					</div>
				</div>
			</template>
			<template #body>
				<div v-if="currentStep" class="w-full flex flex-col gap-4">
					<Transition mode="out-in" name="slide-fade" appear :duration="300">
						<div v-if="currentStep.id == 'name'" class="w-full flex flex-col gap-4">
							<UIcon v-if="currentStep.icon" :name="currentStep.icon" size="48" class="text-4xl mx-auto"/>
							<p class="text-xl font-bold text-center">{{currentStep.title}}</p>
							<UFormField name="name"  class="w-2/3 mx-auto">
								<UInput v-model="state.name" class="w-full" variant="soft" size="xl" label="Group Name" placeholder="Group Name" />
							</UFormField>
						</div>

						<div v-else-if="currentStep.id == 'badge'" class="w-full flex flex-col items-center justify-center  gap-4">
							<UIcon v-if="currentStep.icon" :name="currentStep.icon" size="48" class="text-4xl mx-auto"/>
							<p class="text-xl font-bold text-center">{{currentStep.title}}</p>
							<GroupBadge
								v-if="state.badge_text"
								:text="state.badge_text.length > 0 ? state.badge_text : 'BDGE'"
								color="#f1f1f1f1"/>
							<UFormField name="badge_text"  class="w-full flex flex-row items-center justify-center gap-4">
								<UInput v-model="state.badge_text" class="" variant="soft" size="xl" label="Badge" placeholder="Badge" :maxlength="4" :ui="{base: 'text-center'}">
									<template #trailing>
										<div
											id="character-count"
											class="text-xs text-muted tabular-nums"
											aria-live="polite"
											role="status"
										>
											{{ state.badge_text?.length }}/{{ 4 }}
										</div>
									</template>
								</UInput>
							</UFormField>
						</div>

						<div v-else-if="currentStep.id == 'color'" class="w-full flex flex-col items-center justify-center gap-4">
							<UIcon v-if="currentStep.icon" :name="currentStep.icon" size="48" class="text-4xl mx-auto"/>
							<p class="text-xl font-bold text-center">{{currentStep.title}}</p>
							<GroupBadge
								:text="state.badge_text"
								:color="state.color"
								:gradient="customGradient ? state.gradient : null" />
							<div class="w-2/3 flex flex-row items-center justify-center gap-4">
								<UPopover mode="hover" :close-delay="300">
									<UInput
										v-model="state.color"
										variant="soft"
										size="xl"
										label="Color"
										placeholder="Color"
										:ui="{base: 'text-center'}"
										:style="{backgroundColor: state.color}"
									/>

									<template #content>
										<UColorPicker v-model="state.color" />
									</template>
								</UPopover>
								<UPopover v-if="customGradient" mode="hover" :close-delay="300">
									<UInput
										v-model="state.gradient"
										variant="soft"
										size="xl"
										label="Color"
										placeholder="Color"
										:ui="{base: 'text-center'}"
										:style="{backgroundColor: state.gradient}"
									/>

									<template #content>
										<UColorPicker v-model="state.gradient" />
									</template>
								</UPopover>
							</div>
							<UCheckbox v-model="customGradient" label="Custom Gradient?" />
						</div>

						<div v-else-if="currentStep.id == 'discord'" class="w-full flex flex-col gap-4">
							<UIcon v-if="currentStep.icon" :name="currentStep.icon" size="48" class="text-4xl mx-auto"/>
							<p class="text-xl font-bold text-center">{{currentStep.title}}</p>
							<UFormField name="discord_invite"  class="w-2/3 mx-auto">
								<UInput v-model="state.discord_invite" class="w-full" label="Discord Invite Link" placeholder="Discord Invite Link" :ui="{base: 'text-center'}" />
							</UFormField>
						</div>
					</Transition>
				</div>
				<div v-else>
					<p class="text-sm text-center font-bold text-error">Something Went Wrong.</p>
				</div>
			</template>
			<template v-if="currentStep!.id!='finish'" #footer>
				<div class="w-full flex flex-rew items-center gap-x-3">
					<UButton :disabled="!hasPrevStep" label="Back" icon="i-lucide-chevron-left" color="neutral" variant="outline" @click="prev()"/>
					<UProgress v-model="progress" class="w-full" :max="steps.length-1"/>
					<UButton v-if="currentStep!.id != 'discord'" :disabled="!hasNextStep || !canNext" label="Next" trailing-icon="i-lucide-chevron-right" color="primary" variant="solid" size="sm" @click="next()"/>
					<UButton v-if="currentStep!.id == 'discord'" :loading="loading" :disabled="!hasNextStep || !canNext" label="Create" trailing-icon="i-lucide-chevron-right" color="primary" variant="solid" size="sm" @click="create()"/>
				</div>
			</template>
		</UModal>
	</UForm>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(20px);
	opacity: 0;
}
</style>
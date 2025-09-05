<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'
import type {NodestoneUser} from "#shared/types/nodestone";
import type {CharacterVerification, DBCharacter} from "#shared/types/models";

const { $api }=useNuxtApp();

const steps: StepperItem[] = [
	{
		title: 'Search',
		description: 'Find your character',
		icon: 'i-lucide-search'
	}, {
		title: 'Verify',
		description: 'Confirm it\'s yours',
		icon: 'lucide:user-round-check'
	}, {
		title: 'Complete',
		description: 'All done!',
		icon: 'i-lucide-check'
	}
]

const character = ref<NodestoneUser | null>(null);
const fullCharacter = ref<DBCharacter | null>(null);
const stepper = useTemplateRef('stepper')
const step1loading = ref(false);
const step2loading = ref(false);

const open = ref(false)

function finish(){
	character.value = null;
	fullCharacter.value = null;
	while(stepper.value?.hasPrev){
		stepper.value.prev();
	}
	open.value = false;
}

async function storeCharacter(){
	if(!character.value) return;
	step1loading.value = true;
	try{
		const response: APIResponse<DBCharacter> = await $api('/characters', {
			method: 'POST',
			body: {
				lodestone_id: character.value.id
			}
		});
		fullCharacter.value = response.data;
		step1loading.value = false;
		stepper.value?.next();
	}catch(e){
		console.log(e)
	}
}

async function verifyCharacter(){
	if(!fullCharacter.value) return;
	step2loading.value = true;
	try{
		const response: APIResponse<CharacterVerification> = await $api('/characters/verify/'+fullCharacter.value.lodestone_id);
		step2loading.value = false;
		if(response.data.status) {
			stepper.value?.next();
		}
	}catch (e){
		console.log(e)
	}
}

function openModal() {
	open.value = true;
}
defineExpose({ openModal });
</script>

<template>
	<UModal v-model:open="open" class="transition-all duration-300">
		<template #content>
			<div class="w-full py-12 px-4 flex flex-row items-streth justify-evenly">
				<UStepper ref="stepper" disabled :items="steps" class="w-full">
					<template #content="{ item }">
						<div
							v-if="item.title === 'Search'"
							class="w-full flex flex-col items-center justify-center space-y-4"
						>
							<UIcon name="lucide:user-round-search" size="48" class="text-4xl" />
							<p>What's your Character's Name?</p>
							<div class="w-2/3">
								<NodestoneSearch v-model="character"/>
							</div>
							<div v-if="character" class="w-full flex flex-col items-center justify-center space-y-4">
								<UButton label="Next" :loading="step1loading" variant="outline" trailing-icon="i-lucide-arrow-right" @click="storeCharacter()" />
							</div>
						</div>

						<div
							v-if="item.title === 'Verify' && fullCharacter"
							class="w-full flex flex-col items-center justify-center space-y-4"
						>
							<UUser
								:name="fullCharacter.name"
								:description="`${fullCharacter.datacenter} - ${fullCharacter.world}`"
								:avatar="{
								  src: fullCharacter.avatar_url
								}"
								class="border border-primary bg-elevated px-4 py-2 rounded-lg"
							/>
							<div class="mx-auto w-2/3">
								<p class="text-center text-muted">
									Add the code below to <ULink :to="`https://na.finalfantasyxiv.com/lodestone/character/${fullCharacter.lodestone_id}`" active target="_blank">your lodestone <UIcon name="i-lucide-external-link" size="12" /></ULink> description then click Verify
								</p>
							</div>
							<div class="mx-auto w-1/2 font-bold text-center text-3xl py-4 bg-elevated rounded-lg">
								<p>{{fullCharacter.verification_code}}</p>
							</div>
							<div class="w-full flex flex-row items-center justify-center gap-2">
								<UButton label="Back" variant="outline" color="neutral" trailing-icon="i-lucide-arrow-left" @click="stepper?.prev()" />
								<UButton label="Verify" :loading="step2loading" variant="outline" trailing-icon="i-lucide-arrow-right" @click="verifyCharacter()" />
							</div>
						</div>

						<div
							v-if="item.title === 'Complete' && fullCharacter"
							class="w-full flex flex-col items-center justify-center space-y-4"
						>
							<p class="text-3xl font-bold">Congratulations!</p>
							<UUser
								:name="fullCharacter.name"
								:description="`${fullCharacter.datacenter} - ${fullCharacter.world}`"
								:avatar="{
								  src: fullCharacter.avatar_url
								}"
								class="border border-primary bg-elevated px-4 py-2 rounded-lg"
							/>
							<p class="text-muted">Has been successfully added to your account</p>
							<UButton label="Finish" :loading="step2loading" trailing-icon="i-lucide-check" @click="finish()" />
						</div>
					</template>
				</UStepper>
			</div>
		</template>
	</UModal>
</template>


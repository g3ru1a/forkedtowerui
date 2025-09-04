<script setup lang="ts">


const {data} = defineProps(['data']);
const { generateGradient } = useGradient();
const router = useRouter();

const random_slots = Math.floor(Math.random() * (parseInt(data['slots']) + 1));
const gradient = generateGradient(data['type']['color_hex'], 50);

</script>

<template>
	<div
		class="relative pt-0.5 w-full rounded-md bg-gradient-to-br from-[var(--from)] to-[var(--to)] cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10"
		:style="{ '--from': gradient[0], '--to': gradient[1] }"
		@click="router.push(`/schedules/${data['id']}`)"
	>
		<!-- border text -->
		<span
			class="absolute -top-2 left-4 dark:bg-gray-900 rounded-lg px-2 text-xs border border-[var(--border-color)]"
			:style="{ '--border-color': gradient[0] }">
			{{data['type']['name']}}
		  </span>
		<div class="px-4 py-2 dark:bg-gray-800 rounded-md w-full flex flex-col items-center justify-start space-y-2">
			<div class="text-xs mt-1 flex flex-row lg:flex-col xl:flex-row items-center justify-between w-full">
				<div class="text-sm font-bold flex flex-row items-center justify-center text-primary">
					<UIcon name="bxs:time-five" size="12" class="inline md:hidden lg:inline mr-1" />
					<p class="">{{data['time']}}</p>
				</div>
				<div class="text-sm font-bold flex flex-row items-center justify-center text-primary">
					<p class="bg-gradient-to-tr border-b border-gray-400 text-white px-1 rounded-md">{{data['group']['name']}}</p>
				</div>
			</div>
			<div class="text-xs flex flex-row lg:flex-col-reverse xl:flex-row items-center justify-between lg:justify-center xl:justify-between w-full space-x-2">
				<div class="text-sm flex flex-row items-center justify-center">
					<UIcon name="lucide:users" size="12" class="mr-1" />
					<p class="">{{random_slots}}/{{data['slots']}}</p>
				</div>
				<div class="text-sm w-full text-right lg:text-center xl:text-right">
					<p>Host: <span>{{data['host']['username']}}</span></p>
				</div>
			</div>
		</div>
	</div>
</template>
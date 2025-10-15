<script  lang="ts" setup="">
import canRegister from "~/middleware/can-register";
definePageMeta({
	middleware: [canRegister]
})
const { canRegisterSchedule } = useSchedules();
console.log(canRegisterSchedule);
</script>

<template>
    <div class="p-4 md:p-8 w-full xl:w-10/12 xl:mx-auto">
		<p class="text-2xl font-bold mb-4">Raid Registration</p>
		<div v-if="canRegisterSchedule" class="w-full flex flex-col md:flex-row-reverse gap-4 items-start justify-evenly">
			<ScheduleSummary class="md:w-1/3" :schedule="canRegisterSchedule" />
			<FormRegistrationForkedTower class="w-full md:w-2/3" :schedule="canRegisterSchedule" />
		</div>
	</div>
</template>
<style scoped>
</style>
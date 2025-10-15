export default defineNuxtRouteMiddleware(async (to) => {
	const schedule_id = to.params.schedule_id as string | undefined
	const schedule_secret = to.params.schedule_secret as string | undefined

	if (!schedule_id) {
		return abortNavigation({
			statusCode: 404,
			statusMessage: 'Missing schedule ID'
		})
	}

	const { canRegister } = useSchedules()
	const result = await canRegister(schedule_id, schedule_secret)

	if (!result.success) {
		return abortNavigation({
			statusCode: 404,
			statusMessage: 'Schedule not found or not accessible'
		})
	}
})

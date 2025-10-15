<script  lang="ts" setup="">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { useClipboard } from '@vueuse/core'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import {UIcon, UTooltip} from "#components";

const toast = useToast()
const { copy } = useClipboard()
const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')

const {schedules, getSchedules} = useSchedules()
const table = useTemplateRef('table')

const data = await getSchedules(true);

console.log(data)

const columns: TableColumn<Schedule>[] = [

	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			let color = '#a1a1a1';
			switch (row.original.status) {
				case 'planned':
					color = '#facc15'; // yellow-400
					break;
				case 'scheduled':
					color = '#60a5fa'; // blue-400
					break;
				case 'recruiting':
					color = '#34d399'; // emerald-400
					break;
				case 'ongoing':
					color = '#f59e0b'; // amber-500
					break;
				case 'finished':
					color = '#a78bfa'; // violet-400
					break;
				case 'cancelled':
					color = '#f87171'; // red-400
					break;
			}
			const gradient = useGradient().generateGradient(color, 20);
			return h('div', {class: 'flex flex-row items-center gap-2'}, [
				h('p', {
						class: 'text-sm'+ ` bg-gradient-to-r bg-clip-text text-transparent`,
						style: `background-image: linear-gradient(90deg, ${gradient[0]}, ${gradient[1]});`
					},
					String(row.original.status).charAt(0).toUpperCase() + String(row.original.status).slice(1)),
			]);
		}
	},
	{
		accessorKey: 'host',
		header: 'Host',
		cell: ({ row }) => {
			return h('div', { class: 'flex items-center gap-3' }, [
				h(UTooltip, {
					text: row.original.host ? row.original.host.name : 'N/A',
					arrow: true,
					delayDuration: 0
				}, [
					h(UAvatar, {
						name: row.original.host ? row.original.host.name : 'N/A',
						src: row.original.host ? row.original.host.avatar_url : undefined,
						size: 'md'
					}),
				]),
				h('div', {class: 'hidden 2xl:block'}, [
					h('p', { class: 'font-medium text-highlighted' }, row.original.host ? row.original.host.name : 'N/A'),
					h('p', { class: '' }, `${row.original.host ? row.original.host.world : 'N/A'} - ${row.original.host ? row.original.host.datacenter : 'N/A'}`)
				])
			])
		}
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			const hour = new Date(row.original.time).toLocaleString('en-IE', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: false
			}) + "ST"

			const date =  new Date(row.getValue('date')).toLocaleString('en-IE', {
				day: '2-digit',
				month: 'short',
				year: '2-digit',
			})

			// return `${date} - ${hour} `
			return h('div', { class: 'flex flex-col-reverse items-start space-x-2 font-medium' }, [
				h('p', { class: 'text-sm text-muted/80' }, date),
				h('p', { class: 'text-xs' }, hour)
			])
		}
	},
	{
		accessorKey: 'duration',
		header: 'Duration',
		cell: ({ row }) => {
			return `${row.original.duration_hours} Hours`
		}
	},
	{
		accessorKey: 'prog point',
		header: 'Prog Point',
		cell: ({ row }) => {
			return h('div', {class: 'w-full max-w-36 overflow-hidden text-center flex items-center justify-start'}, h('div',
				{ class: 'text-center flex border rounded-md px-2 py-1', style: `border-color: ${row.original.type?.color_hex}; color: ${row.original.type?.color_hex}` },
				[h('p', {class:'truncate text-ellipsis text-center text-xs'}, row.original.type?.name)]))
		}
	},
	{
		accessorKey: 'public',
		header: 'Visibility',
		cell: ({row}) => {
			return h('div', {class: 'flex flex-row items-center gap-2'}, [
				h(UIcon, {
					class: 'text-sm'+ ` text-${row.original.public ? 'success' : 'error'}`,
					name: row.original.public ? 'i-lucide-globe' : 'i-lucide-lock',
				}),
				h('p', {class: 'text-sm'+ ` text-${row.original.public ? 'success' : 'error'}`}, row.original.public ? 'Public' : 'Private')
			]);
		}
	},
	{
		id: 'action'
	}
]

const pagination = ref({
	pageIndex: 0,
	pageSize: 9
})

function getDropdownActions(schedule: Schedule): DropdownMenuItem[][] {
	return [
		[
			{
				label: 'View',
				icon: 'material-symbols:open-in-new',
			},
			{
				label: 'Copy Registration Link',
				icon: 'i-lucide-copy',
				onSelect: () => {
					const locale = useLocale().locale.value.code;
					const host = useRequestURL().host+'/'+locale;
					const link = schedule.public ? host+`/register/${schedule.id}` : host+`/register/${schedule.id}/${schedule.private_key}`;
					copy(link)

					toast.add({
						title: 'Link copied to clipboard!',
						color: 'success',
						icon: 'i-lucide-circle-check',
						duration: 1500,
					})
				}
			}
		],
		[
			{
				label: 'Edit',
				icon: 'i-lucide-edit',
				color: 'warning'
			},
			{
				label: 'Delete',
				icon: 'i-lucide-trash',
				color: 'error'
			}
		]
	]
	// return [
	// 	[
	// 		{
	// 			label: 'Copy user Id',
	// 			icon: 'i-lucide-copy',
	// 			onSelect: () => {
	// 				// copy(user.id.toString())
	// 				//
	// 				// toast.add({
	// 				// 	title: 'User ID copied to clipboard!',
	// 				// 	color: 'success',
	// 				// 	icon: 'i-lucide-circle-check'
	// 				// })
	// 			}
	// 		}
	// 	],
	// ]
}
</script>

<template>
    <div class="w-full h-full">

		<UTable
			v-if="schedules"
			ref="table"
			v-model:pagination="pagination"
			:data="schedules"
			:columns="columns"
			:pagination-options="{
						getPaginationRowModel: getPaginationRowModel()
					  }"
			class="flex-1"
		>
			<template #view-cell="{ row }">
				<UButton color="primary" size="lg" variant="soft" to="/schedules/view">
					<UIcon name="material-symbols:open-in-new" />
				</UButton>
			</template>
			<template #action-cell="{ row }">
				<UDropdownMenu
					:items="getDropdownActions(row.original)"
					size="sm"
				>
					<UButton
						icon="i-lucide-ellipsis-vertical"
						color="neutral"
						variant="ghost"
						aria-label="Actions"
					/>
				</UDropdownMenu>
			</template>
		</UTable>

		<div class="flex justify-center border-t border-default pt-4">
			<UPagination
				:default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
				:items-per-page="table?.tableApi?.getState().pagination.pageSize"
				:total="table?.tableApi?.getFilteredRowModel().rows.length"
				@update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
			/>
		</div>
    </div>
</template>
<style scoped>
</style>
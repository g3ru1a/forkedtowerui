<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'


const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const {schedules, getSchedules} = useSchedules()
const table = useTemplateRef('table')

await getSchedules();

console.log(schedules.value)

const columns: TableColumn<Schedule>[] = [
	{
		id: 'expand',
		cell: ({ row }) =>
			h(UButton, {
				color: 'neutral',
				variant: 'ghost',
				icon: 'i-lucide-chevron-down',
				square: true,
				'aria-label': 'Expand',
				ui: {
					leadingIcon: [
						'transition-all',
						row.getIsExpanded() ? 'duration-200 rotate-180' : ''
					]
				},
				onClick: () => row.toggleExpanded()
			})
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
				day: 'numeric',
				month: 'numeric',
				year: 'numeric',
			})

			return `${date} - ${hour} `
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
		accessorKey: 'seats',
		header: 'Seats',
		cell: ({ row }) => {
			const amount = Number.parseFloat(String(row.original.seat_count))
			const formatted = `12/${amount}`;
			return h('div', { class: 'flex flex-row items-center space-x-2 font-medium' }, [
				h('p', { class: 'text-sm' }, formatted),
				h(UBadge, { size: 'sm', variant: 'outline', color: 'warning' }, `+23`)
			])
		}
	},
	{
		accessorKey: 'public',
		header: 'Visibility',
		cell: ({row}) => {
			return h(UBadge,
				{
					class: 'font-bold',
					variant: 'outline',
					color: row.getValue('public') ? 'success' : 'error',
					icon: row.getValue('public') ? 'i-lucide-globe' : 'i-lucide-lock',
				}, row.getValue('public') ? 'Public' : 'Private');
		}
	},
	{
		accessorKey: 'host',
		header: 'Host',
		cell: ({ row }) => {
			return h('div', { class: 'flex items-center gap-3' }, [
				h(UAvatar, {
					name: row.original.host ? row.original.host.name : 'N/A',
					src: row.original.host ? row.original.host.avatar_url : undefined,
					description: row.original.host ? `${row.original.host.world} - ${row.original.host.datacenter}` : 'N/A',
					size: 'lg'
				}),
				h('div', undefined, [
					h('p', { class: 'font-medium text-highlighted' }, row.original.host ? row.original.host.name : 'N/A'),
					h('p', { class: '' }, `${row.original.host ? row.original.host.world : 'N/A'} - ${row.original.host ? row.original.host.datacenter : 'N/A'}`)
				])
			])
		}
	},
	{
		accessorKey: 'prog point',
		header: 'Prog Point',
		cell: ({ row }) => {
			return h('div', {class: 'w-full text-center flex items-center justify-center'}, h('div',
				{ class: 'w-full text-center flex border rounded-md px-2 py-1', style: `border-color: ${row.original.type?.color_hex}; color: ${row.original.type?.color_hex}` },
				[h('p', {class:'w-full text-center'}, row.original.type?.name)]))
		}
	},
	{
		accessorKey: 'description',
		header: 'Notes',
	}
]

const pagination = ref({
	pageIndex: 0,
	pageSize: 8
})

const globalFilter = ref('')

</script>

<template>
	<div class="w-full flex flex-col items-stretch">
		<div class="w-full flex flex-row items-center justify-between mb-4">
			<UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
			<div class="flex flex-row items-center">
				<UDropdownMenu
					:items="
					  table?.tableApi
						?.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => ({
						  label: upperFirst(column.id),
						  type: 'checkbox' as const,
						  checked: column.getIsVisible(),
						  onUpdateChecked(checked: boolean) {
							table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
						  },
						  onSelect(e?: Event) {
							e?.preventDefault()
						  }
						}))
					"
					:content="{ align: 'end' }"
				>
					<UButton
						label="Columns"
						color="neutral"
						variant="outline"
						trailing-icon="i-lucide-chevron-down"
					/>
				</UDropdownMenu>
			</div>
		</div>

		<UTable
			v-if="schedules"
			ref="table"
			v-model:global-filter="globalFilter"
			v-model:pagination="pagination"
			:data="schedules"
			:columns="columns"
			:pagination-options="{
						getPaginationRowModel: getPaginationRowModel()
					  }"
			class="flex-1"
		/>

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
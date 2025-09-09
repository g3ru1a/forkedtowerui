<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'


const {getSchedules} = useSchedules()
const table = useTemplateRef('table')

const data = ref<Schedule[] | null>([]);

data.value = await getSchedules()

const columns: TableColumn<Schedule>[] = [
	{
		accessorKey: 'id',
		header: '#',
		cell: ({ row }) => `#${row.getValue('id')}`
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			return new Date(row.getValue('date')).toLocaleString('en-US', {
				day: 'numeric',
				month: 'short',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
		}
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'amount',
		header: () => h('div', { class: 'text-right' }, 'Amount'),
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'EUR'
			}).format(amount)
			return h('div', { class: 'text-right font-medium' }, formatted)
		}
	}
]

const pagination = ref({
	pageIndex: 0,
	pageSize: 8
})

</script>

<template>
	<div class="w-full flex flex-col items-stretch">
		<UTable
			v-if="data"
			ref="table"
			v-model:pagination="pagination"
			:data="data"
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
import { createApi } from "effector"

import { ColumnCreate, Task, TaskCreate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid.ts"

import { $columns } from "./column.store.ts"

export const $columnsApi = createApi($columns, {
	addColumn(state, payload: ColumnCreate) {
		const order = state.length + 1
		return [...state, { ...payload, id: uuid.v4(), order, task: [] }]
	},
	removeColumn(state, payload: string) {
		return state
			.filter(col => col.id !== payload)
			.map((col, i) => ({ ...col, order: i + 1 }))
	},
	addTask(state, payload: TaskCreate) {
		const findColumnIndex = state.findIndex(col => col.id === payload.columnId)
		if (findColumnIndex < 0) return state
		const findColumn = state[findColumnIndex]
		const newTask: Task = {
			...payload,
			tags: [],
			priority: null,
			description: null,
			order: findColumn.task.length + 1,
			id: uuid.v4(),
		}
		const newColumn = { ...findColumn, task: [...findColumn.task, newTask] }
		const filteredColumn = state.filter(col => col.id !== findColumn.id)
		return [...filteredColumn, newColumn]
	},
	removeTask(state, payload: string) {
		const findColumnIndex = state.findIndex(col =>
			col.task.find(task => task.id === payload),
		)
		if (findColumnIndex < 0) return state
		const findColumn = state[findColumnIndex]
		const newColumn = {
			...findColumn,
			task: findColumn.task.filter(task => task.id !== payload),
		}
		const filteredColumn = state.filter(col => col.id !== findColumn.id)
		return [...filteredColumn, newColumn]
	},
})

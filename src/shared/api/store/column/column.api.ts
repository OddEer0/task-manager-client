import { createApi, sample } from "effector"

import { ColumnCreate, ColumnUpdate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $tasks } from "../task"

import { $columns } from "./column.store"

export const $columnsApi = createApi($columns, {
	addColumn(state, payload: ColumnCreate) {
		const order = state.length + 1
		return [...state, { ...payload, id: uuid.v4(), order }]
	},
	updateColumn(state, payload: ColumnUpdate) {
		return state.map(col => (col.id === payload.id ? { ...col, ...payload.column } : col))
	},
	deleteColumn(state, payload: string) {
		return state
			.filter(col => col.id !== payload)
			.map((col, i) => ({ ...col, order: i + 1 }))
	},
})

sample({
	clock: $columnsApi.deleteColumn,
	source: $tasks,
	fn: (tasks, deleteArg) => tasks.filter(task => task.columnId !== deleteArg),
	target: $tasks,
})

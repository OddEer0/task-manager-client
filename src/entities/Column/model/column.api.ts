import { createApi } from "effector"

import { ColumnCreate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $columns } from "./column.store"

export const $columnsApi = createApi($columns, {
	addColumn(state, payload: ColumnCreate) {
		const order = state.length + 1
		return [...state, { ...payload, id: uuid.v4(), order }]
	},
	removeColumn(state, payload: string) {
		return state
			.filter(col => col.id !== payload)
			.map((col, i) => ({ ...col, order: i + 1 }))
	},
})

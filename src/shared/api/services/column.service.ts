import { uuid } from "@/shared/package/uuid.ts"

import { COLUMN_KEY } from "../constants.ts"
import { Column, ColumnCreate, ColumnServer } from "../types"

class ColumnService {
	getColumnsByProjectId(id: string): Column[] | null {
		const columnsJson = localStorage.getItem(COLUMN_KEY)
		if (!columnsJson) return null
		const columnsParse = JSON.parse(columnsJson) as ColumnServer[]
		const columns = columnsParse || []
		const filteredColumns = columns.filter(col => col.projectId === id)
		return filteredColumns.map(({ id, bg, color, name, order }) => ({
			id,
			bg,
			color,
			name,
			order,
		}))
	}
	createColumn(projectId: string, columnData: ColumnCreate): ColumnServer | null {
		const columnsJson = localStorage.getItem(COLUMN_KEY)
		if (!columnsJson) return null
		const columnsParse = JSON.parse(columnsJson) as ColumnServer[]
		const columns = columnsParse || []
		const column: ColumnServer = { ...columnData, projectId, id: uuid.v4() }
		localStorage.setItem(COLUMN_KEY, JSON.stringify([...columns, column]))
		return column
	}
}

export const columnService = new ColumnService()

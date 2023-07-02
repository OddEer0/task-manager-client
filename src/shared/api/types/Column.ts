export interface ColumnCreate {
	name: string
	bg: string
	projectId: string
}

export interface Column extends ColumnCreate {
	order: number
	id: string
}

export interface ColumnUpdate {
	column: Partial<Omit<Column, "id" | "projectId">>
	id: string
}

export type ColumnServer = Column

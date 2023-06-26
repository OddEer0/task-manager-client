export interface ColumnCreate {
	name: string
	bg: string
	color: string
	projectId: string
}

export interface Column extends ColumnCreate {
	order: number
	id: string
}

export type ColumnServer = Column

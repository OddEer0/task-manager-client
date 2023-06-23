export interface ColumnCreate {
	name: string
	bg: string
	color: string
	order: number
}

export interface Column extends ColumnCreate {
	id: string
}

export interface ColumnServer extends Column {
	projectId: string
}

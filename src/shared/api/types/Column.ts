import { Task } from "./Task.ts"

export interface ColumnCreate {
	name: string
	bg: string
	color: string
	projectId: string
}

export interface Column extends ColumnCreate {
	order: number
	id: string
	task: Task[]
}

export type ColumnServer = Column

import { Task } from "@/shared/api"

export const taskByColumnIdSelector = (state: Task[], [columnId]: [string]) =>
	state.filter(task => task.columnId === columnId)

export const taskByIdSelector = (state: Task[], [id]: [string]) =>
	state.find(task => task.id === id)

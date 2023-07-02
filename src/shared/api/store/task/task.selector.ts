import { Task } from "@/shared/api"

export const taskByColumnIdSelector = (state: Task[], [columnId]: [string]) =>
	state.filter(task => task.columnId === columnId)

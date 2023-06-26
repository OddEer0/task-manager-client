import { Column } from "@/shared/api"

export const columnByProjectIdSelector = (state: Column[], [id]: [string]) =>
	state.filter(col => col.projectId === id)

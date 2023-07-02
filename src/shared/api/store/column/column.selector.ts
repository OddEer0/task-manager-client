import { Column } from "@/shared/api"

export const columnByProjectIdSelector = (state: Column[], [projectId]: [string]) =>
	state.filter(col => col.projectId === projectId)

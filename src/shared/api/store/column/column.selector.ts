import { Column } from "@/shared/api"

export const columnByProjectIdSelector = (state: Column[], [projectId]: [string]) =>
	state.filter(col => col.projectId === projectId)

export const columnByIdSelector = (state: Column[], [id]: [string]) =>
	state.find(col => col.id === id)

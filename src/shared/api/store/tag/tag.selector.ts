import { Tag } from "@/shared/api"

export const tagByProjectIdSelector = (state: Tag[], [id]: [string | undefined]) =>
	state.filter(tag => tag.projectId === id)

export const tagByIdSelector = (state: Tag[], [id]: [string]) =>
	state.find(tag => tag.id === id)

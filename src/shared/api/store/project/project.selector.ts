import { Project } from "@/shared/api"

export const projectByIdSelector = (state: Project[], [id]: [string]) =>
	state.find(project => project.id === id)

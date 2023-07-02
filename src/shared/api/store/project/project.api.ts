import { createApi } from "effector"

import { ProjectCreate, ProjectUpdate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $projects } from "./project.store"

export const $projectsApi = createApi($projects, {
	addProject(state, payload: ProjectCreate) {
		return [...state, { ...payload, id: uuid.v4(), taskCount: 0 }]
	},
	updateProject(state, payload: ProjectUpdate) {
		return state.map(proj =>
			proj.id === payload.id ? { ...proj, ...payload.project } : proj,
		)
	},
	deleteProject(state, payload: string) {
		return state.filter(proj => proj.id !== payload)
	},
})

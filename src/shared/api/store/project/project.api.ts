import { createApi } from "effector"

import { ProjectCreate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $projects } from "./project.store"

export const $projectsApi = createApi($projects, {
	addProject(state, payload: ProjectCreate) {
		return [...state, { ...payload, id: uuid.v4(), taskCount: 0 }]
	},
	removeProject(state, payload: string) {
		return state.filter(proj => proj.id !== payload)
	},
})

import { createApi, sample } from "effector"

import { $columnsApi, Column, ProjectCreate, ProjectUpdate, Tag } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $columns } from "../column"
import { $tags } from "../tag"

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

sample({
	clock: $projectsApi.deleteProject,
	source: $columns,
	fn: (columns, deleteArg): Column[] => {
		const deletedColumns = columns.filter(col => col.projectId === deleteArg)
		deletedColumns.forEach(col => $columnsApi.deleteColumn(col.id))
		return columns.filter(col => col.projectId !== deleteArg)
	},
	target: $columns,
})

sample({
	clock: $projectsApi.deleteProject,
	source: $tags,
	fn: (tags, deleteArg): Tag[] => tags.filter(tag => tag.projectId !== deleteArg),
	target: $tags,
})

import { createApi, sample } from "effector"

import { Tag, TagCreate, TagUpdate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

import { $tasks } from "../task"

import { $tags } from "./tag.store"

export const $tagsApi = createApi($tags, {
	addTag(state, paylaod: TagCreate) {
		const isDuplicate = state.some(
			tag => tag.name === paylaod.name && tag.projectId === paylaod.projectId,
		)
		if (isDuplicate) {
			return state
		}
		const newTag: Tag = { ...paylaod, id: uuid.v4(), bg: "#000000", color: "#ffffff" }
		return [...state, newTag]
	},
	updateTag(state, payload: TagUpdate) {
		return state.map(tag => (payload.id === tag.id ? { ...tag, ...payload.tag } : tag))
	},
	deleteTag(state, payload: string) {
		return state.filter(tag => tag.id !== payload)
	},
})

sample({
	clock: $tagsApi.updateTag,
	source: $tasks,
	fn: (state, tagUpdateArg) => {
		return state.map(task => {
			if (task.tags.some(tag => tag.id === tagUpdateArg.id)) {
				return {
					...task,
					tags: task.tags.map(tag =>
						tag.id === tagUpdateArg.id ? { ...tag, ...tagUpdateArg.tag } : tag,
					),
				}
			}
			return task
		})
	},
	target: $tasks,
})

sample({
	clock: $tagsApi.deleteTag,
	source: $tasks,
	fn: (state, deleteArg) => {
		return state.map(task => {
			if (task.tags.some(tag => tag.id === deleteArg)) {
				return { ...task, tags: task.tags.filter(tag => tag.id !== deleteArg) }
			}
			return task
		})
	},
	target: $tasks,
})

import { createApi } from "effector"

import { Tag, TagCreate } from "@/shared/api"
import { uuid } from "@/shared/package/uuid"

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
	updateTag(state, payload) {
		return state.map(tag => (payload.id === tag.id ? { ...tag, ...payload.tag } : tag))
	},
	deleteTag(state, payload) {
		return state.filter(tag => tag.id !== payload)
	},
})

import { createApi } from "effector"

import { uuid } from "@/shared/package/uuid"

import { Task, TaskAddTag, TaskCreate, TaskRemoveTag, TaskUpdate } from "../../types"

import { $tasks } from "./task.store"

export const $tasksApi = createApi($tasks, {
	addTask(state, payload: TaskCreate) {
		const columnTasks = state.filter(task => task.columnId === payload.columnId)
		const newTask: Task = {
			...payload,
			description: null,
			order: columnTasks.length + 1,
			id: uuid.v4(),
			tags: [],
			priority: null,
		}
		return [...state, newTask]
	},
	deleteTask(state, payload: string) {
		const deletedTask = state.find(task => task.id === payload)
		if (!deletedTask) return
		const mappedTasks = state
			.filter(task => task.columnId === deletedTask.columnId && task.id !== payload)
			.map((task, i) => ({ ...task, order: i + 1 }))
		const filteredTasks = state.filter(task => task.columnId !== deletedTask.columnId)
		return [...filteredTasks, ...mappedTasks]
	},
	updateTask(state, payload: TaskUpdate) {
		return state.map(task =>
			task.id === payload.id ? { ...task, ...payload.task } : task,
		)
	},
	addTag(state, payload: TaskAddTag) {
		return state.map(task =>
			task.id === payload.id ? { ...task, tags: [...task.tags, payload.tag] } : task,
		)
	},
	removeTag(state, { tagId, taskId }: TaskRemoveTag) {
		return state.map(task =>
			task.id === taskId
				? { ...task, tags: task.tags.filter(tag => tag.id !== tagId) }
				: task,
		)
	},
})

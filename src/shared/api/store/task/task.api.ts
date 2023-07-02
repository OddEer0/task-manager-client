import { createApi } from "effector"

import { uuid } from "@/shared/package/uuid"

import { Task, TaskCreate } from "../../types"

import { $tasks } from "./task.store"

// OPTIMIZATION?
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
	removeTask(state, payload: string) {
		const deletedTask = state.find(task => task.id === payload)
		if (!deletedTask) return
		const mappedTasks = state
			.filter(task => task.columnId === deletedTask.columnId && task.id !== payload)
			.map((task, i) => ({ ...task, order: i + 1 }))
		const filteredTasks = state.filter(task => task.columnId !== deletedTask.columnId)
		return [...filteredTasks, ...mappedTasks]
	},
})

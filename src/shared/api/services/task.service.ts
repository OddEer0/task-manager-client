import { TASK_KEY } from "../constants.ts"
import { Task, TaskServer } from "../types"

class TaskService {
	getTasks() {
		const tasks = localStorage.getItem(TASK_KEY)
		return JSON.parse(tasks) as TaskServer[]
	}

	getTasksByColumnId(id: string): Task {
		const tasksJson = localStorage.getItem(TASK_KEY)
		const tasks = JSON.parse(tasksJson) as TaskServer[]
		const filteredTasks = tasks.filter(task => task.columnId === id)
		return filteredTasks.map(({ name, tags, order, id }) => ({ id, name, tags, order }))
	}
}

export const taskService = new TaskService()

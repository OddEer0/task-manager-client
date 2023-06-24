import { TASK_KEY } from "../constants.ts"
import { Task, TaskServer } from "../types"

class TaskService {
	getTasksByColumnId(id: string): Task[] | null {
		const tasksJson = localStorage.getItem(TASK_KEY)
		if (!tasksJson) return null
		const tasks = JSON.parse(tasksJson) as TaskServer[]
		const filteredTasks = tasks.filter(task => task.columnId === id)
		return filteredTasks.map(({ name, tags, order, id }) => ({ id, name, tags, order }))
	}
}

export const taskService = new TaskService()

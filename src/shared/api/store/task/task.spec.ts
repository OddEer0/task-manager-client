import { allSettled, fork } from "effector"

import { $tasksApi } from "./task.api.ts"
import { mockCreateTask, mockTasks, mockUpdateTask } from "./task.mock.ts"
import { $tasks } from "./task.store.ts"

describe("Task model testing", () => {
	it("Should default value empty array", () => {
		const scope = fork()
		expect(scope.getState($tasks)).toEqual([])
	})

	it("Should create task", async () => {
		const scope = fork()

		await allSettled($tasksApi.addTask, {
			scope,
			params: mockCreateTask,
		})

		expect(scope.getState($tasks).length).toBe(1)
	})

	it("Should delete task", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		expect(scope.getState($tasks).length).toBe(2)

		await allSettled($tasksApi.deleteTask, {
			scope,
			params: mockTasks[0].id,
		})
		expect(scope.getState($tasks).length).toBe(1)
	})

	it("Should update task", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		expect(scope.getState($tasks).length).toBe(2)
		expect(scope.getState($tasks)[0].name).toBe(mockTasks[0].name)

		await allSettled($tasksApi.updateTask, {
			scope,
			params: mockUpdateTask,
		})
		expect(scope.getState($tasks)[0].name).toBe(mockUpdateTask.task.name)
	})
})

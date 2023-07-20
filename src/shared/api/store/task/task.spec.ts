import { allSettled, fork } from "effector"

import {
	mockTaskAddTag,
	mockTaskChangePriority,
	mockTaskRemoveTag,
	taskByColumnIdSelector,
	taskByIdSelector,
} from "@/shared/api"

import { $tasksApi } from "./task.api"
import { mockCreateTask, mockTasks, mockUpdateTask } from "./task.mock"
import { $tasks } from "./task.store"

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

	it("Should task add tag", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		expect(scope.getState($tasks)[0].tags.length).toBe(1)

		await allSettled($tasksApi.addTag, {
			scope,
			params: mockTaskAddTag,
		})

		expect(scope.getState($tasks)[0].tags.length).toBe(2)
	})

	it("Should task remove tag", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		expect(scope.getState($tasks)[0].tags.length).toBe(1)

		await allSettled($tasksApi.removeTag, {
			scope,
			params: mockTaskRemoveTag,
		})

		expect(scope.getState($tasks)[0].tags.length).toBe(0)
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

	it("Should add priority", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		expect(scope.getState($tasks)[0].priority).toBeNull()
		await allSettled($tasksApi.changePriority, {
			scope,
			params: mockTaskChangePriority,
		})
		expect(scope.getState($tasks)[0].priority).toBe("low")
	})
})

describe("Task selector testing", () => {
	it("taskByColumnIdSelector", () => {
		const selectTasks = taskByColumnIdSelector(mockTasks, [mockTasks[0].columnId])
		expect(selectTasks).toEqual([mockTasks[0]])
		const selectTasksSecond = taskByColumnIdSelector(mockTasks, ["id"])
		expect(selectTasksSecond.length).toBe(0)
	})

	it("taskByIdSelector", () => {
		const findTask = taskByIdSelector(mockTasks, [mockTasks[0].id])
		expect(findTask).toEqual(mockTasks[0])
		const definedTask = taskByIdSelector(mockTasks, ["fake"])
		expect(definedTask).toBeUndefined()
	})
})

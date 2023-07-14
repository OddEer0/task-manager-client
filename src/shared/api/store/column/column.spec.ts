import { allSettled, fork } from "effector"

import {
	$columns,
	$columnsApi,
	columnByIdSelector,
	columnByProjectIdSelector,
} from "@/shared/api"

import { $tasks, mockTasks } from "../task"

import { mockColumns, mockCreateColumn, mockUpdateColumn } from "./column.mock"

describe("Column model testing", () => {
	it("Should default state empty array", () => {
		const scope = fork()
		expect(scope.getState($columns)).toEqual([])
	})

	it("Should create column", async () => {
		const scope = fork()
		expect(scope.getState($columns).length).toBe(0)

		await allSettled($columnsApi.addColumn, {
			scope,
			params: mockCreateColumn,
		})
		expect(scope.getState($columns).length).toBe(1)
	})

	it("Should delete column", async () => {
		const scope = fork({
			values: [
				[$columns, mockColumns],
				[$tasks, mockTasks],
			],
		})
		const getColumnTasks = () =>
			scope.getState($tasks).filter(task => task.columnId === mockColumns[0].id)
		expect(scope.getState($columns).length).toBe(2)
		expect(getColumnTasks().length).toBe(1)

		await allSettled($columnsApi.deleteColumn, {
			scope,
			params: mockColumns[0].id,
		})
		expect(scope.getState($columns).length).toBe(1)
		expect(getColumnTasks().length).toBe(0)
	})

	it("Should update column", async () => {
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})
		expect(scope.getState($columns)[0].name).toBe(mockColumns[0].name)

		await allSettled($columnsApi.updateColumn, {
			scope,
			params: mockUpdateColumn,
		})
		expect(scope.getState($columns)[0].name).toBe(mockUpdateColumn.column.name)
	})
})

describe("Column selector testing", () => {
	it("columnByProjectIdSelector", () => {
		const selectColumns = columnByProjectIdSelector(mockColumns, [
			mockColumns[0].projectId,
		])
		expect(selectColumns).toEqual([mockColumns[0]])
		const selectColumnsSecond = columnByProjectIdSelector(mockColumns, ["id"])
		expect(selectColumnsSecond.length).toBe(0)
	})

	it("columnByIdSelector", () => {
		const findColumn = columnByIdSelector(mockColumns, [mockColumns[0].id])
		expect(findColumn).toEqual(mockColumns[0])
		const definedColumn = columnByIdSelector(mockColumns, ["id"])
		expect(definedColumn).toBeUndefined()
	})
})

import { allSettled, fork } from "effector"

import { $columns, $columnsApi } from "@/shared/api"
import {
	mockColumns,
	mockCreateColumn,
	mockUpdateColumn,
} from "@/shared/api/store/column/column.mock.ts"

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
			values: new Map([[$columns, mockColumns]]),
		})
		expect(scope.getState($columns).length).toBe(2)

		await allSettled($columnsApi.deleteColumn, {
			scope,
			params: mockColumns[0].id,
		})
		expect(scope.getState($columns).length).toBe(1)
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

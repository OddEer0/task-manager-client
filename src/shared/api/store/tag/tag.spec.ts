import { allSettled, fork } from "effector"

import { $tagsApi } from "@/shared/api"

import { mockTagCreate, mockTagUpdate, mockTags } from "./tag.mock"
import { $tags } from "./tag.store"

describe("tag model testing", () => {
	it("Should default value empty array", () => {
		const scope = fork()
		expect(scope.getState($tags)).toEqual([])
	})

	it("Should create Tag", async () => {
		const scope = fork()

		await allSettled($tagsApi.addTag, {
			scope,
			params: mockTagCreate,
		})

		expect(scope.getState($tags).length).toBe(1)
	})

	it("Should does not create copy tag", async () => {
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		expect(scope.getState($tags).length).toBe(mockTags.length)
		await allSettled($tagsApi.addTag, {
			scope,
			params: mockTagCreate,
		})
		expect(scope.getState($tags).length).toBe(mockTags.length)
	})

	it("Should delete tag", async () => {
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		expect(scope.getState($tags).length).toBe(mockTags.length)
		await allSettled($tagsApi.deleteTag, {
			scope,
			params: mockTags[0].id,
		})
		expect(scope.getState($tags).length).toBe(mockTags.length - 1)
	})

	it("Should update tag", async () => {
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		expect(scope.getState($tags).length).toBe(mockTags.length)
		await allSettled($tagsApi.updateTag, {
			scope,
			params: mockTagUpdate,
		})
		expect(scope.getState($tags)[0].name).toBe(mockTagUpdate.tag.name)
	})
})

import { uuid } from "@/shared/package/uuid"

describe("uuid package testing", () => {
	it("Should v4 method return string", () => {
		const id = uuid.v4()
		expect(typeof id).toBe("string")
	})

	it("Should v4 method return 36 length string", () => {
		const id = uuid.v4()
		expect(id.length).toBe(36)
	})
})

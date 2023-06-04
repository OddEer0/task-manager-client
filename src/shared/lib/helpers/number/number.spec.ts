import { concatNumber } from "./number"

describe("Number concat helpers testing", () => {
	it("Concat default params", () => {
		const concat = concatNumber([4, 7, 2])
		expect(concat).toBe("4,7,2")
	})

	it("Concat separator param", () => {
		const concat = concatNumber([4, 7, 2], "=")
		expect(concat).toBe("4=7=2")
	})

	it("Concat not array params", () => {
		const concat = concatNumber([])
		expect(concat).toBe("")
	})
})

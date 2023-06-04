import { firstLetterUpperCase } from "./string"

describe("First Latter Upper Case helpers testing", () => {
	it("firstLetterUpperCase default use", () => {
		const str = firstLetterUpperCase(["first", "second", "third"])
		expect(str).toBe("First Second Third")
	})

	it("firstLetterUpperCase separator testing", () => {
		const str = firstLetterUpperCase(["first", "second", "third"], "=")
		expect(str).toBe("First=Second=Third")
	})
})

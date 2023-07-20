import {
	PRIORITY_DEFAULT_COLOR,
	PRIORITY_EXTRA_COLOR,
	PRIORITY_HIGH_COLOR,
	PRIORITY_LOW_COLOR,
	PRIORITY_MEDIUM_COLOR,
} from "./constants"
import { getPriorityColor } from "./helpers"

describe("getPriorityColor helper testing", () => {
	it("Should return string", () => {
		const color = getPriorityColor(null)
		expect(typeof color).toBe("string")
	})

	it("Should return color", () => {
		const lowColor = getPriorityColor("low")
		const mediumColor = getPriorityColor("medium")
		const highColor = getPriorityColor("high")
		const extraColor = getPriorityColor("extra")
		const defaultColor = getPriorityColor(null)
		expect(lowColor).toBe(PRIORITY_LOW_COLOR)
		expect(mediumColor).toBe(PRIORITY_MEDIUM_COLOR)
		expect(highColor).toBe(PRIORITY_HIGH_COLOR)
		expect(extraColor).toBe(PRIORITY_EXTRA_COLOR)
		expect(defaultColor).toBe(PRIORITY_DEFAULT_COLOR)
	})
})

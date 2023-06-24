import { classname } from "./index"

describe("test classname helpers", () => {
	it("string params", () => {
		let classes = classname("first", "second", "third")
		expect(classes).toBe("first second third")

		classes = classname()
		expect(classes).toBe("")
	})

	it("object params", () => {
		let classes = classname({ first: true, second: false, third: true })
		expect(classes).toBe("first third")

		classes = classname({ first: false, second: false, third: false })
		expect(classes).toBe("")
	})

	it("string and object params", () => {
		let classes = classname("flat-first", "flat-second", {
			first: true,
			second: false,
			third: true,
		})
		const hasEl = true
		const notEl = false
		expect(classes).toBe("flat-first flat-second first third")

		classes = classname(hasEl && "flat-first", notEl && "flat-second", {
			first: true,
			second: false,
		})
		expect(classes).toBe("flat-first first")

		classes = classname("first", { second: true, third: false }, "four", {
			fife: true,
			six: false,
		})
		expect(classes).toBe("first second four fife")
	})

	it("null, undefined property", () => {
		const classes = classname(null, undefined, false, "first")
		expect(classes).toBe("first")
	})

	it("array property", () => {
		const classes = classname("first", ["second", ["third", "four"], "fifth"])
		expect(classes).toBe("first second third four fifth")
	})
})

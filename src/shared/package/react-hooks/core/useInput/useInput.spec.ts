import { renderHook } from "@testing-library/react"

import { useInput } from "@/shared/package/react-hooks"

describe("useInput hook testing", () => {
	it("Should return object, property value string and onChange function", () => {
		const { result } = renderHook(() => useInput())
		expect(typeof result.current).toBe("object")
		expect(typeof result.current.value).toBe("string")
		expect(typeof result.current.onChange).toBe("function")
	})

	it("Should initial param working", () => {
		const value = "I string"

		const { result } = renderHook(() => useInput(value))
		expect(result.current.value).toBe(value)
	})
})

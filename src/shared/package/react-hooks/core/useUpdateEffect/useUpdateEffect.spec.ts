import { renderHook } from "@testing-library/react"

import { useUpdateEffect } from "@/shared/package/react-hooks"

describe("useUpdateEffect hook testing", () => {
	it("Should return undefined", () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useUpdateEffect(fn))
		expect(typeof result.current).toBe("undefined")
	})

	it("Should function does not activate", () => {
		const fn = jest.fn()
		renderHook(() => useUpdateEffect(fn))
		expect(fn).toHaveBeenCalledTimes(0)
	})

	it("Should function activate with rerender(update)", () => {
		const fn = jest.fn()
		const { rerender } = renderHook(() => useUpdateEffect(fn))
		rerender()
		expect(fn).toHaveBeenCalledTimes(1)
		rerender()
		expect(fn).toHaveBeenCalledTimes(2)
	})

	it("Should function does not activate with empty array deps", () => {
		const fn = jest.fn()
		const { rerender } = renderHook(() => useUpdateEffect(fn, []))
		rerender()
		expect(fn).toHaveBeenCalledTimes(0)
		rerender()
		expect(fn).toHaveBeenCalledTimes(0)
	})
})

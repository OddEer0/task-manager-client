import { renderHook } from "@testing-library/react"

import { useThrottleCallback } from "@/shared/package/react-hooks/core/useThrottleCallback/index.ts"

describe("useThrottleCallback hook testing", () => {
	it("Should return function", () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useThrottleCallback(fn, 500))
		expect(typeof result.current).toBe("function")
	})

	it("Should function called", () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useThrottleCallback(fn, 500))
		result.current()
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it("Should function called time 1, does not called 4", () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useThrottleCallback(fn, 500))
		result.current()
		result.current()
		result.current()
		result.current()
		result.current()
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it("Should called after throttle time", () => {
		jest.useFakeTimers()
		const fn = jest.fn()
		const { result } = renderHook(() => useThrottleCallback(fn, 500))
		result.current()
		result.current()
		expect(fn).toHaveBeenCalledTimes(1)
		jest.advanceTimersByTime(500)
		result.current()
		expect(fn).toHaveBeenCalledTimes(2)
	})
})

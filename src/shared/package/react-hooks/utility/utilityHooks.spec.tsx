import { renderHook } from "@testing-library/react"

import {
	useIsFirstRender,
	useIsomorphicLayoutEffect,
	useSsr,
} from "@/shared/package/react-hooks"

describe("useIsFirstRender hook testing", () => {
	it("Should return boolean", () => {
		const { result } = renderHook(() => useIsFirstRender())
		expect(typeof result.current).toBe("boolean")
	})

	it("Should first render and update", () => {
		const { result, rerender } = renderHook(() => useIsFirstRender())
		expect(result.current).toBe(true)
		rerender()
		expect(result.current).toBe(false)
	})
})

describe("useSsr hook testing", () => {
	it("Should return object, isBrowser and isServer property boolean", () => {
		const { result } = renderHook(() => useSsr())
		const { isBrowser, isServer } = result.current
		expect(typeof result.current).toBe("object")
		expect(typeof isServer).toBe("boolean")
		expect(typeof isBrowser).toBe("boolean")
	})
})

describe("useIsomorphicLayoutEffect hook testing", () => {
	it("Should return function", () => {
		const { result } = renderHook(() => useIsomorphicLayoutEffect)
		expect(typeof result.current).toBe("function")
	})
})

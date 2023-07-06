import { act, renderHook } from "@testing-library/react"

import { useCopyToClipboard } from "@/shared/package/react-hooks"

describe("useCopyToClickboard hook testing", () => {
	const originalClipboard = { ...global.navigator.clipboard }
	const mockData = "Test value"

	beforeEach(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore mock clipboard
		global.navigator.clipboard = {
			writeText: jest.fn(),
		}
	})

	afterEach(() => {
		jest.resetAllMocks()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore mock clipboard
		global.navigator.clipboard = originalClipboard
	})

	it("Should return array 2 element, null and function", () => {
		const { result } = renderHook(() => useCopyToClipboard())
		const [copy, setCopy] = result.current

		expect(copy).toBe(null)
		expect(typeof setCopy).toBe("function")
	})

	it("Should copy to the clipboard and the state", async () => {
		const { result } = renderHook(() => useCopyToClipboard())

		await act(async () => {
			await result.current[1](mockData)
		})

		expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
		expect(result.current[0]).toBe(mockData)
	})
})

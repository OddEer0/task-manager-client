import { render, renderHook, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { useOutsideClick } from "@/shared/package/react-hooks"

describe("useOutsideClick hook testing", () => {
	it("Should return ref object", () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useOutsideClick(fn))
		expect(typeof result.current).toBe("object")
	})

	it("Should activate callback with click outside", async () => {
		const fn = jest.fn()
		const { result } = renderHook(() => useOutsideClick<HTMLParagraphElement>(fn))
		render(
			<>
				<p ref={result.current}>inside text</p>
				<p>outside text</p>
			</>,
		)
		const inside = screen.getByText(/inside text/i)
		const outside = screen.getByText(/outside text/i)
		await userEvent.click(inside)
		expect(fn).toHaveBeenCalledTimes(0)
		await userEvent.click(outside)
		expect(fn).toHaveBeenCalledTimes(1)
	})

	it("Should clear listener with unmount", async () => {
		const fn = jest.fn()
		const { result, unmount } = renderHook(() =>
			useOutsideClick<HTMLParagraphElement>(fn),
		)
		const { unmount: unmountComp } = render(
			<>
				<p ref={result.current}>inside text</p>
				<p>outside text</p>
			</>,
		)
		const outside = screen.getByText(/outside text/i)
		unmountComp()
		unmount()
		await userEvent.click(outside)
		expect(fn).toHaveBeenCalledTimes(0)
	})
})

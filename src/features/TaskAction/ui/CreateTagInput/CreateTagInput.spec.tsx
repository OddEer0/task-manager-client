import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { $tags, mockProjects, mockTags } from "@/shared/api"
import { FORM } from "@/shared/lib"

import { CreateTagInput } from "./index"

describe("CreateTagInput component testing", () => {
	it("Should render component", () => {
		render(<CreateTagInput projectId={mockProjects[0].id} />)
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})

	it("Should change input", () => {
		const value = "Test value"
		render(<CreateTagInput projectId={mockProjects[0].id} />)
		expect(screen.getByRole("textbox")).toHaveValue("")
		fireEvent.change(screen.getByRole("textbox"), { target: { value } })
		expect(screen.getByRole("textbox")).toHaveValue(value)
	})

	it("Should create tag", async () => {
		const value = "Test value"
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		render(
			<Provider value={scope}>
				<CreateTagInput projectId={mockProjects[0].id} />
			</Provider>,
		)
		expect(scope.getState($tags).length).toBe(2)
		await userEvent.type(screen.getByRole("textbox"), value)
		await userEvent.click(screen.getByTestId("create-tag"))
		expect(scope.getState($tags).length).toBe(3)
	})

	it("Should onSubmit event working", async () => {
		const value = "Test value"
		const fn = jest.fn()
		render(<CreateTagInput projectId={mockProjects[0].id} onSubmit={fn} />)
		await userEvent.type(screen.getByRole("textbox"), value)
		await userEvent.click(screen.getByTestId("create-tag"))
		expect(fn).toHaveBeenCalled()
	})

	it("Should error text with less 3, great 20, required", async () => {
		const requiredError = FORM.required
		const lessError = FORM.minLength(3).message
		const greatError = FORM.maxLength(20).message
		render(<CreateTagInput projectId={mockProjects[0].id} />)
		const submit = screen.getByTestId("create-tag")
		await userEvent.click(submit)
		expect(screen.getByText(requiredError)).toBeInTheDocument()
		const input = screen.getByRole("textbox")
		await userEvent.type(input, "sd")
		expect(screen.getByText(lessError)).toBeInTheDocument()
		await userEvent.type(input, "s".repeat(50))
		expect(screen.getByText(greatError)).toBeInTheDocument()
	})
})

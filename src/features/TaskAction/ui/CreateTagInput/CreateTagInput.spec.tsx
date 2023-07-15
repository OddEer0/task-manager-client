import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { $tags, mockProjects, mockTags } from "@/shared/api"

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
})

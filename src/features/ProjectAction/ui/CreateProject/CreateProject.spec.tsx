import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateProject } from "@/features/ProjectAction"

import {
	CREATE_PROJECT_NAME,
	CREATE_PROJECT_NAME_PLACEHOLDER,
	CREATE_PROJECT_SUBMIT,
} from "../../lib"

describe("CreateProject component testing", () => {
	const testClassName = "test-classname"
	it("Should render component", () => {
		render(<CreateProject>Button</CreateProject>)
		expect(screen.getByText(/button/i)).toBeInTheDocument()
	})

	it("Should add other prop attr", () => {
		render(
			<CreateProject className={testClassName} title="title">
				Button
			</CreateProject>,
		)
		expect(screen.getByText(/button/i)).toHaveClass(testClassName)
		expect(screen.getByText(/button/i)).toHaveAttribute("title")
	})

	it("Should modal open with click button", async () => {
		render(<CreateProject>Button</CreateProject>)
		expect(screen.queryByText(CREATE_PROJECT_NAME)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(/button/i))
		expect(screen.getByText(CREATE_PROJECT_NAME)).toBeInTheDocument()
	})

	it("Should submit form", async () => {
		const fn = jest.fn()
		render(<CreateProject onDataSubmit={fn}>Button</CreateProject>)
		await userEvent.click(screen.getByText(/button/i))
		await userEvent.type(
			screen.getByPlaceholderText(CREATE_PROJECT_NAME_PLACEHOLDER),
			"task-name",
		)
		await userEvent.click(screen.getByText(CREATE_PROJECT_SUBMIT))
		expect(fn).toHaveBeenCalled()
	})
})

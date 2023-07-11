import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { mockColumns } from "@/shared/api"

import { DEFAULT_BG_VALUE, NAME_LABEL } from "./constants"
import { CreateColumnForm } from "./index"

describe("CreateColumnForm", () => {
	const testId = "test-id"
	const testClassName = "test-classname"
	const nameValue = "Marlen"
	const colorPickerTestId = "bg-colorpicker"
	const nameTextFieldTestId = "name-textfield"

	it("Should render component", () => {
		render(<CreateColumnForm projectId={mockColumns[0].projectId} />)
		expect(screen.getByText(NAME_LABEL)).toBeInTheDocument()
	})

	it("Should add className and other prop attr", () => {
		render(
			<CreateColumnForm
				projectId={mockColumns[0].projectId}
				data-testid={testId}
				title="title"
				className={testClassName}
			/>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})

	it("Should render form elements", () => {
		render(<CreateColumnForm projectId={mockColumns[0].projectId} />)
		const nameInput = screen.getByTestId(nameTextFieldTestId)
		const bgColorPicker = screen.getByTestId(colorPickerTestId)
		expect(nameInput).toBeInTheDocument()
		expect(bgColorPicker).toBeInTheDocument()
	})

	it("Should change text field", async () => {
		render(<CreateColumnForm projectId={mockColumns[0].projectId} />)
		const textField = screen.getByTestId(nameTextFieldTestId)
		expect(textField).toHaveValue("")
		await userEvent.type(textField, nameValue)
		expect(textField).toHaveValue(nameValue)
	})

	it("Should form submit", async () => {
		const fn = jest.fn()
		render(<CreateColumnForm projectId={mockColumns[0].projectId} onDataSubmit={fn} />)
		const btn = screen.getByRole("button")
		const nameTextField = screen.getByTestId(nameTextFieldTestId)
		await userEvent.type(nameTextField, "Marlen")
		await userEvent.click(btn)
		expect(fn).toHaveBeenLastCalledWith({
			name: "Marlen",
			bg: DEFAULT_BG_VALUE,
		})
	})
})

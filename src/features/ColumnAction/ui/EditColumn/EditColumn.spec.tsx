import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { EditColumn } from "@/features/ColumnAction"

import { $columns, mockColumns } from "@/shared/api"
import { FORM } from "@/shared/lib"

describe("EditColumn component testing", () => {
	const testId = "test-id"
	const testClassName = "test-classname"
	const value = "PROGRESS"

	it("Should render component", () => {
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should add className and other prop attr", () => {
		render(
			<EditColumn
				id={mockColumns[0].id}
				data-testid={testId}
				className={testClassName}
				color="white"
			/>,
		)
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("color")
	})

	it("Should modal open with click icon", async () => {
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.queryByText("Название столбика")).not.toBeInTheDocument()
		await userEvent.click(screen.getByTestId(testId))
		expect(screen.getByText("Название столбика")).toBeInTheDocument()
	})

	it("Should render form and text field, color picker, submit", async () => {
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		await userEvent.click(screen.getByTestId(testId))
		expect(screen.getByRole("form")).toBeInTheDocument()
		expect(screen.getByRole("submit")).toBeInTheDocument()
		expect(screen.getByTestId("bg-colorpicker")).toBeInTheDocument()
		expect(screen.getByTestId("name-text-field")).toBeInTheDocument()
	})

	it("Should error maxLength 20, minLength 3, required name text field", async () => {
		const value20 = "test test test test test test"
		const errorMinLength = FORM.minLength(3).message
		const errorMaxLength = FORM.maxLength(20).message
		const errorRequired = FORM.required
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		await userEvent.click(screen.getByTestId(testId))
		const input = screen.getByTestId("name-text-field")
		const submit = screen.getByRole("submit")
		await userEvent.click(submit)
		expect(screen.getByText(errorRequired)).toBeInTheDocument()
		await userEvent.type(input, "ab")
		expect(screen.getByText(errorMinLength)).toBeInTheDocument()
		await userEvent.type(input, value20)
		expect(screen.getByText(errorMaxLength)).toBeInTheDocument()
	})

	it("Should form submit", async () => {
		const fn = jest.fn()
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} onDataSubmit={fn} />)
		await userEvent.click(screen.getByTestId(testId))
		const input = screen.getByTestId("name-text-field")
		const submit = screen.getByRole("submit")
		await userEvent.type(input, value)
		await userEvent.click(submit)
		expect(fn).toHaveBeenCalled()
	})

	it("Should edit column", async () => {
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})
		render(
			<Provider value={scope}>
				<EditColumn id={mockColumns[0].id} data-testid={testId} />
			</Provider>,
		)
		expect(scope.getState($columns)[0].name).toBe(mockColumns[0].name)
		await userEvent.click(screen.getByTestId(testId))
		const input = screen.getByTestId("name-text-field")
		const submit = screen.getByRole("submit")
		expect(input).toHaveValue(mockColumns[0].name)
		await userEvent.clear(input)
		await userEvent.type(input, value)
		await userEvent.click(submit)
		expect(scope.getState($columns)[0].name).toBe(value)
	})
})

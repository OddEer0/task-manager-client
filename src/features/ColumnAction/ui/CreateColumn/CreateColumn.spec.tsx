import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { CreateColumn } from "@/features/ColumnAction"

import { $columns, mockColumns } from "@/shared/api"
import { FORM } from "@/shared/lib"

describe("CreateColumn component testing", () => {
	const testClassName = "test-classname"
	const testId = "test-id"

	it("Should render component", () => {
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		expect(screen.getByText(/button/i)).toBeInTheDocument()
	})

	it("Should add class and other prop attr", () => {
		render(
			<CreateColumn
				className={testClassName}
				data-testid={testId}
				title="title"
				projectId={mockColumns[0].projectId}
			>
				button
			</CreateColumn>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})

	it("Should modal open with button click", async () => {
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		const btn = screen.getByText(/button/i)
		expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument()
		await userEvent.click(btn)
		expect(screen.getByTestId("modal-content")).toBeInTheDocument()
	})

	it("Should render form and text field, color-picker, submit", async () => {
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument()
		const btn = screen.getByText(/button/i)
		await userEvent.click(btn)
		expect(screen.getByRole("form")).toBeInTheDocument()
		expect(screen.getByRole("submit")).toBeInTheDocument()
		expect(screen.getByTestId("name-textfield")).toBeInTheDocument()
		expect(screen.getByTestId("bg-colorpicker")).toBeInTheDocument()
	})

	it("Should error submit minLength 3, maxLength 20, required", async () => {
		const value20 = "test test test test test test"
		const errorMinLength = FORM.minLength(3).message
		const errorMaxLength = FORM.maxLength(20).message
		const errorRequired = FORM.required
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		const btn = screen.getByText(/button/i)
		await userEvent.click(btn)
		const submit = screen.getByRole("submit")
		const textField = screen.getByTestId("name-textfield")
		await userEvent.click(submit)
		expect(screen.getByText(errorRequired)).toBeInTheDocument()
		await userEvent.type(textField, "ab")
		await userEvent.click(submit)
		expect(screen.getByText(errorMinLength)).toBeInTheDocument()
		await userEvent.type(textField, value20)
		await userEvent.click(submit)
		expect(screen.getByText(errorMaxLength)).toBeInTheDocument()
	})

	it("Should form submit", async () => {
		const value = "TODO"
		const fn = jest.fn()
		render(
			<CreateColumn projectId={mockColumns[0].projectId} onDataSubmit={fn}>
				button
			</CreateColumn>,
		)
		const btn = screen.getByText(/button/i)
		await userEvent.click(btn)
		const submit = screen.getByRole("submit")
		const textField = screen.getByTestId("name-textfield")
		await userEvent.type(textField, value)
		await userEvent.click(submit)
		expect(fn).toHaveBeenCalled()
	})

	it("Should create column", async () => {
		const value = "TODO"
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})
		render(
			<Provider value={scope}>
				<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>
			</Provider>,
		)
		expect(scope.getState($columns).length).toBe(mockColumns.length)
		const btn = screen.getByText(/button/i)
		await userEvent.click(btn)
		const submit = screen.getByRole("submit")
		const textField = screen.getByTestId("name-textfield")
		await userEvent.type(textField, value)
		await userEvent.click(submit)
		expect(scope.getState($columns).length).toBe(mockColumns.length + 1)
	})
})

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { CreateTask } from "@/features/TaskAction"

import { $tasks, mockColumns, mockTasks } from "@/shared/api"
import { FORM } from "@/shared/lib"

import { CREATE_TAG_OFFER, CREATE_TASK_PLACEHOLDER } from "../../lib"

describe("CreateTask component testing", () => {
	const testId = "create-task-testId"
	const testClassName = "test-class-name"
	const closeBtnTestId = "create-task-close"
	const valueGreatest50 =
		"dsaaaaaaaadsadsadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

	it("Should render component", () => {
		render(<CreateTask columnId={mockColumns[0].id} />)
		expect(screen.getByText(CREATE_TAG_OFFER)).toBeInTheDocument()
	})

	it("Should add other prop attr", () => {
		render(
			<CreateTask
				columnId={mockColumns[0].id}
				className={testClassName}
				title="title"
				data-testid={testId}
			/>,
		)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
	})

	it("Should open form with click text", async () => {
		render(<CreateTask columnId={mockColumns[0].id} />)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		expect(screen.queryByText(CREATE_TAG_OFFER)).not.toBeInTheDocument()
		expect(screen.getByRole("form")).toBeInTheDocument()
	})

	it("Should close form with close btn click and outside click", async () => {
		render(
			<>
				<div>outside</div>
				<CreateTask columnId={mockColumns[0].id} />
			</>,
		)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		expect(screen.getByRole("form")).toBeInTheDocument()
		await userEvent.click(screen.getByTestId(closeBtnTestId))
		expect(screen.queryByRole("form")).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		expect(screen.getByRole("form")).toBeInTheDocument()
		await userEvent.click(screen.getByText(/outside/i))
		expect(screen.queryByRole("form")).not.toBeInTheDocument()
	})

	it("Should render input", async () => {
		render(<CreateTask columnId={mockColumns[0].id} />)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		expect(screen.getByRole("textbox")).toBeInTheDocument()
	})

	it("Should input type", async () => {
		const value = "test-value"
		render(<CreateTask columnId={mockColumns[0].id} />)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		const input = screen.getByRole("textbox")
		expect(input).toHaveValue("")
		await userEvent.type(input, value)
		expect(input).toHaveValue(value)
	})

	it("Should form submit", async () => {
		const value = "new task"
		const fn = jest.fn()
		expect(true).toBe(true)
		render(<CreateTask columnId={mockColumns[0].id} onDataSubmit={fn} />)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		const input = screen.getByRole("textbox")
		await userEvent.type(input, value)
		await userEvent.type(input, "{enter}")
		expect(fn).toHaveBeenCalledTimes(1)
		await userEvent.click(screen.getByRole("submit"))
		expect(fn).toHaveBeenCalledTimes(2)
	})

	it("Should create task", async () => {
		const value = "new task"
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<CreateTask columnId={mockColumns[0].id} />
			</Provider>,
		)
		expect(scope.getState($tasks).length).toBe(mockTasks.length)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		const input = screen.getByRole("textbox")
		await userEvent.type(input, value)
		await userEvent.click(screen.getByRole("submit"))
		expect(scope.getState($tasks).length).toBe(mockTasks.length + 1)
	})

	it("Should error max length 50, min length 4, required", async () => {
		const minValueError = FORM.minLength(4).message
		const maxValueError = FORM.maxLength(50).message
		render(<CreateTask columnId={mockColumns[0].id} />)
		await userEvent.click(screen.getByText(CREATE_TAG_OFFER))
		expect(screen.getByPlaceholderText(CREATE_TASK_PLACEHOLDER)).toBeInTheDocument()
		const input = screen.getByRole("textbox")
		await userEvent.type(input, "abs")
		await userEvent.click(screen.getByRole("submit"))
		expect(screen.getByText(minValueError)).toBeInTheDocument()
		await userEvent.type(input, valueGreatest50)
		await userEvent.click(screen.getByRole("submit"))
		expect(screen.getByText(maxValueError)).toBeInTheDocument()
		await userEvent.clear(input)
		await userEvent.click(screen.getByRole("submit"))
		expect(screen.getByText(FORM.required)).toBeInTheDocument()
	})
})

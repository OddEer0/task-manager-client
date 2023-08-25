import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC, PropsWithChildren } from "react"

import { $tasks, mockTasks } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { Menu, MenuList } from "@/shared/ui"

import { TASK_OPTION_EDIT_ITEM, TASK_OPTION_NAME_LABEL } from "../../lib"

import { EditItem } from "./EditItem"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("TaskOption EditItem component testing", () => {
	const nameInputTestId = "task-option-name-test-id"
	const descriptionInputTestId = "task-option-description-test-id"

	it("Should render component", () => {
		render(
			<MenuComp>
				<EditItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		expect(screen.getByText(TASK_OPTION_EDIT_ITEM)).toBeInTheDocument()
	})

	it("Should open modal with item click", async () => {
		render(
			<MenuComp>
				<EditItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		expect(screen.queryByText(TASK_OPTION_NAME_LABEL)).not.toBeInTheDocument()
		const btn = screen.getByText(TASK_OPTION_EDIT_ITEM)
		await userEvent.click(btn)
		expect(screen.getByText(TASK_OPTION_NAME_LABEL)).toBeInTheDocument()
	})

	it("Should render form elements", async () => {
		render(
			<MenuComp>
				<EditItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		const btn = screen.getByText(TASK_OPTION_EDIT_ITEM)
		await userEvent.click(btn)
		expect(screen.getByTestId(nameInputTestId)).toBeInTheDocument()
		expect(screen.getByTestId(descriptionInputTestId)).toBeInTheDocument()
	})

	it("Should rename task", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		const value = "Task update"
		render(
			<Provider value={scope}>
				<MenuComp>
					<EditItem id={mockTasks[0].id} />
				</MenuComp>
			</Provider>,
		)
		const btn = screen.getByText(TASK_OPTION_EDIT_ITEM)
		await userEvent.click(btn)
		const nameInput = screen.getByTestId(nameInputTestId)
		const submit = screen.getByRole("submit")
		await userEvent.clear(nameInput)
		await userEvent.type(nameInput, value)
		await userEvent.click(submit)
		expect(scope.getState($tasks)[0].name).toBe(value)
	})

	it("Should add task description", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		const value = "Task description"
		render(
			<Provider value={scope}>
				<MenuComp>
					<EditItem id={mockTasks[0].id} />
				</MenuComp>
			</Provider>,
		)
		const btn = screen.getByText(TASK_OPTION_EDIT_ITEM)
		await userEvent.click(btn)
		const descriptionInput = screen.getByTestId(descriptionInputTestId)
		const submit = screen.getByRole("submit")
		await userEvent.clear(descriptionInput)
		await userEvent.type(descriptionInput, value)
		await userEvent.click(submit)
		expect(scope.getState($tasks)[0].description).toBe(value)
	})

	it("Should error with rename less 4, great 50 and required name", async () => {
		const requiredError = FORM.required
		const less3Error = FORM.minLength(4).message
		const great50Error = FORM.maxLength(50).message
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<EditItem id={mockTasks[0].id} />
				</MenuComp>
			</Provider>,
		)
		const btn = screen.getByText(TASK_OPTION_EDIT_ITEM)
		await userEvent.click(btn)
		const nameInput = screen.getByTestId(nameInputTestId)
		const submit = screen.getByRole("submit")
		await userEvent.clear(nameInput)
		await userEvent.click(submit)
		expect(screen.getByText(requiredError)).toBeInTheDocument()
		await userEvent.type(nameInput, "asd")
		await userEvent.click(submit)
		expect(screen.getByText(less3Error)).toBeInTheDocument()
		await userEvent.type(nameInput, "a".repeat(75))
		await userEvent.click(submit)
		expect(screen.getByText(great50Error)).toBeInTheDocument()
	})
})

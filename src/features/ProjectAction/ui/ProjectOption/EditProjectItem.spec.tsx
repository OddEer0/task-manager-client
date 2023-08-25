import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC, PropsWithChildren } from "react"

import {
	CREATE_PROJECT_NAME,
	CREATE_PROJECT_NAME_PLACEHOLDER,
	EDIT_PROJECT_ITEM,
	EDIT_PROJECT_SUBMIT,
} from "@/features/ProjectAction/lib.ts"

import { $projects, mockProjects } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { Menu, MenuList } from "@/shared/ui"

import { EditProjectItem } from "./EditProjectItem"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("TaskOption EditProjectItem component testing", () => {
	const colorPickerBgTestId = "color-picker-bg-test-id"
	const colorPickerColorTestId = "color-picker-color-test-id"

	it("Should render component", () => {
		render(
			<MenuComp>
				<EditProjectItem id={mockProjects[0].id} />
			</MenuComp>,
		)
		expect(screen.getByText(EDIT_PROJECT_ITEM)).toBeInTheDocument()
	})

	it("Should open modal with click", async () => {
		render(
			<MenuComp>
				<EditProjectItem id={mockProjects[0].id} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_ITEM))
		expect(screen.getByText(CREATE_PROJECT_NAME)).toBeInTheDocument()
	})

	it("Should render form elements", async () => {
		render(
			<MenuComp>
				<EditProjectItem id={mockProjects[0].id} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_ITEM))
		expect(
			screen.getByPlaceholderText(CREATE_PROJECT_NAME_PLACEHOLDER),
		).toBeInTheDocument()
		expect(screen.getByTestId(colorPickerBgTestId)).toBeInTheDocument()
		expect(screen.getByTestId(colorPickerColorTestId)).toBeInTheDocument()
	})

	it("Should onDataSubmit event working", async () => {
		const fn = jest.fn()
		render(
			<MenuComp>
				<EditProjectItem onDataSubmit={fn} id={mockProjects[0].id} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_ITEM))
		await userEvent.type(
			screen.getByPlaceholderText(CREATE_PROJECT_NAME_PLACEHOLDER),
			"project-name",
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_SUBMIT))
		expect(fn).toHaveBeenCalled()
	})

	it("Should edit project", async () => {
		const value = "new project name"
		const scope = fork({
			values: new Map([[$projects, mockProjects]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<EditProjectItem id={mockProjects[0].id} />
				</MenuComp>
			</Provider>,
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_ITEM))
		const input = screen.getByPlaceholderText(CREATE_PROJECT_NAME_PLACEHOLDER)
		await userEvent.clear(input)
		await userEvent.type(input, value)
		await userEvent.click(screen.getByText(EDIT_PROJECT_SUBMIT))
		expect(scope.getState($projects)[0].name).toBe(value)
	})

	it("Should error input less 3, great 50, required", async () => {
		const requiredError = FORM.required
		const less3Error = FORM.minLength(3).message
		const great50Error = FORM.maxLength(50).message
		const scope = fork({
			values: new Map([[$projects, mockProjects]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<EditProjectItem id={mockProjects[0].id} />
				</MenuComp>
			</Provider>,
		)
		await userEvent.click(screen.getByText(EDIT_PROJECT_ITEM))
		const input = screen.getByPlaceholderText(CREATE_PROJECT_NAME_PLACEHOLDER)
		const submit = screen.getByText(EDIT_PROJECT_SUBMIT)
		await userEvent.clear(input)
		await userEvent.click(submit)
		expect(screen.getByText(requiredError)).toBeInTheDocument()
		await userEvent.type(input, "ab")
		expect(screen.getByText(less3Error)).toBeInTheDocument()
		await userEvent.type(input, "a".repeat(51))
		expect(screen.getByText(great50Error)).toBeInTheDocument()
	})
})

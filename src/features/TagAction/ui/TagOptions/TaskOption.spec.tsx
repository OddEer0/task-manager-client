import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC, PropsWithChildren } from "react"

import { $tags, mockTags, mockTasks } from "@/shared/api"
import { renderWithConfirm } from "@/shared/test"
import { Menu, MenuList } from "@/shared/ui"

import {
	CHANGE_COLOR_FORM_BUTTON,
	CHANGE_COLOR_ITEM,
	CHANGE_NAME_ITEM,
	CONFIRM_DELETE_TEXT,
	DELETE_TAG_ITEM,
} from "../../lib"

import { ChangeColorItem } from "./ChangeColorItem"
import { ChangeNameItem } from "./ChangeNameItem"
import { DeleteTagItem } from "./DeleteTagItem"
import { TagOptions } from "./index"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("TagOption component testing", () => {
	it("Should render component", () => {
		render(<TagOptions id={mockTasks[0].id} />)
		expect(screen.getByText(CHANGE_COLOR_ITEM)).toBeInTheDocument()
	})
})

describe("TaskOption ChangeColorItem component testing", () => {
	it("Should open modal with click item", async () => {
		render(<TagOptions id={mockTags[0].id} />)
		expect(screen.queryByText(CHANGE_COLOR_FORM_BUTTON)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(CHANGE_COLOR_ITEM))
		expect(screen.getByText(CHANGE_COLOR_FORM_BUTTON)).toBeInTheDocument()
	})

	it("Should change color form submit", async () => {
		const fn = jest.fn()
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<ChangeColorItem id={mockTags[0].id} onDataSubmit={fn} />
				</MenuComp>
			</Provider>,
		)
		await userEvent.click(screen.getByText(CHANGE_COLOR_ITEM))
		await userEvent.click(screen.getByText(CHANGE_COLOR_FORM_BUTTON))
		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith({
			bg: mockTags[0].bg,
			color: mockTags[0].color,
		})
	})
})

describe("TaskOption ChangeNameItem testing", () => {
	it("Should open modal with click item", async () => {
		render(<TagOptions id={mockTags[0].id} />)
		expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(CHANGE_NAME_ITEM))
		expect(screen.queryByRole("textbox")).toBeInTheDocument()
	})

	it("Should change name form submit", async () => {
		const fn = jest.fn()
		const value = "issue"
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<ChangeNameItem id={mockTags[0].id} onDataSubmit={fn} />
				</MenuComp>
			</Provider>,
		)
		await userEvent.click(screen.getByText(CHANGE_NAME_ITEM))
		fireEvent.change(screen.getByRole("textbox"), {
			target: {
				value,
			},
		})
		await userEvent.type(screen.getByRole("textbox"), "{enter}")
		expect(fn).toHaveBeenCalledTimes(1)
		expect(fn).toHaveBeenCalledWith({ name: value })
	})
})

describe("TaskOption DeleteTagItem component testing", () => {
	it("Should open modal with item click", async () => {
		renderWithConfirm(<TagOptions id={mockTags[0].id} />)
		expect(screen.queryByText(CONFIRM_DELETE_TEXT)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(DELETE_TAG_ITEM))
		expect(screen.queryByText(CONFIRM_DELETE_TEXT)).toBeInTheDocument()
	})

	it("Should delete tag", async () => {
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		renderWithConfirm(
			<Provider value={scope}>
				<MenuComp>
					<DeleteTagItem id={mockTags[0].id} />
				</MenuComp>
			</Provider>,
		)
		expect(scope.getState($tags).length).toBe(2)
		await userEvent.click(screen.getByText(DELETE_TAG_ITEM))
		await userEvent.click(screen.getByText("Подтвердить"))
		expect(scope.getState($tags).length).toBe(1)
	})

	it("Should onDelete event working", async () => {
		const fn = jest.fn()
		renderWithConfirm(
			<MenuComp>
				<DeleteTagItem id={mockTags[0].id} onDelete={fn} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(DELETE_TAG_ITEM))
		await userEvent.click(screen.getByText("Подтвердить"))
		expect(fn).toHaveBeenCalled()
	})
})

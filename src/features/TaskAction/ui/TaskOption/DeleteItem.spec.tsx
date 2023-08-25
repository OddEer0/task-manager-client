import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC, PropsWithChildren } from "react"

import { $tasks, mockTasks } from "@/shared/api"
import { MODAL_CONFIRM_OK } from "@/shared/lib"
import { Menu, MenuList } from "@/shared/ui"

import { TASK_DELETE_QUESTION, TASK_OPTION_DELETE_ITEM } from "../../lib"

import { DeleteItem } from "./DeleteItem"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("TaskOption DeleteItem component testing", () => {
	it("Should render component", () => {
		render(
			<MenuComp>
				<DeleteItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		expect(screen.getByText(TASK_OPTION_DELETE_ITEM)).toBeInTheDocument()
	})

	it("Should open confirm modal with click", async () => {
		render(
			<MenuComp>
				<DeleteItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		expect(screen.queryByText(TASK_DELETE_QUESTION)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(TASK_OPTION_DELETE_ITEM))
		expect(screen.getByText(TASK_DELETE_QUESTION)).toBeInTheDocument()
	})

	it("Should delete task", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<MenuComp>
					<DeleteItem id={mockTasks[0].id} />
				</MenuComp>
			</Provider>,
		)
		await userEvent.click(screen.getByText(TASK_OPTION_DELETE_ITEM))
		expect(scope.getState($tasks).length).toBe(mockTasks.length)
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(scope.getState($tasks).length).toBe(mockTasks.length - 1)
	})

	it("Should onDelete event working", async () => {
		const fn = jest.fn()
		render(
			<MenuComp>
				<DeleteItem id={mockTasks[0].id} onDelete={fn} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(TASK_OPTION_DELETE_ITEM))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(fn).toHaveBeenCalled()
	})
})

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC, PropsWithChildren } from "react"

import { $projects, mockProjects } from "@/shared/api"
import { MODAL_CONFIRM_OK } from "@/shared/lib"
import { ConfirmProvider } from "@/shared/package/react-confirm"
import { renderWithConfirm } from "@/shared/test"
import { Menu, MenuList } from "@/shared/ui"

import { DELETE_PROJECT_ITEM, PROJECT_DELETE_QUESTION } from "../../lib"

import { DeleteProjectItem } from "./DeleteProjectItem"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("ProjectOption DeleteProjectItem component testing", () => {
	it("Should render component", () => {
		render(
			<MenuComp>
				<DeleteProjectItem id={mockProjects[0].id} />
			</MenuComp>,
		)
		expect(screen.getByText(DELETE_PROJECT_ITEM))
	})

	it("Should open modal with click item", async () => {
		renderWithConfirm(
			<MenuComp>
				<DeleteProjectItem id={mockProjects[0].id} />
			</MenuComp>,
		)
		expect(screen.queryByText(PROJECT_DELETE_QUESTION)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText(DELETE_PROJECT_ITEM))
		expect(screen.getByText(PROJECT_DELETE_QUESTION)).toBeInTheDocument()
	})

	it("Should onDelete event working", async () => {
		const fn = jest.fn()
		renderWithConfirm(
			<MenuComp>
				<DeleteProjectItem id={mockProjects[0].id} onDelete={fn} />
			</MenuComp>,
		)
		await userEvent.click(screen.getByText(DELETE_PROJECT_ITEM))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(fn).toHaveBeenCalled()
	})

	it("Should delete project", async () => {
		const scope = fork({
			values: new Map([[$projects, mockProjects]]),
		})
		const fn = jest.fn()
		render(
			<Provider value={scope}>
				<ConfirmProvider>
					<MenuComp>
						<DeleteProjectItem id={mockProjects[0].id} onDelete={fn} />
					</MenuComp>
				</ConfirmProvider>
			</Provider>,
		)
		expect(scope.getState($projects).length).toBe(mockProjects.length)
		await userEvent.click(screen.getByText(DELETE_PROJECT_ITEM))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(scope.getState($projects).length).toBe(mockProjects.length - 1)
	})
})

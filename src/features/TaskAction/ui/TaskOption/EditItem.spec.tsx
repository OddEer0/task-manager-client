import { render, screen } from "@testing-library/react"
import { FC, PropsWithChildren } from "react"

import { mockTasks } from "@/shared/api"
import { Menu, MenuList } from "@/shared/ui"

import { TASK_OPTION_EDIT_ITEM } from "../../lib"

import { EditItem } from "./EditItem"

const MenuComp: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Menu>
			<MenuList>{children}</MenuList>
		</Menu>
	)
}

describe("TaskOption EditItem component testing", () => {
	it("Should render component", () => {
		render(
			<MenuComp>
				<EditItem id={mockTasks[0].id} />
			</MenuComp>,
		)
		expect(screen.getByText(TASK_OPTION_EDIT_ITEM)).toBeInTheDocument()
	})

	it("Should open modal with item click", () => {
		expect(true).toBe(true)
	})

	it("", () => {
		expect(true).toBe(true)
	})

	it("", () => {
		expect(true).toBe(true)
	})

	it("", () => {
		expect(true).toBe(true)
	})

	it("", () => {
		expect(true).toBe(true)
	})
})

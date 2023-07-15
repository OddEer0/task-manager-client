import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { AddTaskTag } from "@/features/TaskAction"

import { $tags, mockProjects, mockTags, mockTasks } from "@/shared/api"
import { renderWithRouter } from "@/shared/test"

describe("AddTaskTag component testing", () => {
	it("Should render component", () => {
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		renderWithRouter(
			<Provider value={scope}>
				<AddTaskTag projectId={mockProjects[0].id} id={mockTasks[0].id} />
			</Provider>,
		)
		expect(screen.getByText(mockTags[0].name)).toBeInTheDocument()
	})

	it("Should add tag", async () => {
		const fn = jest.fn()
		const scope = fork({
			values: new Map([[$tags, mockTags]]),
		})
		renderWithRouter(
			<Provider value={scope}>
				<AddTaskTag projectId={mockProjects[0].id} id={mockTasks[0].id} onAddTag={fn} />
			</Provider>,
		)
		await userEvent.click(screen.getByText(mockTags[0].name))
		expect(fn).toHaveBeenCalledWith(mockTags[0])
	})
})

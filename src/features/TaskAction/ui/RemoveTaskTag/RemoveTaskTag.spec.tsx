import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { RemoveTaskTag } from "@/features/TaskAction"

import { $tasks, mockTags, mockTasks } from "@/shared/api"

describe("RemoveTaskTag component testing", () => {
	it("Should render component", () => {
		render(<RemoveTaskTag tagId={mockTags[0].id} taskId={mockTasks[0].id} />)
		expect(screen.getByTitle("удалить тег из задачи")).toBeInTheDocument()
	})

	it("Should remove tag with click", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<RemoveTaskTag tagId={mockTags[0].id} taskId={mockTasks[0].id} />
			</Provider>,
		)
		expect(scope.getState($tasks)[0].tags.length).toBe(1)
		await userEvent.click(screen.getByTitle("удалить тег из задачи"))
		expect(scope.getState($tasks)[0].tags.length).toBe(0)
	})

	it("Should onRemove event working", async () => {
		const fn = jest.fn()
		render(
			<RemoveTaskTag tagId={mockTags[0].id} taskId={mockTasks[0].id} onRemove={fn} />,
		)
		await userEvent.click(screen.getByTitle("удалить тег из задачи"))
		expect(fn).toHaveBeenCalled()
	})
})

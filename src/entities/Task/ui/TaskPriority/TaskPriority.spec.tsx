import { render, screen } from "@testing-library/react"
import { allSettled, fork } from "effector"
import { Provider } from "effector-react"

import { $tasks, $tasksApi, mockTasks } from "@/shared/api"

import { TaskPriority } from "./index"

describe("TaskPriority component testing", () => {
	const testId = "task-priority-test-id"
	const testClassName = "test-class-name"

	it("Should render component", () => {
		render(<TaskPriority priority="low" data-testid={testId} taskId={mockTasks[0].id} />)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should add other prop attr", () => {
		render(
			<TaskPriority
				priority="low"
				data-testid={testId}
				taskId={mockTasks[0].id}
				title="title"
				className={testClassName}
			/>,
		)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
	})

	it("Should add priority", async () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<TaskPriority priority={null} date-testid={testId} taskId={mockTasks[0].id} />
			</Provider>,
		)
		expect(scope.getState($tasks)[0].priority).toBeNull()

		await allSettled($tasksApi.changePriority, {
			scope,
			params: { taskId: mockTasks[0].id, priority: "low" },
		})

		expect(scope.getState($tasks)[0].priority).toBe("low")
	})
})

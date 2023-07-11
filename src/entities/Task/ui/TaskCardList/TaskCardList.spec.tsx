import { render, screen } from "@testing-library/react"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC } from "react"

import { TaskCardList } from "@/entities/Task"

import { $tasks, mockTasks } from "@/shared/api"

const TaskOptionFakeComp: FC<{ id: string }> = ({ id }) => <p>{id}</p>

describe("TaskCardList component testing", () => {
	const testId = "test-id"
	const testClassName = "test-classname"

	it("Should render component", () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<TaskCardList
					columnId={mockTasks[0].columnId}
					addTask={<p>add task</p>}
					taskOption={TaskOptionFakeComp}
				/>
			</Provider>,
		)
		expect(screen.getByText(mockTasks[0].name)).toBeInTheDocument()
	})

	it("Should render addTask prop component", () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<TaskCardList
					columnId={mockTasks[0].columnId}
					addTask={<p>add task</p>}
					taskOption={TaskOptionFakeComp}
				/>
			</Provider>,
		)
		expect(screen.getByText(/add task/i)).toBeInTheDocument()
	})

	it("Should render task option prop component", () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<TaskCardList
					columnId={mockTasks[0].columnId}
					addTask={<p>add task</p>}
					taskOption={TaskOptionFakeComp}
				/>
			</Provider>,
		)
		expect(screen.getByText(mockTasks[0].id)).toBeInTheDocument()
		expect(screen.getByText(mockTasks[1].id)).toBeInTheDocument()
	})

	it("Should add attr with props", () => {
		const scope = fork({
			values: new Map([[$tasks, mockTasks]]),
		})
		render(
			<Provider value={scope}>
				<TaskCardList
					columnId={mockTasks[0].columnId}
					addTask={<p>add task</p>}
					taskOption={TaskOptionFakeComp}
					data-testid={testId}
					className={testClassName}
					title="title"
				/>
			</Provider>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})
})

import { render, screen } from "@testing-library/react"
import { fork } from "effector"
import { Provider } from "effector-react"
import { FC } from "react"

import { $columns, mockColumns } from "@/shared/api"

import { TaskColumnList } from "./index"

const AddTaskFakeComponent: FC<{ columnId: string }> = ({ columnId }) => <p>{columnId}</p>

describe("TaskColumnList component testing", () => {
	const testId = "testId"
	const testClassName = "test-classname"

	it("Should render component", () => {
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})

		render(
			<Provider value={scope}>
				<TaskColumnList
					data-testid={testId}
					addTask={AddTaskFakeComponent}
					id={scope.getState($columns)[0].projectId}
				/>
			</Provider>,
		)

		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should render add task component", () => {
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})

		render(
			<Provider value={scope}>
				<TaskColumnList
					data-testid={testId}
					addTask={AddTaskFakeComponent}
					id={scope.getState($columns)[0].projectId}
				/>
			</Provider>,
		)
		expect(screen.getByText(mockColumns[0].id)).toBeInTheDocument()
	})

	it("Should add classname and other attr", () => {
		const scope = fork({
			values: new Map([[$columns, mockColumns]]),
		})

		render(
			<Provider value={scope}>
				<TaskColumnList
					data-testid={testId}
					addTask={AddTaskFakeComponent}
					id={scope.getState($columns)[0].projectId}
					title="title"
					className={testClassName}
				/>
			</Provider>,
		)
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})
})

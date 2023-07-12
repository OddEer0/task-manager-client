import { render, screen } from "@testing-library/react"

import { TaskCard } from "@/entities/Task"

import { mockTasks } from "@/shared/api"

describe("TaskCard component testing", () => {
	const testId = "test-id"
	const testClassName = "test-classname"

	it("Should render component", () => {
		render(<TaskCard task={mockTasks[0]} taskOption={<p>task option</p>} />)
		expect(screen.getByText(mockTasks[0].name)).toBeInTheDocument()
	})

	it("Should render task option prop component", () => {
		render(<TaskCard task={mockTasks[0]} taskOption={<p>task option</p>} />)
		expect(screen.getByText(/task option/i)).toBeInTheDocument()
	})

	it("Should render addTag component", () => {
		render(
			<TaskCard
				task={mockTasks[0]}
				taskOption={<p>task option</p>}
				addTag={<p>add tag</p>}
			/>,
		)
		expect(screen.getByText(/add tag/i)).toBeInTheDocument()
	})

	it("Should render addPriority component", () => {
		render(
			<TaskCard
				task={mockTasks[0]}
				taskOption={<p>task option</p>}
				addPriority={<p>add priority</p>}
			/>,
		)
		expect(screen.getByText(/add priority/i)).toBeInTheDocument()
	})

	it("Should add classname and other attr", () => {
		render(
			<TaskCard
				task={mockTasks[0]}
				taskOption={<p>task option</p>}
				title="title"
				data-testid={testId}
				className={testClassName}
			/>,
		)
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})
})

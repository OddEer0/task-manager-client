import { render, screen } from "@testing-library/react"

import { mockColumns } from "@/shared/api"

import { TaskColumn } from "./index"

describe("Task Column component testing", () => {
	it("Should render component", () => {
		render(<TaskColumn column={mockColumns[0]} />)
		expect(screen.getByText(mockColumns[0].name)).toBeInTheDocument()
	})

	it("Should render edit component", () => {
		render(<TaskColumn column={mockColumns[0]} edit={<p>edit component</p>} />)
		expect(screen.getByText(/edit component/i)).toBeInTheDocument()
	})

	it("Should render children component", () => {
		render(
			<TaskColumn column={mockColumns[0]}>
				<p>children component</p>
			</TaskColumn>,
		)
		expect(screen.getByText(/children component/i)).toBeInTheDocument()
	})

	it("Should added className and other attr props", () => {
		const testId = "task-column"
		const testClassName = "test-classname"
		render(
			<TaskColumn
				className={testClassName}
				column={mockColumns[0]}
				data-testid={testId}
				title="title"
			/>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})
})

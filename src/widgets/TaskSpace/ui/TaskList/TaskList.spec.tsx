import { render, screen } from "@testing-library/react"

import { TaskList } from "@/widgets/TaskSpace"

import { mockColumns } from "@/shared/api"

describe("TaskList component testing", () => {
	it("Should render component", () => {
		render(<TaskList columnId={mockColumns[0].id} addTask={<p>add task</p>} />)
		expect(screen.getByText(/add task/i)).toBeInTheDocument()
	})
})

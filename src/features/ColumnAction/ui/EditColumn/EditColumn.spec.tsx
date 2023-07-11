import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { EditColumn } from "@/features/ColumnAction"

import { mockColumns } from "@/shared/api"

describe("EditColumn component testing", () => {
	const testId = "test-id"
	const testClassName = "test-classname"
	it("Should render component", () => {
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should add className and other prop attr", () => {
		render(
			<EditColumn
				id={mockColumns[0].id}
				data-testid={testId}
				className={testClassName}
				color="white"
			/>,
		)
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("color")
	})

	it("Should modal open with click icon", async () => {
		render(<EditColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.queryByText("Название столбика")).not.toBeInTheDocument()
		await userEvent.click(screen.getByTestId(testId))
		expect(screen.getByText("Название столбика")).toBeInTheDocument()
	})
})

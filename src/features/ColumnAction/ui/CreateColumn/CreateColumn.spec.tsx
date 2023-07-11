import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { CreateColumn } from "@/features/ColumnAction"

import { mockColumns } from "@/shared/api"

describe("CreateColumn component testing", () => {
	const testClassName = "test-classname"
	const testId = "test-id"

	it("Should render component", () => {
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		expect(screen.getByText(/button/i)).toBeInTheDocument()
	})

	it("Should add class and other prop attr", () => {
		render(
			<CreateColumn
				className={testClassName}
				data-testid={testId}
				title="title"
				projectId={mockColumns[0].projectId}
			>
				button
			</CreateColumn>,
		)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
		expect(screen.getByTestId(testId)).toHaveClass(testClassName)
		expect(screen.getByTestId(testId)).toHaveAttribute("title")
	})

	it("Should modal open with button click and close with overlay click", async () => {
		render(<CreateColumn projectId={mockColumns[0].projectId}>button</CreateColumn>)
		const btn = screen.getByText(/button/i)
		expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument()
		await userEvent.click(btn)
		expect(screen.getByTestId("modal-content")).toBeInTheDocument()
	})
})

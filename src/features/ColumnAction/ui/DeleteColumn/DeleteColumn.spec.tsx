import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { DeleteColumn } from "@/features/ColumnAction"

import { $columns, mockColumns } from "@/shared/api"

describe("DeleteColumn component testing", () => {
	const testId = "test-id"

	it("Should render component", () => {
		render(<DeleteColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should delete column with click", async () => {
		const scope = fork({
			values: [[$columns, mockColumns]],
		})
		render(
			<Provider value={scope}>
				<DeleteColumn id={scope.getState($columns)[0].id} data-testid={testId} />
			</Provider>,
		)
		expect(scope.getState($columns).length).toBe(2)
		await userEvent.click(screen.getByTestId(testId))
		await userEvent.click(screen.getByText(/подтвердить/i))
		expect(scope.getState($columns).length).toBe(1)
	})
})

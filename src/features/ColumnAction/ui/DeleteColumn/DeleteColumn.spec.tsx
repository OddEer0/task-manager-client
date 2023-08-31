import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { fork } from "effector"
import { Provider } from "effector-react"

import { DeleteColumn } from "@/features/ColumnAction"

import { $columns, mockColumns } from "@/shared/api"
import { MODAL_CONFIRM_OK } from "@/shared/lib"
import { renderWithConfirm } from "@/shared/test"

describe("DeleteColumn component testing", () => {
	const testId = "test-id"

	it("Should render component", () => {
		renderWithConfirm(<DeleteColumn id={mockColumns[0].id} data-testid={testId} />)
		expect(screen.getByTestId(testId)).toBeInTheDocument()
	})

	it("Should delete column with click", async () => {
		const scope = fork({
			values: [[$columns, mockColumns]],
		})
		renderWithConfirm(
			<Provider value={scope}>
				<DeleteColumn id={scope.getState($columns)[0].id} data-testid={testId} />
			</Provider>,
		)
		expect(scope.getState($columns).length).toBe(2)
		await userEvent.click(screen.getByTestId(testId))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(scope.getState($columns).length).toBe(1)
	})

	it("Should onDelete event working", async () => {
		const fn = jest.fn()
		renderWithConfirm(
			<DeleteColumn id={mockColumns[0].id} data-testid={testId} onDelete={fn} />,
		)
		await userEvent.click(screen.getByTestId(testId))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(fn).toHaveBeenCalled()
	})
})

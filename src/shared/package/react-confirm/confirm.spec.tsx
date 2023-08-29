import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FC } from "react"

import { MODAL_CONFIRM_OK } from "@/shared/lib"
import { ConfirmProvider, useConfirm } from "@/shared/package/react-confirm"
import { renderWithConfirm } from "@/shared/test"

const ConfirmComponent: FC<{ title: string; callback: () => void }> = ({
	title,
	callback,
}) => {
	const confirm = useConfirm()

	const clickHandle = () => {
		confirm(title, callback)
	}

	return <button onClick={clickHandle}>btn</button>
}

describe("Confirm custom lib testing", () => {
	const question = "question string"

	it("Should render provider children components", () => {
		render(
			<ConfirmProvider>
				<div>children</div>
			</ConfirmProvider>,
		)
		expect(screen.getByText(/children/i)).toBeInTheDocument()
	})

	it("Should open confirm modal with use hook", async () => {
		const fn = jest.fn()
		renderWithConfirm(<ConfirmComponent title={question} callback={fn} />)
		expect(screen.queryByText(question)).not.toBeInTheDocument()
		await userEvent.click(screen.getByText("btn"))
		expect(screen.getByText(question)).toBeInTheDocument()
	})

	it("Should confirm event working with click", async () => {
		const fn = jest.fn()
		renderWithConfirm(<ConfirmComponent title={question} callback={fn} />)
		await userEvent.click(screen.getByText("btn"))
		await userEvent.click(screen.getByText(MODAL_CONFIRM_OK))
		expect(fn).toHaveBeenCalled()
	})
})

import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ReactElement } from "react"
import { BrowserRouter, useLocation } from "react-router-dom"

import { ConfirmProvider } from "@/shared/package/react-confirm"

export const renderWithRouter = (ui: ReactElement, { route = "/" } = {}) => {
	window.history.pushState({}, "Test page", route)
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: BrowserRouter }),
	}
}

export const renderWithConfirm = (ui: ReactElement) => {
	return { ...render(ui, { wrapper: ConfirmProvider }) }
}

export const renderWithAll = (ui: ReactElement, { route = "/" } = {}) => {
	window.history.pushState({}, "Test page", route)
	return {
		user: userEvent.setup(),
		...render(<ConfirmProvider>{ui}</ConfirmProvider>, { wrapper: BrowserRouter }),
	}
}

export const LocationDisplay = () => {
	const location = useLocation()

	return <div data-testid="location-display">{location.pathname}</div>
}

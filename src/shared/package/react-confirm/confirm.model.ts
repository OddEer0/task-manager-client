import { createContext } from "react"

interface ConfirmContextType {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
	confirmQuestion: string | null
	setConfirmQuestion: (value: string | null) => void
	confirmCallback: (() => void) | null
	setConfirmCallback: (callback: (() => void) | null) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}
export const confirmContext = createContext<ConfirmContextType>({
	isOpen: false,
	setIsOpen: noop,
	confirmCallback: null,
	setConfirmCallback: noop,
	confirmQuestion: null,
	setConfirmQuestion: noop,
})

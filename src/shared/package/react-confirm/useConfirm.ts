import { useContext } from "react"

import { confirmContext } from "./confirm.model"

export const useConfirm = () => {
	const { setIsOpen, setConfirmQuestion, setConfirmCallback } = useContext(confirmContext)

	return (question: string, callback: () => void) => {
		setIsOpen(true)
		setConfirmQuestion(question)
		setConfirmCallback(callback)
	}
}

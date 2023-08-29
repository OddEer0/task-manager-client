import { FC, PropsWithChildren, useRef, useState } from "react"

import { MODAL_CONFIRM_CANCEL, MODAL_CONFIRM_OK } from "@/shared/lib"
import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Portal,
	Text,
} from "@/shared/ui"

import { confirmContext } from "./confirm.model"
import styles from "./styles.module.scss"

export const ConfirmProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [question, setQuestion] = useState<null | string>(null)
	const confirmCallback = useRef<(() => void) | null>(null)

	const setConfirmCallback = (callback: (() => void) | null) => {
		confirmCallback.current = callback
	}

	const onClose = () => setIsOpen(false)
	const confirmHandle = () => {
		confirmCallback.current && confirmCallback.current()
		onClose()
		setQuestion(null)
		setConfirmCallback(null)
	}

	return (
		<confirmContext.Provider
			value={{
				isOpen: isOpen,
				setIsOpen: setIsOpen,
				confirmCallback: confirmCallback.current,
				setConfirmCallback: setConfirmCallback,
				confirmQuestion: question,
				setConfirmQuestion: setQuestion,
			}}
		>
			{children}
			<Portal>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							<Text fontSize="medium">{question}</Text>
						</ModalHeader>
						<ModalFooter>
							<Button className={styles.closeButton} onClick={onClose}>
								{MODAL_CONFIRM_CANCEL}
							</Button>
							<Button onClick={confirmHandle}>{MODAL_CONFIRM_OK}</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Portal>
		</confirmContext.Provider>
	)
}

import { FC, useState } from "react"
import { BsPencilFill } from "react-icons/bs"

import { Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { EditColumnForm } from "../EditColumnForm"

import styles from "./styles.module.scss"

interface EditColumnProps {
	id: string
}

export const EditColumn: FC<EditColumnProps> = ({ id }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<BsPencilFill className={styles.icon} onClick={() => setIsOpen(true)} />
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<EditColumnForm id={id} />
				</ModalContent>
			</Modal>
		</>
	)
}

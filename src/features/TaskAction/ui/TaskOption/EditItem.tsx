import { FC } from "react"
import { BsPencilFill } from "react-icons/bs"

import { useDisclosure } from "@/shared/package/react-hooks"
import { MenuItem, Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { EditTaskForm } from "../EditTaskForm"

import styles from "./styles.module.scss"

interface EditItemProps {
	id: string
}

export const EditItem: FC<EditItemProps> = ({ id }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()

	return (
		<>
			<MenuItem icon={<BsPencilFill />} onClick={onOpen}>
				Редактировать
			</MenuItem>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent className={styles.editItemModal}>
					<EditTaskForm id={id} />
				</ModalContent>
			</Modal>
		</>
	)
}

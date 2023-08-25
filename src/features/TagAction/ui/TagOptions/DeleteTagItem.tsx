import {
	Button,
	MenuItem,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
} from "@chakra-ui/react"
import { useEvent } from "effector-react"
import { FC } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $tagsApi } from "@/shared/api"
import { MODAL_CONFIRM_CANCEL, MODAL_CONFIRM_OK } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"

import { CONFIRM_DELETE_TEXT, DELETE_TAG_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface DeleteTagItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteTagItem: FC<DeleteTagItemProps> = ({ id, onDelete }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const deleteTag = useEvent($tagsApi.deleteTag)

	const clickHandle = () => {
		deleteTag(id)
		onClose()
		onDelete && onDelete()
	}

	return (
		<>
			<MenuItem onClick={onOpen} className={styles.deleteItem}>
				<RiDeleteBin6Line className={styles.itemIcon} />
				{DELETE_TAG_ITEM}
			</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className={styles.modal}>
					<Text>{CONFIRM_DELETE_TEXT}</Text>
					<ModalFooter className={styles.modalFooter}>
						<Button onClick={onClose}>{MODAL_CONFIRM_CANCEL}</Button>
						<Button onClick={clickHandle}>{MODAL_CONFIRM_OK}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

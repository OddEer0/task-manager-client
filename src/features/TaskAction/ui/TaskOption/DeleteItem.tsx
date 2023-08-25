import { useEvent } from "effector-react"
import { FC, useRef } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $tasksApi } from "@/shared/api"
import { MODAL_CONFIRM_CANCEL, MODAL_CONFIRM_OK } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	MenuItem,
} from "@/shared/ui"

import { TASK_DELETE_QUESTION, TASK_OPTION_DELETE_ITEM } from "../../lib.ts"

import styles from "./styles.module.scss"

interface DeleteItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteItem: FC<DeleteItemProps> = ({ id, onDelete }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteTaskHandle = useEvent($tasksApi.deleteTask)
	const cancelRef = useRef(null)

	const deleteHandle = () => {
		deleteTaskHandle(id)
		onDelete && onDelete()
	}

	return (
		<>
			<MenuItem className={styles.deleteItem} onClick={onOpen}>
				<RiDeleteBin6Line className={styles.itemIcon} /> {TASK_OPTION_DELETE_ITEM}
			</MenuItem>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader>{TASK_DELETE_QUESTION}</AlertDialogHeader>
						<AlertDialogFooter gap="15px">
							<Button onClick={onClose}>{MODAL_CONFIRM_CANCEL}</Button>
							<Button onClick={deleteHandle}>{MODAL_CONFIRM_OK}</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

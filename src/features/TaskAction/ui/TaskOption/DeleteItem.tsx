import { FC, useRef } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $tasksApi } from "@/shared/api"
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

import styles from "./styles.module.scss"

interface DeleteItemProps {
	id: string
}

export const DeleteItem: FC<DeleteItemProps> = ({ id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef(null)

	const deleteHandle = () => {
		$tasksApi.deleteTask(id)
	}

	return (
		<>
			<MenuItem
				className={styles.deleteItem}
				icon={<RiDeleteBin6Line />}
				onClick={onOpen}
			>
				Удалить
			</MenuItem>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader>Вы точно хотите удалить задачу?</AlertDialogHeader>
						<AlertDialogFooter>
							<Button onClick={onClose}>Закрыть</Button>
							<Button onClick={deleteHandle}>Подтвердить</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

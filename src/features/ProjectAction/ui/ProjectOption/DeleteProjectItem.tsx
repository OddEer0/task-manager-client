import { useEvent } from "effector-react"
import { FC, useRef } from "react"

import { $projectsApi } from "@/shared/api"
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

import { DELETE_PROJECT_ITEM, PROJECT_DELETE_QUESTION } from "../../lib"

interface DeleteProjectItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteProjectItem: FC<DeleteProjectItemProps> = ({ onDelete, id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteProjectHandle = useEvent($projectsApi.deleteProject)
	const cancelRef = useRef(null)
	const deleteHandle = () => {
		deleteProjectHandle(id)
		onDelete && onDelete()
	}

	return (
		<>
			<MenuItem onClick={onOpen}>{DELETE_PROJECT_ITEM}</MenuItem>
			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader>{PROJECT_DELETE_QUESTION}</AlertDialogHeader>
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

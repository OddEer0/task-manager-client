import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
} from "@chakra-ui/react"
import { useEvent } from "effector-react"
import { FC } from "react"
import { IconBaseProps } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri"

import { DELETE_COLUMN_QUESTION } from "@/features/ColumnAction/lib.ts"

import { $columnsApi } from "@/shared/api"
import { MODAL_CONFIRM_CANCEL, MODAL_CONFIRM_OK } from "@/shared/lib"
import { classname } from "@/shared/package/classname"
import { useDisclosure } from "@/shared/package/react-hooks"

import styles from "./styles.module.scss"

interface DeleteColumnProps extends IconBaseProps {
	id: string
	onDelete?: () => void
}

export const DeleteColumn: FC<DeleteColumnProps> = ({
	id,
	className,
	onDelete,
	...props
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteColumn = useEvent($columnsApi.deleteColumn)
	const clickHandle = () => {
		deleteColumn(id)
		onClose()
		onDelete && onDelete()
	}

	return (
		<>
			<RiDeleteBin6Line
				className={classname(styles.icon, className)}
				onClick={onOpen}
				{...props}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className={styles.modal}>
					<Text>{DELETE_COLUMN_QUESTION}</Text>
					<ModalFooter className={styles.footer}>
						<Button onClick={onClose}>{MODAL_CONFIRM_CANCEL}</Button>
						<Button onClick={clickHandle}>{MODAL_CONFIRM_OK}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

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

import { $columnsApi } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { useDisclosure } from "@/shared/package/react-hooks"

import styles from "./styles.module.scss"

interface DeleteColumnProps extends IconBaseProps {
	id: string
}

export const DeleteColumn: FC<DeleteColumnProps> = ({ id, className, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const deleteColumn = useEvent($columnsApi.deleteColumn)
	const clickHandle = () => {
		deleteColumn(id)
		onClose()
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
					<Text>Вы точно хотите удалить данную колону?</Text>
					<ModalFooter className={styles.footer}>
						<Button onClick={onClose}>Отмена</Button>
						<Button onClick={clickHandle}>Подтвердить</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

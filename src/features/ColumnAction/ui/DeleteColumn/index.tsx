import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
} from "@chakra-ui/react"
import { FC } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $columnsApi } from "@/shared/api"
import { useDisclosure } from "@/shared/package/react-hooks"

import styles from "./styles.module.scss"

interface DeleteColumnProps {
	id: string
}

export const DeleteColumn: FC<DeleteColumnProps> = ({ id }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const clickHandle = () => {
		$columnsApi.deleteColumn(id)
	}

	return (
		<>
			<RiDeleteBin6Line className={styles.icon} onClick={onOpen} />
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

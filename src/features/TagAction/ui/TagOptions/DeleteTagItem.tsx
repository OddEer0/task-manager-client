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
import { useDisclosure } from "@/shared/package/react-hooks"

import { DELETE_TAG_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface DeleteTagItemProps {
	id: string
}

export const DeleteTagItem: FC<DeleteTagItemProps> = ({ id }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const deleteTag = useEvent($tagsApi.deleteTag)

	const clickHandle = () => {
		deleteTag(id)
		onClose()
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
					<Text>Вы точно хотите удалить тег</Text>
					<ModalFooter className={styles.modalFooter}>
						<Button onClick={onClose}>Отмена</Button>
						<Button onClick={clickHandle}>Подтвердить</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

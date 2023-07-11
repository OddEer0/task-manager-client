import { FC, useState } from "react"
import { IconBaseProps } from "react-icons"
import { BsPencilFill } from "react-icons/bs"

import { classname } from "@/shared/package/classname"
import { Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { EditColumnForm } from "../EditColumnForm"

import styles from "./styles.module.scss"

interface EditColumnProps extends IconBaseProps {
	id: string
}

export const EditColumn: FC<EditColumnProps> = ({ id, className, ...props }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<BsPencilFill
				className={classname(styles.icon, className)}
				onClick={() => setIsOpen(true)}
				{...props}
			/>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<EditColumnForm id={id} />
				</ModalContent>
			</Modal>
		</>
	)
}

import { FC, useState } from "react"

import { classname } from "@/shared/package/classname"
import { Button, ButtonProps, Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { CreateColumnForm } from "../CreateColumnForm"

import styles from "./styles.module.scss"

interface CreateColumnProps extends ButtonProps {
	projectId: string
}

export const CreateColumn: FC<CreateColumnProps> = ({
	projectId,
	className,
	...props
}) => {
	const classes = classname(styles.button, className)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button className={classes} onClick={() => setIsOpen(true)} {...props}>
				+
			</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<CreateColumnForm projectId={projectId} />
				</ModalContent>
			</Modal>
		</>
	)
}

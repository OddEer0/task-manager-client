import { FC, PropsWithChildren, useState } from "react"

import { classname } from "@/shared/package/classname"
import { Button, ButtonProps, Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { CreateColumnForm } from "../CreateColumnForm"

import styles from "./styles.module.scss"

interface CreateColumnProps extends ButtonProps {
	projectId: string
}

export const CreateColumn: FC<PropsWithChildren<CreateColumnProps>> = ({
	projectId,
	className,
	children,
	...props
}) => {
	const classes = classname(styles.button, className)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button className={classes} onClick={() => setIsOpen(true)} {...props}>
				{children}
			</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent className={styles.content} data-testid="modal-content">
					<CreateColumnForm projectId={projectId} />
				</ModalContent>
			</Modal>
		</>
	)
}

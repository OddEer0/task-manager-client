import { FC, PropsWithChildren, useState } from "react"

import { Button, ButtonProps, Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { CreateProjectForm } from "../CreateProjectForm"

export const CreateProject: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)} {...props}>
				{children}
			</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<CreateProjectForm />
				</ModalContent>
			</Modal>
		</>
	)
}

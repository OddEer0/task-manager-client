import { FC, useState } from "react"

import { Button, Modal, ModalContent, ModalOverlay } from "@/shared/ui"

import { CreateProjectForm } from "../CreateProjectForm"

export const CreateProject: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Создать проект</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<CreateProjectForm />
				</ModalContent>
			</Modal>
		</>
	)
}

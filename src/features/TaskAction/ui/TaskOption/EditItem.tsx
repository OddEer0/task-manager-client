import { useEvent, useStoreMap } from "effector-react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { BsPencilFill } from "react-icons/bs"

import { DESCRIPTION_TASK_PLACEHOLDER } from "@/entities/Task"

import { $tasks, $tasksApi, TaskUpdate, taskByIdSelector } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	MenuItem,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import {
	TASK_OPTION_DESCRIPTION_LABEL,
	TASK_OPTION_EDIT_ITEM,
	TASK_OPTION_NAME_LABEL,
} from "../../lib"

import styles from "./styles.module.scss"

interface EditItemProps {
	id: string
}

export const EditItem: FC<EditItemProps> = ({ id }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const updateTaskHandle = useEvent($tasksApi.updateTask)
	const { name, description, priority } =
		useStoreMap({
			store: $tasks,
			keys: [id],
			fn: taskByIdSelector,
		}) || {}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskUpdate["task"]>({
		defaultValues: {
			name,
			description,
			priority,
		},
	})

	const submitHandle = handleSubmit((data: TaskUpdate["task"]) => {
		updateTaskHandle({ id, task: data })
		onClose()
	})

	return (
		<>
			<MenuItem onClick={onOpen}>
				<BsPencilFill className={styles.itemIcon} /> {TASK_OPTION_EDIT_ITEM}
			</MenuItem>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent className={styles.editItemModal}>
					<form onSubmit={submitHandle} className={styles.form}>
						<FormControl>
							<FormLabel>{TASK_OPTION_NAME_LABEL}</FormLabel>
							<Input
								data-testid="task-option-name-test-id"
								{...register("name", {
									required: FORM.required,
									minLength: FORM.minLength(4),
									maxLength: FORM.maxLength(50),
								})}
							/>
							{errors.name && (
								<FormHelperText className={styles.errorMessage}>
									{errors.name.message}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl>
							<FormLabel>{TASK_OPTION_DESCRIPTION_LABEL}</FormLabel>
							<Input
								placeholder={DESCRIPTION_TASK_PLACEHOLDER}
								data-testid="task-option-description-test-id"
								{...register("description")}
							/>
						</FormControl>
						<Button type="submit" role="submit" className={styles.button}>
							Изменить
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

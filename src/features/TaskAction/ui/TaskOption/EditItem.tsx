import { useStoreMap } from "effector-react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { BsPencilFill } from "react-icons/bs"

import { DESCRIPTION_TASK_PLACEHOLDER } from "@/entities/Task"

import { $tasks, $tasksApi, TaskUpdate, taskByIdSelector } from "@/shared/api"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	MenuItem,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import { TASK_OPTION_EDIT_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface EditItemProps {
	id: string
}

export const EditItem: FC<EditItemProps> = ({ id }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const { name, description, priority } =
		useStoreMap({
			store: $tasks,
			keys: [id],
			fn: taskByIdSelector,
		}) || {}
	const { register, handleSubmit } = useForm<TaskUpdate["task"]>({
		defaultValues: {
			name,
			description,
			priority,
		},
	})

	const submitHandle = handleSubmit((data: TaskUpdate["task"]) => {
		$tasksApi.updateTask({ id, task: data })
		onClose()
	})

	return (
		<>
			<MenuItem icon={<BsPencilFill />} onClick={onOpen}>
				{TASK_OPTION_EDIT_ITEM}
			</MenuItem>
			<Modal onClose={onClose} isOpen={isOpen}>
				<ModalOverlay />
				<ModalContent className={styles.editItemModal}>
					<form onSubmit={submitHandle} className={styles.form}>
						<FormControl>
							<FormLabel>Название Задачи</FormLabel>
							<Input {...register("name")} />
						</FormControl>
						<FormControl>
							<FormLabel>Описание</FormLabel>
							<Input
								placeholder={DESCRIPTION_TASK_PLACEHOLDER}
								{...register("description")}
							/>
						</FormControl>
						<Button type="submit" className={styles.button}>
							Изменить
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

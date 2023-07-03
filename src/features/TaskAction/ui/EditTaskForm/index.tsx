import { useStoreMap } from "effector-react"
import { FC, HTMLAttributes } from "react"
import { useForm } from "react-hook-form"

import { DESCRIPTION_TASK_PLACEHOLDER } from "@/entities/Task"

import { $tasks, $tasksApi, TaskUpdate, taskByIdSelector } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Button, FormControl, FormLabel, Input } from "@/shared/ui"

import styles from "./styles.module.scss"

interface EditTaskFormProps extends HTMLAttributes<HTMLFormElement> {
	id: string
}

export const EditTaskForm: FC<EditTaskFormProps> = ({ id, className, ...props }) => {
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
	})

	return (
		<form
			onSubmit={submitHandle}
			className={classname(styles.form, className)}
			{...props}
		>
			<FormControl>
				<FormLabel>Название Задачи</FormLabel>
				<Input {...register("name")} />
			</FormControl>
			<FormControl>
				<FormLabel>Описание</FormLabel>
				<Input placeholder={DESCRIPTION_TASK_PLACEHOLDER} {...register("description")} />
			</FormControl>
			<Button type="submit" className={styles.button}>
				Изменить
			</Button>
		</form>
	)
}

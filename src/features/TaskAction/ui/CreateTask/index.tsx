import { InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEvent } from "effector-react"
import { FC, HTMLAttributes, useState } from "react"
import { useForm } from "react-hook-form"
import { BsCheckLg } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"

import { $tasksApi } from "@/shared/api"
import { TaskCreate } from "@/shared/api"
import { useOutsideClick } from "@/shared/package/react-hooks"
import { Input, Text } from "@/shared/ui"

import { CREATE_TAG_OFFER } from "../../lib"

import styles from "./styles.module.scss"

interface CreateTaskProps extends HTMLAttributes<HTMLDivElement> {
	columnId: string
	onDataSubmit?: (data: TaskCreate) => void
}

export const CreateTask: FC<CreateTaskProps> = ({ columnId, onDataSubmit, ...props }) => {
	const { register, handleSubmit } = useForm<TaskCreate>({
		defaultValues: { columnId: columnId },
	})
	const [isShow, setIsShow] = useState(false)
	const createTaskHandle = useEvent($tasksApi.addTask)
	const ref = useOutsideClick(() => {
		setIsShow(false)
	})

	const submitHandle = handleSubmit((data: TaskCreate) => {
		createTaskHandle(data)
		onDataSubmit?.call(null, data)
	})

	return (
		<div {...props} ref={ref}>
			{isShow ? (
				<form onSubmit={submitHandle} role="form">
					<InputGroup>
						<Input {...register("name")} />
						<InputRightElement className={styles.rightElement}>
							<button
								type="button"
								onClick={() => setIsShow(false)}
								data-testid="create-task-close"
								className={styles.icon}
							>
								<IoMdClose />
							</button>
							<button type="submit" role="submit" className={styles.icon}>
								<BsCheckLg />
							</button>
						</InputRightElement>
					</InputGroup>
				</form>
			) : (
				<Text fontSize="xl" className={styles.offer} onClick={() => setIsShow(true)}>
					{CREATE_TAG_OFFER}
				</Text>
			)}
		</div>
	)
}

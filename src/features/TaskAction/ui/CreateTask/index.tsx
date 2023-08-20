import { useEvent } from "effector-react"
import { FC, HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { BsCheckLg } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"

import { $tasksApi } from "@/shared/api"
import { TaskCreate } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"
import { useOutsideClick } from "@/shared/package/react-hooks"
import {
	FormControl,
	FormHelperText,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@/shared/ui"

import { CREATE_TAG_OFFER, CREATE_TASK_PLACEHOLDER } from "../../lib"

import styles from "./styles.module.scss"

export interface CreateTaskProps extends HTMLAttributes<HTMLDivElement> {
	columnId: string
	onDataSubmit?: (data: TaskCreate) => void
}

export const CreateTask: FC<CreateTaskProps> = ({ columnId, onDataSubmit, ...props }) => {
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<TaskCreate>({
		defaultValues: { columnId: columnId },
	})
	const { isOpen, onOpen, onClose } = useDisclosure()
	const closeHandle = () => {
		onClose()
		resetField("name")
	}
	const createTaskHandle = useEvent($tasksApi.addTask)
	const ref = useOutsideClick(() => closeHandle())

	const submitHandle = handleSubmit((data: TaskCreate) => {
		createTaskHandle(data)
		onDataSubmit?.call(null, data)
	})

	return (
		<div {...props} ref={ref}>
			{isOpen ? (
				<form onSubmit={submitHandle} role="form">
					<FormControl>
						<InputGroup>
							<Input
								{...register("name", {
									required: FORM.required,
									minLength: FORM.minLength(4),
									maxLength: FORM.maxLength(50),
								})}
								isInvalid={!!errors.name}
								placeholder={CREATE_TASK_PLACEHOLDER}
							/>
							<InputRightElement className={styles.rightElement}>
								<button
									type="button"
									onClick={closeHandle}
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
						{errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
					</FormControl>
				</form>
			) : (
				<Text fontSize="xl" className={styles.offer} onClick={onOpen}>
					{CREATE_TAG_OFFER}
				</Text>
			)}
		</div>
	)
}

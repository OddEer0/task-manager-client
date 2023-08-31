import { FormControl, FormHelperText } from "@chakra-ui/react"
import { useEvent } from "effector-react"
import { FC, HTMLAttributes } from "react"
import { useForm } from "react-hook-form"
import { BsCheck } from "react-icons/bs"

import { $tagsApi, TagCreate } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { Input, InputGroup, InputRightElement } from "@/shared/ui"

import styles from "./styles.module.scss"

interface CreateTagInputProps extends HTMLAttributes<HTMLFormElement> {
	projectId: string
	onSubmit?: () => void
}

export const CreateTagInput: FC<CreateTagInputProps> = ({
	projectId,
	onSubmit,
	...props
}) => {
	const addTag = useEvent($tagsApi.addTag)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TagCreate>({ defaultValues: { projectId }, mode: "onBlur" })

	const submitHandle = handleSubmit((data: TagCreate) => {
		addTag(data)
		onSubmit && onSubmit()
	})

	return (
		<form onSubmit={submitHandle} {...props}>
			<FormControl>
				<InputGroup>
					<Input
						{...register("name", {
							required: FORM.required,
							maxLength: FORM.maxLength(20),
							minLength: FORM.minLength(3),
						})}
						placeholder="Создать тег"
					/>
					<InputRightElement className={styles.check}>
						<button>
							<BsCheck data-testid="create-tag" className={styles.checkIcon} />
						</button>
					</InputRightElement>
				</InputGroup>
				{errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
			</FormControl>
		</form>
	)
}

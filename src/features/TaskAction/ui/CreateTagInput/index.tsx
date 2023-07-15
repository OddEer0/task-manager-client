import { useEvent } from "effector-react"
import { FC, useRef } from "react"
import { BsCheck } from "react-icons/bs"

import { $tagsApi } from "@/shared/api"
import { Input, InputGroup, InputGroupProps, InputRightElement } from "@/shared/ui"

import styles from "./styles.module.scss"

interface CreateTagInputProps extends InputGroupProps {
	projectId: string
}

export const CreateTagInput: FC<CreateTagInputProps> = ({ projectId, ...props }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const addTag = useEvent($tagsApi.addTag)

	const createTagHandle = () => {
		if (inputRef.current) {
			addTag({ name: inputRef.current.value, projectId })
			inputRef.current.value = ""
		}
	}

	return (
		<InputGroup {...props}>
			<Input ref={inputRef} placeholder="Создать тег" />
			<InputRightElement onClick={createTagHandle} className={styles.check}>
				<BsCheck data-testid="create-tag" className={styles.checkIcon} />
			</InputRightElement>
		</InputGroup>
	)
}

import { useStoreMap } from "effector-react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { BiRename } from "react-icons/bi"
import { BsCheck } from "react-icons/bs"

import { $tags, $tagsApi, TagUpdate, tagByIdSelector } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	FormControl,
	FormHelperText,
	Input,
	InputGroup,
	InputRightElement,
	MenuItem,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import { CHANGE_NAME_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface ChangeNameItemProps {
	id: string
	onDataSubmit?: (data?: TagUpdate["tag"]) => void
}

export const ChangeNameItem: FC<ChangeNameItemProps> = ({ onDataSubmit, id }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const tag = useStoreMap({
		store: $tags,
		keys: [id],
		fn: tagByIdSelector,
	})
	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<TagUpdate["tag"]>({
		defaultValues: {
			name: tag?.name,
		},
		mode: "onChange",
	})

	const submitHandle = handleSubmit((data: TagUpdate["tag"]) => {
		$tagsApi.updateTag({ tag: data, id })
		onClose()
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<MenuItem onClick={onOpen}>
				<BiRename className={styles.itemIcon} /> {CHANGE_NAME_ITEM}
			</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className={styles.modal}>
					<form onSubmit={submitHandle}>
						<FormControl>
							<InputGroup>
								<Input
									{...register("name", {
										required: FORM.required,
										minLength: FORM.minLength(4),
										maxLength: FORM.maxLength(100),
									})}
									data-testid="change-name-item-input"
								/>
								<InputRightElement className={styles.check}>
									<BsCheck className={styles.checkIcon} />
								</InputRightElement>
							</InputGroup>
							{errors.name && (
								<FormHelperText className={styles.errorMessage}>
									{errors.name.message}
								</FormHelperText>
							)}
						</FormControl>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

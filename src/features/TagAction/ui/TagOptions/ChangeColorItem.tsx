import ColorPicker from "@uiw/react-color-chrome"
import { useStoreMap } from "effector-react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { BiColorFill } from "react-icons/bi"

import { $tags, $tagsApi, TagUpdate, tagByIdSelector } from "@/shared/api"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	Button,
	FormControl,
	FormLabel,
	MenuItem,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import { CHANGE_COLOR_FORM_BUTTON, CHANGE_COLOR_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface ChangeColorItemProps {
	id: string
	onDataSubmit?: (data?: TagUpdate["tag"]) => void
}

export const ChangeColorItem: FC<ChangeColorItemProps> = ({ onDataSubmit, id }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const tag = useStoreMap({
		store: $tags,
		keys: [id],
		fn: tagByIdSelector,
	})
	const { handleSubmit, control } = useForm<TagUpdate["tag"]>({
		defaultValues: {
			bg: tag?.bg,
			color: tag?.color,
		},
	})

	const submitHandle = handleSubmit((data: TagUpdate["tag"]) => {
		$tagsApi.updateTag({ id, tag: data })
		onClose()
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<MenuItem onClick={onOpen}>
				<BiColorFill className={styles.itemIcon} />
				{CHANGE_COLOR_ITEM}
			</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className={styles.modal}>
					<form onSubmit={submitHandle} className={styles.colorForm}>
						<FormControl className={styles.formControl}>
							<FormLabel>Задний фон</FormLabel>
							<Controller
								render={({ field }) => (
									<ColorPicker
										data-testid="bg-colorpicker"
										color={field.value}
										onChange={color => field.onChange(color.hexa)}
									/>
								)}
								control={control}
								name="bg"
							/>
						</FormControl>
						<FormControl className={styles.formControl}>
							<FormLabel>Цвет текста</FormLabel>
							<Controller
								render={({ field }) => (
									<ColorPicker
										data-testid="bg-colorpicker"
										color={field.value}
										onChange={color => field.onChange(color.hexa)}
									/>
								)}
								control={control}
								name="color"
							/>
						</FormControl>
						<Button type="submit">{CHANGE_COLOR_FORM_BUTTON}</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

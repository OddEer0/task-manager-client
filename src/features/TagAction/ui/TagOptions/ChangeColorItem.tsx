import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { useStoreMap } from "effector-react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import { $tags, $tagsApi, TagUpdate, tagByIdSelector } from "@/shared/api"
import { useDisclosure } from "@/shared/package/react-hooks"
import { Button, MenuItem } from "@/shared/ui"

import { CHANGE_COLOR_FORM_BUTTON, CHANGE_COLOR_ITEM } from "../../lib"

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
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<MenuItem onClick={onOpen}>{CHANGE_COLOR_ITEM}</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form onSubmit={submitHandle}>
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
						<Button type="submit">{CHANGE_COLOR_FORM_BUTTON}</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}
import { ModalContent } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { useEvent, useStoreMap } from "effector-react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import { $projects, $projectsApi, ProjectUpdate, projectByIdSelector } from "@/shared/api"
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
	ModalOverlay,
} from "@/shared/ui"

import {
	CREATE_PROJECT_NAME,
	CREATE_PROJECT_NAME_PLACEHOLDER,
	EDIT_PROJECT_ITEM,
	EDIT_PROJECT_SUBMIT,
} from "../../lib"

import styles from "./styles.module.scss"

interface EditProjectItemProps {
	id: string
	onDataSubmit?: (data: ProjectUpdate["project"]) => void
}

export const EditProjectItem: FC<EditProjectItemProps> = ({ id, onDataSubmit }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const project = useStoreMap({ store: $projects, keys: [id], fn: projectByIdSelector })
	const updateProjectHandle = useEvent($projectsApi.updateProject)
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ProjectUpdate["project"]>({
		defaultValues: { name: project?.name, bg: project?.bg, color: project?.color },
		mode: "onBlur",
	})

	const submitHandle = handleSubmit((data: ProjectUpdate["project"]) => {
		updateProjectHandle({ id, project: data })
		onClose()
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<MenuItem onClick={onOpen}>{EDIT_PROJECT_ITEM}</MenuItem>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form className={styles.form} onSubmit={submitHandle}>
						<FormControl>
							<FormLabel>{CREATE_PROJECT_NAME}</FormLabel>
							<Input
								placeholder={CREATE_PROJECT_NAME_PLACEHOLDER}
								isInvalid={!!errors.name}
								{...register("name", {
									minLength: FORM.minLength(3),
									maxLength: FORM.maxLength(50),
									required: FORM.required,
								})}
							/>
							{errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
						</FormControl>
						<FormControl display="inline-block" width="auto">
							<FormLabel>Задний фон</FormLabel>
							<Controller
								render={({ field }) => (
									<ColorPicker
										color={field.value}
										onChange={color => field.onChange(color.hexa)}
										className={styles.picker}
										data-testid="color-picker-bg-test-id"
									/>
								)}
								control={control}
								name="bg"
							/>
						</FormControl>
						<FormControl display="inline-block" width="auto">
							<FormLabel>Цвет текста</FormLabel>
							<Controller
								render={({ field }) => (
									<ColorPicker
										color={field.value}
										onChange={color => field.onChange(color.hexa)}
										className={styles.picker}
										data-testid="color-picker-color-test-id"
									/>
								)}
								control={control}
								name="color"
							/>
						</FormControl>
						<Button type="submit">{EDIT_PROJECT_SUBMIT}</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

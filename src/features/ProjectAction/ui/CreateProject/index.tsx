import ColorPicker from "@uiw/react-color-chrome"
import { useEvent } from "effector-react"
import { FC, PropsWithChildren } from "react"
import { Controller, useForm } from "react-hook-form"

import { $projectsApi, ProjectCreate } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	Button,
	ButtonProps,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import {
	CREATE_PROJECT_NAME,
	CREATE_PROJECT_NAME_PLACEHOLDER,
	CREATE_PROJECT_SUBMIT,
} from "../../lib"

import styles from "./styles.module.scss"

interface CreateProjectProps extends ButtonProps {
	onDataSubmit?: (data: ProjectCreate) => void
}

export const CreateProject: FC<PropsWithChildren<CreateProjectProps>> = ({
	onDataSubmit,
	children,
	...props
}) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const addProjectHandle = useEvent($projectsApi.addProject)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProjectCreate>({
		defaultValues: { bg: "#31beb2", color: "#ffffff" },
	})

	const submitHandle = handleSubmit((data: ProjectCreate) => {
		onClose()
		addProjectHandle(data)
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<Button onClick={onOpen} {...props}>
				{children}
			</Button>
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
									/>
								)}
								control={control}
								name="color"
							/>
						</FormControl>
						<Button type="submit">{CREATE_PROJECT_SUBMIT}</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

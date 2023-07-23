import { FormHelperText, useDisclosure } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { useEvent } from "effector-react"
import { FC, PropsWithChildren } from "react"
import { Controller, useForm } from "react-hook-form"

import { $columnsApi } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { classname } from "@/shared/package/classname"
import {
	Button,
	ButtonProps,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import { BG_LABEL, DEFAULT_BG_VALUE, NAME_LABEL, SUBMIT_FORM_TEXT } from "../../lib"
import { ICreateColumnForm } from "../../types"

import styles from "./styles.module.scss"

interface CreateColumnProps extends ButtonProps {
	projectId: string
	onDataSubmit?: (data: ICreateColumnForm) => void
}

export const CreateColumn: FC<PropsWithChildren<CreateColumnProps>> = ({
	projectId,
	className,
	children,
	onDataSubmit,
	...props
}) => {
	const classes = classname(styles.button, className)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const createHandle = useEvent($columnsApi.addColumn)
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateColumnForm>({
		defaultValues: { bg: DEFAULT_BG_VALUE },
	})

	const submitHandle = handleSubmit((data: ICreateColumnForm) => {
		createHandle({ ...data, projectId })
		onDataSubmit && onDataSubmit.call(null, data)
	})

	return (
		<>
			<Button className={classes} onClick={onOpen} {...props}>
				{children}
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent className={styles.content} data-testid="modal-content">
					<form
						role="form"
						onSubmit={submitHandle}
						className={classname(styles.form, className)}
					>
						<FormControl>
							<FormLabel>{NAME_LABEL}</FormLabel>
							<Input
								data-testid="name-textfield"
								isInvalid={!!errors.name}
								{...register("name", {
									minLength: FORM.minLength(3),
									required: FORM.required,
									maxLength: FORM.maxLength(20),
								})}
							/>
							{errors.name && <FormHelperText>{errors.name.message}</FormHelperText>}
						</FormControl>
						<FormControl display="inline-block" width="auto">
							<FormLabel>{BG_LABEL}</FormLabel>
							<Controller
								render={({ field }) => (
									<ColorPicker
										data-testid="bg-colorpicker"
										color={field.value}
										onChange={color => field.onChange(color.hexa)}
										className={styles.picker}
									/>
								)}
								control={control}
								name="bg"
							/>
						</FormControl>
						<Button role="submit" type="submit">
							{SUBMIT_FORM_TEXT}
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

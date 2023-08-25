import ColorPicker from "@uiw/react-color-chrome"
import { useEvent, useStoreMap } from "effector-react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { IconBaseProps } from "react-icons"
import { BsPencilFill } from "react-icons/bs"

import { $columns, $columnsApi, ColumnUpdate, columnByIdSelector } from "@/shared/api"
import { FORM } from "@/shared/lib"
import { classname } from "@/shared/package/classname"
import { useDisclosure } from "@/shared/package/react-hooks"
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalContent,
	ModalOverlay,
} from "@/shared/ui"

import styles from "./styles.module.scss"

interface EditColumnProps extends IconBaseProps {
	id: string
	onDataSubmit?: (data: ColumnUpdate["column"]) => void
}

export const EditColumn: FC<EditColumnProps> = ({
	id,
	className,
	onDataSubmit,
	...props
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const update = useEvent($columnsApi.updateColumn)
	const { name, bg } =
		useStoreMap({
			store: $columns,
			keys: [id],
			fn: columnByIdSelector,
		}) || {}

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ColumnUpdate["column"]>({
		defaultValues: {
			bg,
			name,
		},
	})

	const submitHandle = handleSubmit(data => {
		update({ id, column: data })
		onClose()
		onDataSubmit?.call(null, data)
	})

	return (
		<>
			<BsPencilFill
				className={classname(styles.icon, className)}
				onClick={onOpen}
				{...props}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<form role="form" className={styles.form} onSubmit={submitHandle}>
						<FormControl>
							<FormLabel>Название столбика</FormLabel>
							<Input
								data-testid="name-text-field"
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
							<FormLabel>Задний фон</FormLabel>
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
							SUBMIT
						</Button>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

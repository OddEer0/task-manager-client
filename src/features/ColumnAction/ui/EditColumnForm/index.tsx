import { FormHelperText } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { useStoreMap } from "effector-react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import { $columns, $columnsApi, ColumnUpdate, columnByIdSelector } from "@/shared/api"
import { Button, FormControl, FormLabel, Input } from "@/shared/ui"

import { MIN_LENGTH_MESSAGE, REQUIRED_MESSAGE } from "../../lib.ts"

import styles from "./styles.module.scss"

interface EditColumnForm {
	id: string
}

export const EditColumnForm: FC<EditColumnForm> = ({ id }) => {
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
		$columnsApi.updateColumn({ id, column: data })
	})

	return (
		<form className={styles.form} onSubmit={submitHandle}>
			<FormControl>
				<FormLabel>Название столбика</FormLabel>
				<Input
					isInvalid={!!errors.name}
					{...register("name", {
						minLength: { message: MIN_LENGTH_MESSAGE, value: 3 },
						required: REQUIRED_MESSAGE,
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
			<Button type="submit">SUBMIT</Button>
		</form>
	)
}

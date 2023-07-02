import { FormHelperText } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import { $columnsApi } from "@/shared/api"
import { Button, FormControl, FormLabel, Input } from "@/shared/ui"

import { MIN_LENGTH_MESSAGE, REQUIRED_MESSAGE } from "../../lib"
import { ICreateColumnForm } from "../../types"

import styles from "./styles.module.scss"

interface CreateColumnFormProps {
	projectId: string
}

export const CreateColumnForm: FC<CreateColumnFormProps> = ({ projectId }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateColumnForm>({
		defaultValues: { bg: "#31beb2" },
	})

	const submitHandle = handleSubmit((data: ICreateColumnForm) => {
		$columnsApi.addColumn({ ...data, projectId })
	})

	return (
		<form onSubmit={submitHandle} className={styles.form}>
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

import { FormHelperText } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { FC, HTMLAttributes } from "react"
import { Controller, useForm } from "react-hook-form"

import { $columnsApi } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Button, FormControl, FormLabel, Input } from "@/shared/ui"

import { MIN_LENGTH_MESSAGE, REQUIRED_MESSAGE } from "../../lib"
import { ICreateColumnForm } from "../../types"

import { BG_LABEL, DEFAULT_BG_VALUE, NAME_LABEL } from "./constants"
import styles from "./styles.module.scss"

interface CreateColumnFormProps extends HTMLAttributes<HTMLFormElement> {
	projectId: string
	onDataSubmit?: (data: ICreateColumnForm) => void
}

export const CreateColumnForm: FC<CreateColumnFormProps> = ({
	projectId,
	className,
	onDataSubmit,
	...props
}) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ICreateColumnForm>({
		defaultValues: { bg: DEFAULT_BG_VALUE },
	})

	const submitHandle = handleSubmit((data: ICreateColumnForm) => {
		$columnsApi.addColumn({ ...data, projectId })
		onDataSubmit && onDataSubmit.call(null, data)
	})

	return (
		<form
			onSubmit={submitHandle}
			className={classname(styles.form, className)}
			{...props}
		>
			<FormControl>
				<FormLabel>{NAME_LABEL}</FormLabel>
				<Input
					data-testid="name-textfield"
					isInvalid={!!errors.name}
					{...register("name", {
						minLength: { message: MIN_LENGTH_MESSAGE, value: 3 },
						required: REQUIRED_MESSAGE,
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
			<Button type="submit">SUBMIT</Button>
		</form>
	)
}

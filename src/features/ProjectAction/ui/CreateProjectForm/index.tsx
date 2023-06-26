import { FormHelperText } from "@chakra-ui/react"
import ColorPicker from "@uiw/react-color-chrome"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import { $projectsApi } from "@/entities/Project/model/project.api.ts"

import { ProjectCreate } from "@/shared/api"
import { Button, FormControl, FormLabel, Input } from "@/shared/ui"

import { MIN_LENGTH_MESSAGE, REQUIRED_MESSAGE } from "../../lib.ts"

import styles from "./styles.module.scss"

export const CreateProjectForm: FC = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProjectCreate>({
		defaultValues: { bg: "#31beb2", color: "#ffffff" },
	})

	const submitHandle = handleSubmit((data: ProjectCreate) => {
		$projectsApi.addProject(data)
	})

	return (
		<form className={styles.form} onSubmit={submitHandle}>
			<FormControl>
				<FormLabel>Название проекта</FormLabel>
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
			<Button type="submit">SUBMIT</Button>
		</form>
	)
}

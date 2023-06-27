import { FC, useState } from "react"
import { useForm } from "react-hook-form"

import { $columnsApi } from "@/entities/Column"

import { TaskCreate } from "@/shared/api"
import { Input, Text } from "@/shared/ui"

interface CreateTaskProps {
	id: string
}

export const CreateTask: FC<CreateTaskProps> = ({ id }) => {
	const { register, handleSubmit } = useForm<TaskCreate>({
		defaultValues: { columnId: id },
	})
	const [isShow, setIsShow] = useState(false)

	const submitHandle = handleSubmit((data: TaskCreate) => {
		$columnsApi.addTask(data)
	})

	return (
		<div>
			{isShow ? (
				<form onSubmit={submitHandle}>
					<Input {...register("name")} />
					<span onClick={() => setIsShow(false)}>X</span>
				</form>
			) : (
				<Text onClick={() => setIsShow(true)}>Добавить таску</Text>
			)}
		</div>
	)
}

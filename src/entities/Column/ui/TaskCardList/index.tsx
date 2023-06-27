import { FC, ReactNode } from "react"

import { Task } from "@/shared/api"
import { Stack, StackProps } from "@/shared/ui"

import { TaskCard } from "../TaskCard"

interface TaskCardListProps extends StackProps {
	tasks: Task[]
	addTask: ReactNode
}

export const TaskCardList: FC<TaskCardListProps> = ({
	tasks,
	addTask: AddTask,
	...props
}) => {
	return (
		<Stack gap="25px" {...props}>
			{tasks.map(task => (
				<TaskCard task={task} />
			))}
			{AddTask}
		</Stack>
	)
}

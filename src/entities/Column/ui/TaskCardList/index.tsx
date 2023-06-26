import { FC } from "react"

import { Task } from "@/shared/api"
import { Stack } from "@/shared/ui"

import { TaskCard } from "../TaskCard"

interface TaskCardListProps {
	tasks: Task[]
}

export const TaskCardList: FC<TaskCardListProps> = ({ tasks }) => {
	return (
		<Stack>
			{tasks.map(task => (
				<TaskCard task={task} />
			))}
		</Stack>
	)
}

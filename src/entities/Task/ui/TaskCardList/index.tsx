import { useStoreMap } from "effector-react"
import { FC, ReactNode } from "react"

import { $tasks, taskByColumnIdSelector } from "@/shared/api"
import { Stack, StackProps } from "@/shared/ui"

import { TaskCard } from "../TaskCard"

interface TaskCardListProps extends StackProps {
	columnId: string
	addTask: ReactNode
}

export const TaskCardList: FC<TaskCardListProps> = ({
	columnId,
	addTask: AddTask,
	...props
}) => {
	const tasks = useStoreMap({
		store: $tasks,
		keys: [columnId],
		fn: taskByColumnIdSelector,
	})

	return (
		<Stack gap="25px" {...props}>
			{tasks.map(task => (
				<TaskCard task={task} key={task.id} />
			))}
			{AddTask}
		</Stack>
	)
}

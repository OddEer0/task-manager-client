import { useStoreMap } from "effector-react"
import { FC, ReactNode } from "react"

import { TagOptions } from "@/features/TagAction"
import { AddTaskTag, RemoveTaskTag, TaskOption } from "@/features/TaskAction"

import { TagList } from "@/entities/Tag"
import { TaskCard } from "@/entities/Task"
import { TaskPriority } from "@/entities/Task/ui/TaskPriority"

import { $tasks, taskByColumnIdSelector } from "@/shared/api"
import { Stack, StackProps } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskListProps extends StackProps {
	columnId: string
	addTask: ReactNode
}

export const TaskList: FC<TaskListProps> = ({ columnId, addTask: AddTask, ...props }) => {
	const tasks = useStoreMap({
		store: $tasks,
		keys: [columnId],
		fn: taskByColumnIdSelector,
	})

	return (
		<Stack gap="25px" {...props}>
			{tasks.map(task => (
				<TaskCard
					addTag={<AddTaskTag id={task.id} />}
					taskOption={<TaskOption id={task.id} />}
					task={task}
					key={task.id}
					taskPriority={<TaskPriority taskId={task.id} priority={task.priority} />}
					tagList={
						<TagList
							tags={task.tags}
							taskId={task.id}
							tagRemove={RemoveTaskTag}
							tagOptions={TagOptions}
							className={styles.tagList}
						/>
					}
				/>
			))}
			{AddTask}
		</Stack>
	)
}

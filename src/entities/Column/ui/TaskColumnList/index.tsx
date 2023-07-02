import { useStoreMap } from "effector-react"
import { FC, HTMLAttributes } from "react"

// TODO - Реализовать по другому, нарушается архитектура
import { TaskCardList } from "@/entities/Task"

import { $columns, columnByProjectIdSelector } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Skeleton, Stack } from "@/shared/ui"

import { TaskColumn } from "../TaskColumn"

import styles from "./styles.module.scss"

interface TaskColumnListProps extends HTMLAttributes<HTMLDivElement> {
	id: string
	addTask: FC<{ id: string }>
}

export const TaskColumnList: FC<TaskColumnListProps> = ({
	id,
	className,
	addTask: AddTask,
	...props
}) => {
	const classes = classname(styles.wrapper, className)
	const columns = useStoreMap({
		store: $columns,
		keys: [id],
		fn: columnByProjectIdSelector,
	})

	return (
		<div className={classes} {...props}>
			<Stack direction="row" gap="15px">
				{columns.map(col => (
					<Skeleton key={col.id} isLoaded={true}>
						<TaskColumn column={col}>
							<TaskCardList
								className={styles.list}
								columnId={col.id}
								addTask={<AddTask id={col.id} />}
							/>
						</TaskColumn>
					</Skeleton>
				))}
			</Stack>
		</div>
	)
}

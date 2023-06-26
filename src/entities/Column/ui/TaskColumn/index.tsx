import { FC, HTMLAttributes, ReactNode } from "react"

import { TaskCardList } from "@/entities/Column/ui/TaskCardList"

import { Column } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Box, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskColumnProps extends HTMLAttributes<HTMLDivElement> {
	column: Column
	edit?: ReactNode
	taskList?: ReactNode
}

export const TaskColumn: FC<TaskColumnProps> = ({
	column,
	edit: Edit,
	className,
	...props
}) => {
	const classes = classname(styles.column, className)
	const { bg, name, task } = column

	return (
		<Box className={classes} {...props}>
			<div className={styles.head} style={{ borderColor: bg }}>
				<div className={styles.headText}>
					<span className={styles.circle} style={{ background: bg }} />
					<Text className={styles.title}>{name}</Text>
					<Text className={styles.count}></Text>
				</div>
				{Edit && Edit}
			</div>
			<div className={styles.body}>
				<TaskCardList tasks={task} />
			</div>
		</Box>
	)
}

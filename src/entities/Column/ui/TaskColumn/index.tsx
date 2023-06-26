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
	const { bg, color, name, task } = column

	return (
		<Box className={classes} {...props}>
			<div className={styles.head} style={{ background: bg, color }}>
				<Text>{name}</Text>
				{Edit && Edit}
			</div>
			<div className={styles.body}>
				<TaskCardList tasks={task} />
			</div>
		</Box>
	)
}

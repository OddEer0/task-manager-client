import { FC, HTMLAttributes, ReactNode } from "react"

import { Column } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Box, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskColumnProps extends HTMLAttributes<HTMLDivElement> {
	column: Column
	edit?: ReactNode
	addTask?: ReactNode
}

export const TaskColumn: FC<TaskColumnProps> = ({
	column,
	edit: Edit,
	addTask: AddTask,
	className,
	...props
}) => {
	const classes = classname(styles.column, className)
	const { bg, color, name } = column

	return (
		<Box className={classes} {...props}>
			<div className={styles.head} style={{ background: bg, color }}>
				<Text>{name}</Text>
				{Edit && Edit}
			</div>
			<div className={styles.body}>{AddTask && AddTask}</div>
		</Box>
	)
}

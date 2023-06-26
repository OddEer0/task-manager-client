import { FC, HTMLAttributes } from "react"

import { Column } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Box, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskColumnProps extends HTMLAttributes<HTMLDivElement> {
	column: Column
}

export const TaskColumn: FC<TaskColumnProps> = ({ column, className, ...props }) => {
	const classes = classname(styles.column, className)
	const { bg, color, name } = column

	return (
		<Box sx={{ background: bg, color }} className={classes} {...props}>
			<div className={styles.head}>
				<Text>{name}</Text>
			</div>
			<div className={styles.body}></div>
		</Box>
	)
}

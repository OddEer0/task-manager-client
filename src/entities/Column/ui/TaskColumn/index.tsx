import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from "react"

import { Column } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Box, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskColumnProps extends HTMLAttributes<HTMLDivElement> {
	column: Column
	edit?: ReactNode
	delete?: ReactNode
}

export const TaskColumn: FC<PropsWithChildren<TaskColumnProps>> = ({
	column,
	edit: Edit,
	delete: Delete,
	className,
	children,
	...props
}) => {
	const classes = classname(styles.column, className)
	const { bg, name } = column

	return (
		<Box className={classes} {...props}>
			<div className={styles.head}>
				<div className={styles.headText}>
					<span className={styles.circle} style={{ background: bg }} />
					<Text className={styles.title}>{name}</Text>
					<Text className={styles.count}></Text>
				</div>
				<div className={styles.actions}>
					{Edit && Edit}
					{Delete && Delete}
				</div>
			</div>
			<div className={styles.divider} style={{ background: bg }} />
			<div className={styles.body}>{children}</div>
		</Box>
	)
}

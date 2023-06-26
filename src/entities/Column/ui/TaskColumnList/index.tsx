import { useStoreMap } from "effector-react"
import { FC, HTMLAttributes } from "react"

import { TaskColumn } from "@/entities/Column/ui/TaskColumn"

import { classname } from "@/shared/package/classname"
import { Skeleton, Stack } from "@/shared/ui"

import { $columns, columnByProjectIdSelector } from "../../model"

import styles from "./styles.module.scss"

interface TaskColumnListProps extends HTMLAttributes<HTMLDivElement> {
	id: string
}

export const TaskColumnList: FC<TaskColumnListProps> = ({ id, className, ...props }) => {
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
						<TaskColumn column={col} />
					</Skeleton>
				))}
			</Stack>
		</div>
	)
}

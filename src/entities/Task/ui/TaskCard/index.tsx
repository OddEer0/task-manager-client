import { FC, ReactNode } from "react"

import { Task } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Badge, Card, CardBody, CardHeader, CardProps, Stack, Text } from "@/shared/ui"

import { DESCRIPTION_TASK_PLACEHOLDER } from "../../lib.ts"

import styles from "./styles.module.scss"

interface TaskCardProps extends CardProps {
	task: Task
	taskOption: ReactNode
	addTag?: ReactNode
	addPriority?: ReactNode
}

export const TaskCard: FC<TaskCardProps> = ({
	taskOption: TaskOption,
	className,
	task,
	addTag,
	addPriority,
	...props
}) => {
	const classes = classname(styles.card, className)
	const { name, tags, description } = task

	return (
		<Card className={classes} {...props}>
			<CardHeader className={styles.cardHeader}>{TaskOption}</CardHeader>
			<CardBody className={styles.cardBody}>
				<Text fontSize="xl">{name}</Text>
				<Text className={styles.description} fontSize="xs">
					{description || DESCRIPTION_TASK_PLACEHOLDER}
				</Text>
				{!!tags.length && (
					<Stack direction="row">
						{tags.map(tag => (
							<Badge key={tag.id} sx={{ background: tag.bg, color: tag.color }}>
								{tag.name}
							</Badge>
						))}
					</Stack>
				)}
				{addTag}
				{addPriority}
			</CardBody>
		</Card>
	)
}

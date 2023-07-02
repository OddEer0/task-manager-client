import { FC } from "react"

import { Task } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Badge, Card, CardBody, CardHeader, CardProps, Stack, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskCardProps extends CardProps {
	task: Task
}

export const TaskCard: FC<TaskCardProps> = ({ className, task, ...props }) => {
	const classes = classname(styles.card, className)
	const { name, tags, description } = task

	return (
		<Card className={classes} {...props}>
			<CardHeader className={styles.cardHeader}>X</CardHeader>
			<CardBody className={styles.cardBody}>
				<Text fontSize="xl">{name}</Text>
				{description && <Text>{description}</Text>}
				{!!tags.length && (
					<Stack direction="row">
						{tags.map(tag => (
							<Badge key={tag.id} sx={{ background: tag.bg, color: tag.color }}>
								{tag.name}
							</Badge>
						))}
					</Stack>
				)}
			</CardBody>
		</Card>
	)
}

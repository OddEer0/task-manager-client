import { CardFooter } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

import { Task } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Card, CardBody, CardHeader, CardProps, Text } from "@/shared/ui"

import { DESCRIPTION_TASK_PLACEHOLDER } from "../../lib"

import styles from "./styles.module.scss"

interface TaskCardProps extends CardProps {
	task: Task
	taskOption: ReactNode
	addTag?: ReactNode
	tagList?: ReactNode
	taskPriority?: ReactNode
}

export const TaskCard: FC<TaskCardProps> = ({
	taskOption: TaskOption,
	className,
	task,
	addTag,
	tagList,
	taskPriority,
	...props
}) => {
	const classes = classname(styles.card, className)
	const { name, tags, description } = task

	return (
		<Card className={classes} {...props}>
			<CardHeader className={styles.cardHeader}>{TaskOption}</CardHeader>
			<CardBody className={styles.cardBody}>
				<Text className={styles.title} fontSize="xl">
					{name}
				</Text>
				<Text className={styles.description} fontSize="xs">
					{description || DESCRIPTION_TASK_PLACEHOLDER}
				</Text>
				{!!tags.length && tagList}
			</CardBody>
			<CardFooter className={styles.footer}>
				{addTag}
				{taskPriority}
			</CardFooter>
		</Card>
	)
}

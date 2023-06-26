import { FC } from "react"

import { Task } from "@/shared/api"
import { Card } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TaskCardProps {
	task: Task
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
	return <Card className={styles.card}>{task.name}</Card>
}

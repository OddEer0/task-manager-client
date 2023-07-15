import { FC } from "react"
import { Navigate, useParams } from "react-router-dom"

import { TaskColumnList } from "@/widgets/TaskSpace"

import { CreateColumn } from "@/features/ColumnAction"
import { CreateTask } from "@/features/TaskAction"

import styles from "./styles.module.scss"

export const TasksSpacePage: FC = () => {
	const params = useParams()

	if (!params.id) {
		return <Navigate to="/not-found" />
	}

	return (
		<section className={styles.section}>
			<TaskColumnList id={params.id} addTask={CreateTask} />
			<CreateColumn className={styles.create} projectId={params.id}>
				Создать доску
			</CreateColumn>
		</section>
	)
}

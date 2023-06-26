import { FC } from "react"

import { CreateProject, EditProjectIcon } from "@/features/ProjectAction"

import { ProjectCardList } from "@/entities/Project"

import { classname } from "@/shared/package/classname"

import styles from "./styles.module.scss"

export const TasksPage: FC = () => {
	return (
		<>
			<section className={classname(styles.section, styles.first)}>
				<CreateProject />
			</section>
			<section className={classname(styles.section, styles.second)}>
				<ProjectCardList edit={EditProjectIcon} />
			</section>
		</>
	)
}

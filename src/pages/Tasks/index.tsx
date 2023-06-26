import { FC } from "react"

import { CreateProject, EditProjectIcon } from "@/features/ProjectAction"

import { ProjectCardList } from "@/entities/Project"

export const TasksPage: FC = () => {
	return (
		<>
			<ProjectCardList edit={EditProjectIcon} />
			<CreateProject />
		</>
	)
}

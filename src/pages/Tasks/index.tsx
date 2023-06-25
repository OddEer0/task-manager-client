import { FC } from "react"

import { CreateProject } from "@/features/CreateProject"

import { ProjectCardList } from "@/entities/Project"

export const TasksPage: FC = () => {
	return (
		<>
			<ProjectCardList />
			<CreateProject />
		</>
	)
}

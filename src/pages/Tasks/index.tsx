import { FC } from "react"

import { ProjectCard, ProjectCardList } from "@/entities/Project"

export const TasksPage: FC = () => {
	return (
		<>
			<ProjectCard
				project={{
					id: "dsa",
					taskCount: 80,
					bg: "#000000",
					color: "#ffffff",
					name: "Projectssssssssssssssssssssssssss",
				}}
			/>
			<ProjectCardList />
		</>
	)
}

import { useStore } from "effector-react"
import { FC } from "react"

import { Skeleton, Stack, Text } from "@/shared/ui"

import { $projects } from "../../model"
import { ProjectCard } from "../ProjectCard"

interface ProjectCardListProps {
	edit: FC<{ id: string }>
}

export const ProjectCardList: FC<ProjectCardListProps> = ({ edit: Edit }) => {
	const data = useStore($projects)

	return !!data && !!data.length ? (
		<Stack>
			{data.map(project => (
				<Skeleton isLoaded={true} key={project.id}>
					<ProjectCard project={project} setting={<Edit id={project.id} />} />
				</Skeleton>
			))}
		</Stack>
	) : (
		<Text>Нет проектов</Text>
	)
}

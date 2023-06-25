import { useStore } from "effector-react"
import { FC } from "react"

import { Skeleton, Stack, Text } from "@/shared/ui"

import { $projects } from "../../model"
import { ProjectCard } from "../ProjectCard"

export const ProjectCardList: FC = () => {
	const data = useStore($projects)

	return !!data && !!data.length ? (
		<Stack>
			{data.map(project => (
				<Skeleton isLoaded={true} key={project.id}>
					<ProjectCard project={project} />
				</Skeleton>
			))}
		</Stack>
	) : (
		<Text>Нет проектов</Text>
	)
}

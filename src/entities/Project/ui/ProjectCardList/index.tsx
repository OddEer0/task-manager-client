import { FC } from "react"

import { Skeleton, Stack, Text } from "@/shared/ui"

import { useProjectQuery } from "../../api"
import { ProjectCard } from "../ProjectCard"

export const ProjectCardList: FC = () => {
	const { data, error, isLoading } = useProjectQuery("me")

	if (error) {
		return <Text>Error</Text>
	}

	return !!data && !!data.length ? (
		<Stack>
			{data.map(project => (
				<Skeleton isLoaded={isLoading}>
					<ProjectCard project={project} />
				</Skeleton>
			))}
		</Stack>
	) : (
		<Text>Нет проектов</Text>
	)
}

import { useStore } from "effector-react"
import { FC, HTMLAttributes } from "react"

import { $projects } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Skeleton, Stack, Text } from "@/shared/ui"

import { ProjectCard } from "../ProjectCard"

import styles from "./styles.module.scss"

interface ProjectCardListProps extends HTMLAttributes<HTMLDivElement> {
	edit: FC<{ id: string }>
}

export const ProjectCardList: FC<ProjectCardListProps> = ({
	edit: Edit,
	className,
	...props
}) => {
	const data = useStore($projects)
	const classes = classname(styles.wrapper, className)

	return (
		<div {...props} className={classes}>
			{!!data && !!data.length ? (
				<Stack>
					{data.map(project => (
						<Skeleton isLoaded={true} key={project.id}>
							<ProjectCard project={project} setting={<Edit id={project.id} />} />
						</Skeleton>
					))}
				</Stack>
			) : (
				<Text>Нет проектов</Text>
			)}
		</div>
	)
}

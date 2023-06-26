import { CardProps } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { AiOutlineProject } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

import { Project } from "@/shared/api/types"
import { classname } from "@/shared/package/classname"
import { Card, CardBody, CardHeader, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

interface ProjectCardProps extends CardProps {
	project: Project
	setting?: ReactNode
}

export const ProjectCard: FC<ProjectCardProps> = ({
	project,
	setting,
	className,
	...props
}) => {
	const classes = classname(styles.card, className)
	const navigate = useNavigate()
	const clickHandle = () => {
		navigate(project.id)
	}

	return (
		<Card className={classes} {...props}>
			<CardHeader
				onClick={clickHandle}
				className={styles.header}
				sx={{ background: project.bg, color: project.color }}
			>
				<Text className={styles.title}>{project.name}</Text>
				<span className={styles.icon}>
					<AiOutlineProject />
				</span>
			</CardHeader>
			<CardBody className={styles.body}>
				<Text fontSize="xs">Кол-во задач {project.taskCount}</Text>
				{setting && <div className={styles.setting}>{setting}</div>}
			</CardBody>
		</Card>
	)
}

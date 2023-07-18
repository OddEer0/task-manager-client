import { FC } from "react"

import { Tag } from "@/shared/api"
import { Box, Stack, StackProps, Tag as TagComp, TagLabel } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TagList extends StackProps {
	tags: Tag[]
	taskId: string
	tagOptions: FC<{ id: string }>
	tagRemove: FC<{ tagId: string; taskId: string }>
}

export const TagList: FC<TagList> = ({
	tags,
	taskId,
	tagOptions: TagOptions,
	tagRemove: TagRemove,
	...props
}) => {
	return (
		<Stack wrap="wrap" direction="row" {...props}>
			{tags.map(tag => (
				<TagComp
					className={styles.tag}
					key={tag.id}
					sx={{ background: tag.bg, color: tag.color }}
				>
					<TagLabel>{tag.name}</TagLabel>
					<Box
						className={styles.option}
						sx={{ background: tag.bg, boxShadow: `0px 0px 5px ${tag.bg}` }}
					>
						<TagOptions id={tag.id} />
						<TagRemove tagId={tag.id} taskId={taskId} />
					</Box>
				</TagComp>
			))}
		</Stack>
	)
}

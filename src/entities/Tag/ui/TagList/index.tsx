import { SystemStyleObject } from "@chakra-ui/react"
import { FC } from "react"

import { Tag } from "@/shared/api"
import { Stack, StackProps, Tag as TagComp, TagLabel } from "@/shared/ui"

import styles from "./styles.module.scss"

interface TagList extends StackProps {
	tags: Tag[]
	tagOptions: FC<{ id: string; className?: string; sx?: SystemStyleObject }>
}

export const TagList: FC<TagList> = ({ tags, tagOptions: TagOptions, ...props }) => {
	return (
		<Stack wrap="wrap" direction="row" {...props}>
			{tags.map(tag => (
				<TagComp
					className={styles.tag}
					key={tag.id}
					sx={{ background: tag.bg, color: tag.color }}
				>
					<TagLabel>{tag.name}</TagLabel>
					<TagOptions
						id={tag.id}
						className={styles.option}
						sx={{ background: tag.bg, boxShadow: `0px 0px 5px ${tag.bg}` }}
					/>
				</TagComp>
			))}
		</Stack>
	)
}

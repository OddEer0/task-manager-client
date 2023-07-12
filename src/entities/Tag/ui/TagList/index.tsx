import { FC, HTMLAttributes } from "react"

import { Tag } from "@/shared/api"
import { Badge } from "@/shared/ui"

interface TagList extends HTMLAttributes<HTMLUListElement> {
	tags: Tag[]
}

export const TagList: FC<TagList> = ({ tags, ...props }) => {
	return (
		<ul {...props}>
			{tags.map(tag => (
				<li key={tag.id}>
					<Badge sx={{ background: tag.bg, color: tag.color }}>{tag.name}</Badge>
				</li>
			))}
		</ul>
	)
}

import { useStoreMap } from "effector-react"
import { FC } from "react"
import { BsTags } from "react-icons/bs"
import { useParams } from "react-router-dom"

import { $tags, $tasksApi, Tag, tagByProjectIdSelector } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { Tag as TagComp } from "@/shared/ui"
import { Menu, MenuButton, MenuButtonProps, MenuItem, MenuList } from "@/shared/ui"

import { CreateTagInput } from "../CreateTagInput"

import styles from "./styles.module.scss"

interface AddTaskTagProps extends MenuButtonProps {
	id: string
	projectId?: string
	onAddTag?: (tag: Tag) => void
}

export const AddTaskTag: FC<AddTaskTagProps> = ({
	id,
	projectId,
	onAddTag,
	className,
	...props
}) => {
	const params = useParams()
	const tags = useStoreMap({
		store: $tags,
		keys: [projectId || params.id],
		fn: tagByProjectIdSelector,
	})

	const addTagHandle = (tag: Tag) => {
		$tasksApi.addTag({ id, tag })
		onAddTag?.call(null, tag)
	}

	return (
		<Menu>
			<MenuButton className={classname(styles.icon, className)} {...props}>
				<BsTags />
			</MenuButton>
			<MenuList>
				<CreateTagInput className={styles.inputGroup} projectId={params.id as string} />
				{tags.map(tag => (
					<MenuItem onClick={() => addTagHandle(tag)} key={tag.id}>
						<TagComp
							className={styles.itemBadge}
							sx={{
								background: tag.bg,
								color: tag.color,
							}}
						>
							{tag.name}
						</TagComp>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	)
}

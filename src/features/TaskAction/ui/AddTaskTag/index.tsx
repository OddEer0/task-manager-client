import { useStoreMap } from "effector-react"
import { FC } from "react"
import { BsTags } from "react-icons/bs"
import { useParams } from "react-router-dom"

import { $tags, $tasksApi, Tag, tagByProjectIdSelector } from "@/shared/api"
import { Tag as TagComp } from "@/shared/ui"
import { Menu, MenuButton, MenuItem, MenuList } from "@/shared/ui"

import { CreateTagInput } from "../CreateTagInput"

import styles from "./styles.module.scss"

interface AddTaskTagProps {
	id: string
}

export const AddTaskTag: FC<AddTaskTagProps> = ({ id }) => {
	const params = useParams()
	const tags = useStoreMap({
		store: $tags,
		keys: [params.id],
		fn: tagByProjectIdSelector,
	})

	const addTagHandle = (tag: Tag) => {
		$tasksApi.addTag({ id, tag })
	}

	return (
		<Menu>
			<MenuButton className={styles.icon}>
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

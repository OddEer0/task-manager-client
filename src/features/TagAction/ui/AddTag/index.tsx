import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { useStoreMap } from "effector-react"
import { FC } from "react"
import { useParams } from "react-router-dom"

import { $tags, tagByProjectIdSelector } from "@/shared/api"

export const AddTag: FC = () => {
	const params = useParams()
	const tags = useStoreMap({
		store: $tags,
		keys: [params.id],
		fn: tagByProjectIdSelector,
	})

	if (!tags.length) {
		return null
	}

	return (
		<Menu>
			<MenuButton>tag</MenuButton>
			<MenuList>
				{tags.map(tag => (
					<MenuItem key={tag.id}>{tag.name}</MenuItem>
				))}
			</MenuList>
		</Menu>
	)
}

import { Menu, MenuButton, MenuButtonProps, MenuList } from "@chakra-ui/react"
import { FC } from "react"
import { SlOptions } from "react-icons/sl"

import { ChangeColorItem } from "./ChangeColorItem"
import { ChangeNameItem } from "./ChangeNameItem"
import { DeleteTagItem } from "./DeleteTagItem"
import styles from "./styles.module.scss"

interface TagOptionsProps extends MenuButtonProps {
	id: string
}

export const TagOptions: FC<TagOptionsProps> = ({ id, ...props }) => {
	return (
		<Menu>
			<MenuButton {...props}>
				<SlOptions className={styles.icon} />
			</MenuButton>
			<MenuList data-testid="tag-options-menu">
				<ChangeNameItem id={id} />
				<ChangeColorItem id={id} />
				<DeleteTagItem id={id} />
			</MenuList>
		</Menu>
	)
}

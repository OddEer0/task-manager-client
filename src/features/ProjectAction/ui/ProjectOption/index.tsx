import { Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { FC } from "react"
import { SlOptionsVertical } from "react-icons/sl"

import { EditProjectItem } from "./EditProjectItem"
import styles from "./styles.module.scss"

interface ProjectOptionProps {
	id: string
}

export const ProjectOption: FC<ProjectOptionProps> = ({ id }) => {
	return (
		<Menu>
			<MenuButton className={styles.button}>
				<SlOptionsVertical />
			</MenuButton>
			<MenuList>
				<EditProjectItem id={id} />
			</MenuList>
		</Menu>
	)
}

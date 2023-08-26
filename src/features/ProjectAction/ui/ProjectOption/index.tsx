import { Menu, MenuButton, MenuList, Portal } from "@chakra-ui/react"
import { FC } from "react"
import { SlOptionsVertical } from "react-icons/sl"

import { DeleteProjectItem } from "./DeleteProjectItem"
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
			<Portal>
				<MenuList>
					<EditProjectItem id={id} />
					<DeleteProjectItem id={id} />
				</MenuList>
			</Portal>
		</Menu>
	)
}

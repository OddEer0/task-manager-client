import { FC, PropsWithChildren } from "react"
import { SlOptions } from "react-icons/sl"

import { Menu, MenuButton, MenuList } from "@/shared/ui"

import { DeleteItem } from "./DeleteItem"
import { EditItem } from "./EditItem"
import styles from "./styles.module.scss"

interface TaskOptionProps {
	id: string
}

export const TaskOption: FC<PropsWithChildren<TaskOptionProps>> = ({ id }) => {
	return (
		<>
			<Menu>
				<MenuButton className={styles.icon}>
					<SlOptions />
				</MenuButton>
				<MenuList>
					<EditItem id={id} />
					<DeleteItem id={id} />
				</MenuList>
			</Menu>
		</>
	)
}

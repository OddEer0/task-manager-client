import { Menu, MenuButton, MenuButtonProps, MenuItem, MenuList } from "@chakra-ui/react"
import { useEvent } from "effector-react"
import { FC } from "react"
import { BsFlagFill } from "react-icons/bs"

import { $tasksApi, PriorityVariant } from "@/shared/api"
import { classname } from "@/shared/package/classname"

import {
	PRIORITY_DEFAULT_COLOR,
	PRIORITY_EXTRA_ITEM,
	PRIORITY_HIGH_ITEM,
	PRIORITY_LOW_ITEM,
	PRIORITY_MEDIUM_ITEM,
	REMOVE_PRIORITY_ITEM,
	getPriorityColor,
} from "../../lib"

import styles from "./styles.module.scss"

interface TaskPriorityProps extends MenuButtonProps {
	priority: PriorityVariant | null
	taskId: string
}

export const TaskPriority: FC<TaskPriorityProps> = ({
	priority,
	taskId,
	className,
	...props
}) => {
	const color = getPriorityColor(priority)
	const changePriority = useEvent($tasksApi.changePriority)

	const clickHandle = (priority: PriorityVariant | null) => {
		changePriority({ priority, taskId })
	}

	return (
		<Menu>
			<MenuButton {...props} sx={{ color }} className={classname(styles.btn, className)}>
				<BsFlagFill />
			</MenuButton>
			<MenuList>
				<MenuItem
					sx={{ color: getPriorityColor("extra") }}
					onClick={() => clickHandle("extra")}
				>
					<BsFlagFill className={styles.item} /> {PRIORITY_EXTRA_ITEM}
				</MenuItem>
				<MenuItem
					sx={{ color: getPriorityColor("high") }}
					onClick={() => clickHandle("high")}
				>
					<BsFlagFill className={styles.item} /> {PRIORITY_HIGH_ITEM}
				</MenuItem>
				<MenuItem
					sx={{ color: getPriorityColor("medium") }}
					onClick={() => clickHandle("medium")}
				>
					<BsFlagFill className={styles.item} /> {PRIORITY_MEDIUM_ITEM}
				</MenuItem>
				<MenuItem
					sx={{ color: getPriorityColor("low") }}
					onClick={() => clickHandle("low")}
				>
					<BsFlagFill className={styles.item} /> {PRIORITY_LOW_ITEM}
				</MenuItem>
				<MenuItem
					sx={{ color: PRIORITY_DEFAULT_COLOR }}
					onClick={() => clickHandle(null)}
				>
					<BsFlagFill className={styles.item} /> {REMOVE_PRIORITY_ITEM}
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

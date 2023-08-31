import { useEvent } from "effector-react"
import { FC } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $tasksApi } from "@/shared/api"
import { useConfirm } from "@/shared/package/react-confirm"
import { MenuItem } from "@/shared/ui"

import { TASK_DELETE_QUESTION, TASK_OPTION_DELETE_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface DeleteItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteItem: FC<DeleteItemProps> = ({ id, onDelete }) => {
	const confirm = useConfirm()
	const deleteTaskHandle = useEvent($tasksApi.deleteTask)

	const clickHandle = () => {
		confirm(TASK_DELETE_QUESTION, () => {
			deleteTaskHandle(id)
			onDelete && onDelete()
		})
	}

	return (
		<MenuItem className={styles.deleteItem} onClick={clickHandle}>
			<RiDeleteBin6Line className={styles.itemIcon} /> {TASK_OPTION_DELETE_ITEM}
		</MenuItem>
	)
}

import { useEvent } from "effector-react"
import { FC } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"

import { $tagsApi } from "@/shared/api"
import { useConfirm } from "@/shared/package/react-confirm"
import { MenuItem } from "@/shared/ui"

import { CONFIRM_DELETE_TEXT, DELETE_TAG_ITEM } from "../../lib"

import styles from "./styles.module.scss"

interface DeleteTagItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteTagItem: FC<DeleteTagItemProps> = ({ id, onDelete }) => {
	const confirm = useConfirm()
	const deleteTag = useEvent($tagsApi.deleteTag)

	const clickHandle = () => {
		confirm(CONFIRM_DELETE_TEXT, () => {
			deleteTag(id)
			onDelete && onDelete()
		})
	}

	return (
		<MenuItem onClick={clickHandle} className={styles.deleteItem}>
			<RiDeleteBin6Line className={styles.itemIcon} />
			{DELETE_TAG_ITEM}
		</MenuItem>
	)
}

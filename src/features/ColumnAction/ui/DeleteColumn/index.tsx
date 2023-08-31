import { useEvent } from "effector-react"
import { FC } from "react"
import { IconBaseProps } from "react-icons"
import { RiDeleteBin6Line } from "react-icons/ri"

import { DELETE_COLUMN_QUESTION } from "@/features/ColumnAction/lib"

import { $columnsApi } from "@/shared/api"
import { classname } from "@/shared/package/classname"
import { useConfirm } from "@/shared/package/react-confirm"

import styles from "./styles.module.scss"

interface DeleteColumnProps extends IconBaseProps {
	id: string
	onDelete?: () => void
}

export const DeleteColumn: FC<DeleteColumnProps> = ({
	id,
	className,
	onDelete,
	...props
}) => {
	const confirm = useConfirm()
	const deleteColumn = useEvent($columnsApi.deleteColumn)
	const clickHandle = () => {
		confirm(DELETE_COLUMN_QUESTION, () => {
			deleteColumn(id)
			onDelete && onDelete()
		})
	}

	return (
		<RiDeleteBin6Line
			className={classname(styles.icon, className)}
			onClick={clickHandle}
			{...props}
		/>
	)
}

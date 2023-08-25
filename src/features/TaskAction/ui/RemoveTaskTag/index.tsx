import { useEvent } from "effector-react"
import { FC } from "react"
import { IconBaseProps } from "react-icons"
import { IoMdClose } from "react-icons/io"

import { $tasksApi } from "@/shared/api"
import { classname } from "@/shared/package/classname"

import styles from "./styles.module.scss"

interface RemoveTaskTagProps extends IconBaseProps {
	tagId: string
	taskId: string
	onRemove?: () => void
}

export const RemoveTaskTag: FC<RemoveTaskTagProps> = ({
	taskId,
	tagId,
	onRemove,
	className,
	...props
}) => {
	const removeEvent = useEvent($tasksApi.removeTag)
	const removeHandle = () => {
		removeEvent({ tagId, taskId })
		onRemove && onRemove()
	}

	return (
		<IoMdClose
			onClick={removeHandle}
			className={classname(styles.icon, className)}
			title="удалить тег из задачи"
			{...props}
		/>
	)
}

import { useEvent } from "effector-react"
import { FC } from "react"

import { $projectsApi } from "@/shared/api"
import { useConfirm } from "@/shared/package/react-confirm"
import { MenuItem } from "@/shared/ui"

import { DELETE_PROJECT_ITEM, PROJECT_DELETE_QUESTION } from "../../lib"

interface DeleteProjectItemProps {
	id: string
	onDelete?: () => void
}

export const DeleteProjectItem: FC<DeleteProjectItemProps> = ({ onDelete, id }) => {
	const deleteProjectHandle = useEvent($projectsApi.deleteProject)
	const confirm = useConfirm()
	const deleteHandle = () => {
		confirm(PROJECT_DELETE_QUESTION, () => {
			deleteProjectHandle(id)
			onDelete && onDelete()
		})
	}

	return <MenuItem onClick={deleteHandle}>{DELETE_PROJECT_ITEM}</MenuItem>
}

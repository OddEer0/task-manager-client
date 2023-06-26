import { PriorityVariant } from "./Priority"
import { Tag } from "./Tag"

export interface TaskCreate {
	name: string
	columnId: string
}

export interface Task extends TaskCreate {
	id: string
	order: number
	description: string | null
	priority: PriorityVariant | null
	tags: Tag[]
}

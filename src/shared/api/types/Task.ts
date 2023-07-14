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

export interface TaskUpdate {
	task: Partial<Omit<Task, "id" | "columnId">>
	id: string
}

export interface TaskAddTag {
	id: string
	tag: Tag
}

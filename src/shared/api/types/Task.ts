import { Tag } from "./Tag"

export interface Task {
	id: string
	name: string
	order: number
	tags: Tag[]
}

export interface TaskServer extends Task {
	columnId: string
}

import {
	Task,
	TaskAddTag,
	TaskChangePriority,
	TaskCreate,
	TaskRemoveTag,
	TaskUpdate,
} from "@/shared/api"

import { mockTags } from "../tag"

export const mockCreateTask: TaskCreate = { name: "Go to file", columnId: "fakeId" }

export const mockUpdateTask: TaskUpdate = { id: "task-first", task: { name: "To Go" } }

export const mockTasks: Task[] = [
	{
		id: "task-first",
		name: "Go To",
		priority: null,
		order: 1,
		tags: [{ ...mockTags[0] }],
		columnId: "column-first",
		description: null,
	},
	{
		id: "task-second",
		name: "Go To second",
		priority: null,
		order: 2,
		tags: [{ ...mockTags[1] }],
		columnId: "column-second",
		description: null,
	},
]

export const mockTaskAddTag: TaskAddTag = {
	id: "task-first",
	tag: mockTags[1],
}

export const mockTaskRemoveTag: TaskRemoveTag = {
	taskId: mockTasks[0].id,
	tagId: mockTasks[0].tags[0].id,
}

export const mockTaskChangePriority: TaskChangePriority = {
	priority: "low",
	taskId: mockTasks[0].id,
}

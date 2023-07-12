import { Task, TaskAddTag, TaskCreate, TaskUpdate } from "@/shared/api"

import { mockTags } from "../tag"

export const mockCreateTask: TaskCreate = { name: "Go to file", columnId: "fakeId" }

export const mockUpdateTask: TaskUpdate = { id: "first", task: { name: "To Go" } }

export const mockTasks: Task[] = [
	{
		id: "first",
		name: "Go To",
		priority: null,
		order: 1,
		tags: [],
		columnId: "fakeId",
		description: null,
	},
	{
		id: "second",
		name: "Go To second",
		priority: null,
		order: 2,
		tags: [],
		columnId: "fakeId",
		description: null,
	},
]

export const mockTaskAddTag: TaskAddTag = {
	id: "first",
	tag: mockTags[0],
}

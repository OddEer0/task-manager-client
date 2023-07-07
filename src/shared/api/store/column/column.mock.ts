import { Column, ColumnCreate, ColumnUpdate } from "@/shared/api"

export const mockCreateColumn: ColumnCreate = {
	name: "TODO",
	bg: "#000000",
	projectId: "fakeId",
}

export const mockUpdateColumn: ColumnUpdate = {
	id: "first",
	column: {
		name: "progress",
	},
}

export const mockColumns: Column[] = [
	{ id: "first", name: "TODO", bg: "#000000", projectId: "fakeId", order: 1 },
	{ id: "second", name: "BACKLOG", bg: "#000000", projectId: "fakeId", order: 2 },
]

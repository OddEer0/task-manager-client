import { Column, ColumnCreate, ColumnUpdate } from "@/shared/api"

export const mockCreateColumn: ColumnCreate = {
	name: "TODO",
	bg: "#000000",
	projectId: "fakeId",
}

export const mockUpdateColumn: ColumnUpdate = {
	id: "column-first",
	column: {
		name: "progress",
	},
}

export const mockColumns: Column[] = [
	{
		id: "column-first",
		name: "TODO",
		bg: "#000000",
		projectId: "project-first",
		order: 1,
	},
	{
		id: "column-second",
		name: "BACKLOG",
		bg: "#000000",
		projectId: "project-second",
		order: 2,
	},
]

import { Tag, TagCreate, TagUpdate } from "@/shared/api"

export const mockTags: Tag[] = [
	{
		id: "first",
		name: "frontend",
		bg: "#ffffff",
		color: "#000000",
		projectId: "project-first",
	},
	{
		id: "second",
		name: "feature",
		bg: "#ffffff",
		color: "#000000",
		projectId: "project-second",
	},
]

export const mockTagCreate: TagCreate = {
	name: "frontend",
	projectId: "project-first",
}

export const mockTagUpdate: TagUpdate = {
	id: mockTags[0].id,
	tag: { name: "backend" },
}

import { Project, ProjectCreate, ProjectUpdate } from "@/shared/api"

export const mockUpdateProject: ProjectUpdate = {
	id: "first",
	project: {
		name: "project update",
	},
}

export const mockCreateProject: ProjectCreate = {
	bg: "#ffffff",
	color: "#000000",
	name: "Project",
}

export const mockProjects: Project[] = [
	{ id: "first", name: "Proj", color: "#000000", bg: "#ffffff", taskCount: 0 },
	{ id: "second", name: "Proj second", color: "#000000", bg: "#ffffff", taskCount: 0 },
]

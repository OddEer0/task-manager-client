export interface ProjectCreate {
	color: string
	name: string
	bg: string
}

export interface Project extends ProjectCreate {
	id: string
	taskCount: number
}

export interface ProjectUpdate {
	project: Partial<Omit<Project, "id">>
	id: string
}

export interface ProjectServer extends Project {
	userId: string
}

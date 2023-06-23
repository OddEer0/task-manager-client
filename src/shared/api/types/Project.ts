export interface ProjectCreate {
	color: string
	name: string
	bg: string
}

export type ProjectUpdate = ProjectCreate

export interface Project extends ProjectCreate {
	id: string
	taskCount: number
}

export interface ProjectServer extends Project {
	userId: string
}

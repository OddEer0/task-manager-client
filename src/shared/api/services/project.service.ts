import { uuid } from "@/shared/package/uuid"

import { PROJECT_KEY } from "../constants.ts"
import { Project, ProjectCreate, ProjectServer, ProjectUpdate } from "../types"

class ProjectService {
	getProjectsByUserId(id: string): Project[] {
		const projectsJson = localStorage.getItem(PROJECT_KEY)
		const projectsParse = JSON.parse(projectsJson) as ProjectServer[]
		const projects = projectsParse || []
		const filteredProjects = projects.filter(task => task.userId === id)
		return filteredProjects.map(({ id, bg, color, name }) => ({ id, bg, color, name }))
	}

	createProject(projectData: ProjectCreate) {
		const projectsJson = localStorage.getItem(PROJECT_KEY)
		const projectsParse = JSON.parse(projectsJson) as ProjectServer[]
		const projects = projectsParse || []
		const mappedProject: ProjectServer = {
			...projectData,
			userId: "me",
			id: uuid.v4(),
			taskCount: 84,
		}
		const newProjects = [...projects, mappedProject]
		localStorage.setItem(PROJECT_KEY, newProjects)
		return projectData
	}

	updateProject(id: string, projectData: ProjectUpdate): Project {
		const projectsJson = localStorage.getItem(PROJECT_KEY)
		const projectsParse = JSON.parse(projectsJson) as ProjectServer[]
		const projects = projectsParse || []
		const currentProject = projects.find(proj => proj.id === id)
		if (!currentProject) {
			return
		}
		const deletedProjects = projects.filter(proj => proj.id !== id)
		const newProject = { ...currentProject, ...projectData }
		const newProjects = [...deletedProjects, newProject]
		localStorage.setItem(PROJECT_KEY, newProjects)
		return newProject
	}
}

export const projectService = new ProjectService()

import { allSettled, fork } from "effector"

import { $projectsApi } from "./project.api"
import { mockCreateProject, mockProjects, mockUpdateProject } from "./project.mock"
import { $projects } from "./project.store"

describe("Project model testing", () => {
	it("Should default value empty array", () => {
		const scope = fork()
		expect(scope.getState($projects)).toEqual([])
	})

	it("Should create project", async () => {
		const scope = fork()
		expect(scope.getState($projects).length).toBe(0)

		await allSettled($projectsApi.addProject, {
			scope,
			params: mockCreateProject,
		})
		expect(scope.getState($projects).length).toBe(1)
	})

	it("Should delete project", async () => {
		const scope = fork({
			values: new Map([[$projects, mockProjects]]),
		})
		expect(scope.getState($projects).length).toBe(2)

		await allSettled($projectsApi.deleteProject, {
			scope,
			params: mockProjects[0].id,
		})
		expect(scope.getState($projects).length).toBe(1)
	})

	it("Should update project", async () => {
		const scope = fork({ values: new Map([[$projects, mockProjects]]) })
		expect(scope.getState($projects)[0].name).toBe(mockProjects[0].name)

		await allSettled($projectsApi.updateProject, {
			scope,
			params: mockUpdateProject,
		})
		expect(scope.getState($projects)[0].name).toBe(mockUpdateProject.project.name)
	})
})

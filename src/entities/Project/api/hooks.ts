import { useQuery } from "@tanstack/react-query"

import { projectService, queryKey } from "@/shared/api"

export const useProjectQuery = (id: string) => {
	return useQuery(queryKey.projects(id), () => projectService.getProjectsByUserId(id))
}

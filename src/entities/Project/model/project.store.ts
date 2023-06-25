import { createStore } from "effector"
import { persist } from "effector-storage/local"

import { PROJECTS_KEY, Project } from "@/shared/api"

export const $projects = createStore<Project[]>([])

persist({ store: $projects, key: PROJECTS_KEY })

import { createStore } from "effector"
import { persist } from "effector-storage/local"

import { Project } from "@/shared/api"

export const $projects = createStore<Project[]>([])

persist({ store: $projects, key: "effector-project" })

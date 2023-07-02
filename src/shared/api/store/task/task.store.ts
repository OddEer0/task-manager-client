import { createStore } from "effector"
import { persist } from "effector-storage/local"

import { TASK_KEY } from "../../constants"
import { Task } from "../../types"

export const $tasks = createStore<Task[]>([])

persist({ store: $tasks, key: TASK_KEY })

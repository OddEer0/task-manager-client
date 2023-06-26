import { createStore } from "effector"
import { persist } from "effector-storage/local"

import { COLUMNS_KEY, Column } from "@/shared/api"

export const $columns = createStore<Column[]>([])

persist({ store: $columns, key: COLUMNS_KEY })

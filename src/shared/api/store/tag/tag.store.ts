import { createStore } from "effector"
import { persist } from "effector-storage/local"

import { TAGS_KEY, Tag } from "@/shared/api"

export const $tags = createStore<Tag[]>([])

persist({ store: $tags, key: TAGS_KEY })

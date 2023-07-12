import { createStore } from "effector"

import { Tag } from "@/shared/api"

export const $tags = createStore<Tag[]>([])

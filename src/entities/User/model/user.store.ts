import { createStore } from "effector"

import { IUser } from "@/shared/api"

export const $profile = createStore<IUser | null>(null)

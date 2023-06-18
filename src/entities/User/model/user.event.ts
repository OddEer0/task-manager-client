import { createEvent } from "effector"

import { IUser } from "@/shared/api"

export const addProfileEvent = createEvent<IUser>()

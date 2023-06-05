import { IUserStore } from "./user.types"

export const profileSelector = (state: IUserStore) => state.profile

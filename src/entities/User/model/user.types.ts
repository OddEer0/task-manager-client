import type { IUser } from "@/shared/api"

export interface IUserStore {
	profile: IUser | null
	setProfile: (user: IUser) => void
	removeProfile: () => void
}

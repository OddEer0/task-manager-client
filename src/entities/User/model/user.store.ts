import { createStore } from "@/shared/package/zustand"

import { IUserStore } from "./user.types"

export const useProfileStore = createStore<IUserStore>(set => ({
	profile: null,
	setProfile: user => {
		set({ profile: user })
	},
	removeProfile: () => {
		set({ profile: null })
	},
}))

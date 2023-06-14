import { createStore } from "@/shared/package/zustand"

import { IUserStore } from "./user.types"

export const useProfileStore = createStore<IUserStore>(set => ({
	profile: null,
	setProfile: user => {
		localStorage.setItem("isAuth", "true")
		set({ profile: user })
	},
	removeProfile: () => {
		localStorage.removeItem("isAuth")
		set({ profile: null })
	},
}))

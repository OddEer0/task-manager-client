import { classname } from "@/shared/package/classname"

import { IUserStore } from "./user.types"

export const profileSelector = (state: IUserStore) => state.profile

export const profileEventSelector = (state: IUserStore) => ({
	setProfile: state.setProfile,
	removeProfile: state.removeProfile,
})

export const profileHeadSelector = (state: IUserStore) => {
	const profile = state.profile

	if (profile) {
		const { avatar, firstName, lastName, age } = profile

		return {
			avatar: avatar || "",
			fullName: classname(firstName, lastName),
			subTitle: `Возраст: ${age || "Неизвестно"}`,
		}
	}

	return null
}

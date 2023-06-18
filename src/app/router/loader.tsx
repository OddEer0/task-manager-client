import { addProfileEvent } from "@/entities/User"

import { GQL_REFRESH, IUser, registrationMapper } from "@/shared/api"

import { apolloClient } from "../apollo/client"

export interface IMainLoader {
	user: IUser | null
}

export const mainLoader = async () => {
	const isAuth = localStorage.getItem("isAuth")

	if (!isAuth) {
		return {
			user: null,
		}
	}

	const {
		data: { user },
	} = await apolloClient.query({
		query: GQL_REFRESH,
	})

	const newUser = registrationMapper({ user })

	addProfileEvent(newUser)

	return {
		user: newUser,
	}
}

import { addProfileEvent } from "@/entities/User"

import { GQL_REFRESH, IUser } from "@/shared/api"

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

	addProfileEvent(user)

	return {
		user,
	}
}

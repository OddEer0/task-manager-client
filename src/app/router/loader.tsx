import { useProfileStore } from "@/entities/User"

import { GQL_REFRESH, IUser, userGqlMapper } from "@/shared/api"

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

	const newUser = userGqlMapper({ user })

	useProfileStore.setState({ profile: newUser })

	return {
		user: newUser,
	}
}

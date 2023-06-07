import { GQL_REFRESH } from "@/shared/api"

import { apolloClient } from "../apollo/client"

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

	return {
		user,
	}
}

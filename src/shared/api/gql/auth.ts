import { graphql } from "../typing"

export const GQL_REGISTRATION = graphql(`
	mutation UserRegistration($reg: AuthInputRegistration!) {
		user: registration(authInputRegistration: $reg) {
			id
			firstName
			lastName
			age
			email
			gender
			avatar
		}
	}
`)

export const GQL_REFRESH = graphql(`
	query RefreshToken {
		user: refresh {
			id
			firstName
			lastName
			age
			email
			gender
			avatar
		}
	}
`)

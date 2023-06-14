import { IUser } from "@/shared/api"
import { UserRegistrationMutation } from "@/shared/api/typing/graphql"

export const userGqlMapper = ({
	user: { id, firstName, lastName, email, age, avatar, gender },
}: UserRegistrationMutation): IUser => ({
	id,
	email,
	firstName,
	lastName,
	age,
	gender,
	avatar,
})

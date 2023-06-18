import { IUser } from "@/shared/api"

import { UserRegistrationMutation } from "../typing/graphql.ts"

export const registrationMapper = ({
	user: { id, age, avatar, email, gender, lastName, firstName },
}: UserRegistrationMutation): IUser => ({
	id,
	age,
	avatar,
	email,
	gender,
	firstName,
	lastName,
	fullName: `${firstName} ${lastName}`,
})

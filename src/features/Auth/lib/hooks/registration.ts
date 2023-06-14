import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"

import { profileEventSelector, useProfileStore } from "@/entities/User"

import { GQL_REGISTRATION, userGqlMapper } from "@/shared/api"

import { IRegistrationData } from "../types"

export const useUserRegistration = () => {
	const { register, handleSubmit } = useForm<IRegistrationData>()
	const { setProfile } = useProfileStore(profileEventSelector)
	const [mutate] = useMutation(GQL_REGISTRATION, {
		onCompleted(data) {
			setProfile(userGqlMapper(data))
		},
	})

	const submitHandler = handleSubmit((data: IRegistrationData) => {
		mutate({ variables: { reg: data } })
	})

	return {
		register,
		submitHandler,
	}
}

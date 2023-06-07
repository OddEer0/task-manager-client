import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"

import { profileEventSelector, useProfileStore } from "@/entities/User"

import { GQL_REGISTRATION } from "@/shared/api"

import { userDataMapToStore } from "../helpers"
import { IRegistrationData } from "../types"

export const useUserRegistration = () => {
	const { register, handleSubmit } = useForm<IRegistrationData>()
	const { setProfile } = useProfileStore(profileEventSelector)
	const [mutate] = useMutation(GQL_REGISTRATION, {
		onCompleted(data) {
			setProfile(userDataMapToStore(data))
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

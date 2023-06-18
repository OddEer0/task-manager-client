import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"

import { addProfileEvent } from "@/entities/User"

import { GQL_REGISTRATION, registrationMapper } from "@/shared/api"

import { IRegistrationData } from "../types"

export const useUserRegistration = () => {
	const { register, handleSubmit } = useForm<IRegistrationData>()
	const [mutate] = useMutation(GQL_REGISTRATION, {
		onCompleted(data) {
			addProfileEvent(registrationMapper(data))
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

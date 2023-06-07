export interface IRegistration {
	firstName: string
	lastName: string
	email: string
	password: string
}

export interface IRegistrationData extends IRegistration {
	copyPassword: string
}
